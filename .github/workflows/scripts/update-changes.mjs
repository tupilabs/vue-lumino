import fs from 'node:fs'

const changesPath = 'CHANGES.md'
const pullRequestsPath = process.argv[2]
const nextReleaseMarker = '<!-- changelog:next-release -->'

function fail(message) {
    console.error(`ERROR: ${message}`)
    process.exit(1)
}

if (!pullRequestsPath) {
    fail('No pull request JSON file supplied.')
}

let pullRequests

try {
    pullRequests = JSON.parse(
        fs.readFileSync(pullRequestsPath, 'utf8')
    )
} catch (error) {
    fail(
        `Could not read pull request JSON from ${pullRequestsPath}: ` +
        `${error.message}`
    )
}

if (!Array.isArray(pullRequests) || pullRequests.length === 0) {
    fail('Pull request JSON must contain a non-empty array.')
}

console.log(`Processing ${pullRequests.length} pull request(s):`)
console.log(
    pullRequests.map(pr => `#${pr.number}`).join(', ')
)
console.log()

function parseDependabotTitle(title) {
    const match = title.match(
        /^Bump (.+) from (.+) to (.+)$/
    )

    if (!match) {
        return null
    }

    return {
        dependency: match[1],
        fromVersion: match[2],
        toVersion: match[3]
    }
}

//
// First pass: validate EVERYTHING before changing CHANGES.md.
//

const updates = []
const seenNumbers = new Set()

for (const pr of pullRequests) {
    const number = pr?.number

    console.log(`Checking #${number}...`)

    if (!Number.isInteger(number) || number <= 0) {
        fail(
            `Invalid pull request number: ${number}`
        )
    }

    if (seenNumbers.has(number)) {
        fail(
            `Pull request #${number} appears more than once.`
        )
    }

    seenNumbers.add(number)

    if (pr.baseRefName !== 'master') {
        fail(
            `PR #${number} targets ${pr.baseRefName}, not master.`
        )
    }

    if (pr.state !== 'MERGED' || !pr.mergedAt) {
        fail(`PR #${number} has not been merged.`)
    }

    const dependabotAuthors = new Set([
        'dependabot[bot]',
        'app/dependabot'
    ])

    if (!dependabotAuthors.has(pr.author?.login)) {
        fail(
            `PR #${number} was authored by ` +
            `${pr.author?.login ?? 'unknown'}, ` +
            'not Dependabot.'
        )
    }

    if (typeof pr.title !== 'string') {
        fail(`PR #${number} has no valid title.`)
    }

    const update = parseDependabotTitle(pr.title)

    if (!update) {
        fail(
            `PR #${number} does not look like a Dependabot ` +
            `dependency update:\n` +
            `  ${pr.title}`
        )
    }

    updates.push({
        number,
        ...update
    })

    console.log(
        `  ${update.dependency}: ` +
        `${update.fromVersion} → ${update.toVersion}`
    )
}

console.log()
console.log('All pull requests validated.')
console.log()

//
// Read CHANGES.md.
//

let changes

try {
    changes = fs.readFileSync(changesPath, 'utf8')
} catch (error) {
    fail(
        `Could not read ${changesPath}: ${error.message}`
    )
}

//
// Find the next-release section using the explicit marker.
//
// The marker should immediately precede the release heading:
//
// <!-- changelog:next-release -->
// ## 1.2.6 (20??-??-??)
//

const releaseMatch = changes.match(
    /^<!-- changelog:next-release -->\r?\n## (\S+) \(20\?\?-\?\?-\?\?\)\r?\n/m
)

if (!releaseMatch) {
    fail(
        'Could not find the next-release marker and unreleased ' +
        'release section in CHANGES.md.\n' +
        `Expected the marker "${nextReleaseMarker}" immediately ` +
        'before a heading such as:\n' +
        '  ## 1.2.6 (20??-??-??)'
    )
}

const releaseVersion = releaseMatch[1]

console.log(`Updating release ${releaseVersion}.`)
console.log()

//
// Find the boundaries of the next-release section.
//

const releaseStart = releaseMatch.index

const nextReleaseIndex = changes.indexOf(
    '\n## ',
    releaseStart + releaseMatch[0].length
)

const releaseEnd =
    nextReleaseIndex === -1
        ? changes.length
        : nextReleaseIndex + 1

const beforeRelease = changes.slice(
    0,
    releaseStart
)

const releaseSection = changes.slice(
    releaseStart,
    releaseEnd
)

const afterRelease = changes.slice(
    releaseEnd
)

//
// Find the release heading.
//

