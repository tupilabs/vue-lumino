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

    if (pr.author?.login !== 'dependabot[bot]') {
        fail(
            `PR #${number} was authored by ` +
            `${pr.author?.login ?? 'unknown'}, ` +
            'not dependabot[bot].'
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

const beforeRelease = changes.slice(0, releaseStart)

const releaseSection = changes.slice(
    releaseStart,
    releaseEnd
)

const afterRelease = changes.slice(releaseEnd)

//
// Apply updates one dependency at a time.
//

let updatedReleaseSection = releaseSection

for (const update of updates) {
    const {
        dependency,
        fromVersion,
        toVersion,
        number
    } = update

    //
    // Match an existing entry for this dependency.
    //
    // Example:
    //
    // - Bump vue from 3.5.27 to 3.5.40 #666 #678
    //

    const escapedDependency =
        escapeRegExp(dependency)

    const entryPattern = new RegExp(
        `^(- Bump ${escapedDependency} from )` +
        `([^ ]+)` +
        `( to )` +
        `([^ ]+)` +
        `(.*)$`,
        'm'
    )

    const existingEntry =
        updatedReleaseSection.match(entryPattern)

    if (existingEntry) {
        const prefix = existingEntry[1]
        const originalFromVersion = existingEntry[2]
        const suffix = existingEntry[5]

        //
        // Preserve all existing PR numbers and append the new one.
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
            `${prefix}${originalFromVersion} to ${toVersion}` +
            ` ${prNumbers.map(n => `#${n}`).join(' ')}`

        updatedReleaseSection =
            updatedReleaseSection.replace(
                existingEntry[0],
                replacement
            )

        console.log(
            `Updated ${dependency}: ` +
            `${originalFromVersion} → ${toVersion} ` +
            `(#${prNumbers.join(', #')})`
        )
    } else {
        //
        // No existing entry: add one.
        //

        const entry =
            `- Bump ${dependency} from ${fromVersion} ` +
            `to ${toVersion} #${number}`

        //
        // Insert immediately after the release heading.
        // Sorting below will put it in the correct position.
        //

        const headingMatch =
            updatedReleaseSection.match(/^## .+$/m)

        if (!headingMatch) {
            fail(
                `Could not find the release heading for ` +
                `${releaseVersion}.`
            )
        }

        const headingEnd =
            headingMatch.index + headingMatch[0].length

        updatedReleaseSection =
            updatedReleaseSection.slice(0, headingEnd) +
            `\n\n${entry}` +
            updatedReleaseSection.slice(headingEnd)

        console.log(`Added: ${entry}`)
    }
}

//
// Sort dependency entries alphabetically.
//

const releaseLines =
    updatedReleaseSection.split(/\r?\n/)

const entryIndexes = []

for (let index = 0; index < releaseLines.length; index++) {
    if (releaseLines[index].startsWith('- Bump ')) {
        entryIndexes.push(index)
    }
}

const entries = entryIndexes.map(
    index => releaseLines[index]
)

entries.sort((a, b) => {
    const dependencyA =
        a.match(/^- Bump (.+?) from /)?.[1] ?? ''

    const dependencyB =
        b.match(/^- Bump (.+?) from /)?.[1] ?? ''

    return dependencyA.localeCompare(
        dependencyB,
        undefined,
        {sensitivity: 'base'}
    )
})

for (let index = 0; index < entryIndexes.length; index++) {
    releaseLines[entryIndexes[index]] = entries[index]
}

updatedReleaseSection = releaseLines.join('\n')


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