const headingMatch =
    releaseSection.match(/^## .+$/m)

if (!headingMatch) {
    fail(
        `Could not find the release heading for ${releaseVersion}.`
    )
}

const headingEnd =
    headingMatch.index + headingMatch[0].length

//
// Split the release section into:
//   - heading
//   - body
//
// Keep the body structure intact so that non-dependency entries,
// such as "fix:" entries, are preserved.
//

const releaseBody =
    releaseSection.slice(headingEnd)

const bodyLines =
    releaseBody.split(/\r?\n/)

//
// Find all dependency entries.
//

const dependencyEntryIndexes = []

for (
    let index = 0;
    index < bodyLines.length;
    index++
) {
    if (bodyLines[index].startsWith('- Bump ')) {
        dependencyEntryIndexes.push(index)
    }
}

//
// Collect dependency entries by dependency name.
//

const entriesByDependency = new Map()

for (const index of dependencyEntryIndexes) {
    const entry = bodyLines[index]

    const match =
        entry.match(/^- Bump (.+?) from /)

    if (!match) {
        fail(
            `Could not parse dependency entry:\n` +
            `  ${entry}`
        )
    }

    entriesByDependency.set(
        match[1],
        entry
    )
}

//
// Apply updates.
//

for (const update of updates) {
    const {
        dependency,
        fromVersion,
        toVersion,
        number
    } = update

    const existingEntry =
        entriesByDependency.get(dependency)

    if (existingEntry) {
        const match = existingEntry.match(
            /^(- Bump .+? from )([^ ]+)( to )([^ ]+)(.*)$/
        )

        if (!match) {
            fail(
                `Could not parse existing entry for ${dependency}:\n` +
                `  ${existingEntry}`
            )
        }

        const originalFromVersion = match[2]
        const suffix = match[5]

        //
        // Preserve all existing PR numbers and append
        // the new PR number.
        //

        const existingPrNumbers = [
            ...suffix.matchAll(/#(\d+)/g)
        ].map(match => Number(match[1]))

        const prNumbers = [
            ...new Set([
                ...existingPrNumbers,
                number
            ])
        ]

        const replacement =
            `${match[1]}` +
            `${originalFromVersion}` +
            `${match[3]}` +
            `${toVersion} ` +
            `${prNumbers.map(n => `#${n}`).join(' ')}`

        entriesByDependency.set(
            dependency,
            replacement
        )

        console.log(
            `Updated ${dependency}: ` +
            `${originalFromVersion} → ${toVersion} ` +
            `(#${prNumbers.join(', #')})`
        )
    } else {
        //
        // No existing entry: create one.
        //

        const entry =
            `- Bump ${dependency} from ${fromVersion} ` +
            `to ${toVersion} #${number}`

        entriesByDependency.set(
            dependency,
            entry
        )

        console.log(`Added: ${entry}`)
    }
}

//
// Sort dependency entries alphabetically.
//

const sortedEntries = [
    ...entriesByDependency.entries()
]
    .sort(([dependencyA], [dependencyB]) =>
        dependencyA.localeCompare(
            dependencyB,
            undefined,
            {sensitivity: 'base'}
        )
    )
    .map(([, entry]) => entry)

//
// Replace the existing dependency lines with the sorted
// dependency entries.
//
// Existing non-dependency lines are left untouched.
//

for (
    let index = 0;
    index < dependencyEntryIndexes.length;
    index++
) {
    bodyLines[dependencyEntryIndexes[index]] =
        sortedEntries[index]
}

//
// If new dependencies were added, there are more sorted
// entries than existing dependency lines.
//
// Insert the additional entries immediately before the
// first non-dependency content after the existing entries.
//

if (
    sortedEntries.length >
    dependencyEntryIndexes.length
) {
    const additionalEntries =
        sortedEntries.slice(
            dependencyEntryIndexes.length
        )

    //
    // Find the last existing dependency entry.
    //

    const lastDependencyIndex =
        dependencyEntryIndexes.at(-1)

    if (lastDependencyIndex === undefined) {
        //
        // There were no existing dependency entries.
        // Insert after the heading.
        //

        bodyLines.unshift(
            '',
            ...additionalEntries
        )
    } else {
        bodyLines.splice(
            lastDependencyIndex + 1,
            0,
            ...additionalEntries
        )
    }
}

//
// Rebuild the release section.
//
// The original newline after the heading is retained,
// while the dependency entries themselves are kept to
// exactly one line each.
//

const updatedReleaseSection =
    releaseSection.slice(0, headingEnd) +
    bodyLines.join('\n')

//
// Write only if something actually changed.
//

const updatedChanges =
    beforeRelease +
    updatedReleaseSection +
    afterRelease

if (updatedChanges === changes) {
    console.log()
    console.log('CHANGES.md is already up to date.')
    process.exit(0)
}

fs.writeFileSync(
    changesPath,
    updatedChanges
)

console.log()
console.log(`Updated ${changesPath}.`)

function escapeRegExp(value) {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
    )
}
