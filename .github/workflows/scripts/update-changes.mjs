import fs from 'node:fs'

const changesPath = 'CHANGES.md'
const pullRequestsPath = process.argv[2]

function fail(message) {
    console.error(`ERROR: ${message}`)
    process.exit(1)
}

if (!pullRequestsPath) {
    fail('No pull request JSON file supplied.')
}

//
// Read pull request JSON.
//

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

//
// Parse Dependabot titles.
//
// Expected:
//   Bump dependency from 1.2.3 to 1.2.4
//
// This intentionally requires the complete Dependabot title
// format so unrelated PRs cannot accidentally modify CHANGES.md.
//

function parseDependabotTitle(title) {
    const match = title.match(
        /^Bump (.+?) from (.+?) to (.+?)$/
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
// Validate ALL pull requests before touching CHANGES.md.
//

const updates = []
const seenNumbers = new Set()

const dependabotAuthors = new Set([
    'dependabot[bot]',
    'app/dependabot'
])

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
        fail(
            `PR #${number} has not been merged.`
        )
    }

    if (!dependabotAuthors.has(pr.author?.login)) {
        fail(
            `PR #${number} was authored by ` +
            `${pr.author?.login ?? 'unknown'}, ` +
            'not Dependabot.'
        )
    }

    if (typeof pr.title !== 'string') {
        fail(
            `PR #${number} has no valid title.`
        )
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
// Find the first unreleased Version section.
//
// Current Active Choices format:
//
// ## Version 2.8.10 (????/??/??)
//
// This intentionally targets the first such section, which is
// the unreleased release at the top of CHANGES.md.
//

const releaseMatch = changes.match(
    /^## .+\r?\n/m
)

if (!releaseMatch) {
    fail(
        'Could not find a Markdown H2 release heading in CHANGES.md.'
    )
}

const releaseStart = releaseMatch.index

console.log(
    `Updating the first release section: ${releaseMatch[0].trim()}`
)
console.log()


//
// Find the end of the unreleased section.
//
// The next "## " heading starts the next release.
//

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
// Split the release section into lines.
//

const releaseLines =
    releaseSection.split(/\r?\n/)

//
// Locate the release heading.
//

const headingIndex = releaseLines.findIndex(
    line =>
        line.startsWith(
            `## Version ${releaseVersion} `
        )
)

if (headingIndex === -1) {
    fail(
        `Could not find release heading for Version ${releaseVersion}.`
    )
}

//
// Find all dependency entries in this release.
//
// Example:
//   - Bump @babel/cli from 7.28.6 to 7.29.7
//

const dependencyEntryPattern =
    /^- Bump (.+?) from (.+?) to (.+?)(?:\s+((?:#\d+\s*)+))?$/

const dependencyEntries = []

for (
    let index = headingIndex + 1;
    index < releaseLines.length;
    index++
) {
    const line = releaseLines[index]

    const match =
        line.match(dependencyEntryPattern)

    if (!match) {
        continue
    }

    dependencyEntries.push({
        index,
        dependency: match[1],
        fromVersion: match[2],
        toVersion: match[3],
        prNumbers: match[4]
            ? [...match[4].matchAll(/#(\d+)/g)]
                .map(match => Number(match[1]))
            : []
    })
}

//
// Build a map of existing dependencies.
//
// If the changelog accidentally contains the same dependency
// more than once, merge the entries instead of silently losing
// information.
//

const entriesByDependency = new Map()

for (const entry of dependencyEntries) {
    const existing =
        entriesByDependency.get(entry.dependency)

    if (!existing) {
        entriesByDependency.set(
            entry.dependency,
            {
                dependency: entry.dependency,
                fromVersion: entry.fromVersion,
                toVersion: entry.toVersion,
                prNumbers: [...entry.prNumbers],
                indexes: [entry.index]
            }
        )

        continue
    }

    existing.prNumbers = [
        ...new Set([
            ...existing.prNumbers,
            ...entry.prNumbers
        ])
    ]

    existing.indexes.push(entry.index)
}

//
// Apply the requested updates.
//

for (const update of updates) {
    const existing =
        entriesByDependency.get(update.dependency)

    if (existing) {
        const prNumbers = [
            ...new Set([
                ...existing.prNumbers,
                update.number
            ])
        ]

        existing.toVersion =
            update.toVersion

        existing.prNumbers =
            prNumbers

        console.log(
            `Updated ${update.dependency}: ` +
            `${existing.fromVersion} → ${existing.toVersion} ` +
            `(#${prNumbers.join(', #')})`
        )
    } else {
        const newEntry = {
            dependency: update.dependency,
            fromVersion: update.fromVersion,
            toVersion: update.toVersion,
            prNumbers: [update.number],
            indexes: []
        }

        entriesByDependency.set(
            update.dependency,
            newEntry
        )

        console.log(
            `Added ${update.dependency}: ` +
            `${update.fromVersion} → ${update.toVersion} ` +
            `#${update.number}`
        )
    }
}

//
// Sort all dependency entries alphabetically.
//

const sortedEntries = [
    ...entriesByDependency.values()
].sort(
    (a, b) =>
        a.dependency.localeCompare(
            b.dependency,
            undefined,
            {
                sensitivity: 'base'
            }
        )
)

//
// Render dependency entries.
//

function renderEntry(entry) {
    const prSuffix =
        entry.prNumbers.length > 0
            ? ` ${entry.prNumbers
                .map(number => `#${number}`)
                .join(' ')}`
            : ''

    return (
        `- Bump ${entry.dependency} ` +
        `from ${entry.fromVersion} ` +
        `to ${entry.toVersion}` +
        prSuffix
    )
}

const renderedEntries =
    sortedEntries.map(renderEntry)

//
// Remove all existing dependency lines from the release,
// including duplicate dependency lines.
//
// This lets us reconstruct one clean, alphabetically sorted
// dependency block.
//

const dependencyIndexes =
    new Set(
        dependencyEntries.map(
            entry => entry.index
        )
    )

const nonDependencyLines = []

for (
    let index = 0;
    index < releaseLines.length;
    index++
) {
    if (!dependencyIndexes.has(index)) {
        nonDependencyLines.push({
            originalIndex: index,
            line: releaseLines[index]
        })
    }
}

//
// Find where the dependency block should go.
//
// We preserve the existing location of the first dependency
// entry. If there are no existing dependency entries, insert
// immediately after the release heading.
//

const firstDependencyIndex =
    dependencyEntries.length > 0
        ? Math.min(
            ...dependencyEntries.map(
                entry => entry.index
            )
        )
        : headingIndex + 1

//
// Reconstruct the release section.
//
// Existing non-dependency content is preserved in its original
// relative order. The dependency block replaces the old
// dependency entries.
//

const rebuiltReleaseLines = []

for (
    let index = 0;
    index < releaseLines.length;
    index++
) {
    if (index === firstDependencyIndex) {
        rebuiltReleaseLines.push(
            ...renderedEntries
        )
    }

    if (dependencyIndexes.has(index)) {
        continue
    }

    rebuiltReleaseLines.push(
        releaseLines[index]
    )
}

//
// If there were no dependency entries at all, the insertion
// point was immediately after the heading.
//

if (dependencyEntries.length === 0) {
    const insertionIndex = headingIndex + 1

    rebuiltReleaseLines.length = 0

    for (
        let index = 0;
        index < releaseLines.length;
        index++
    ) {
        rebuiltReleaseLines.push(
            releaseLines[index]
        )

        if (index === insertionIndex - 1) {
            rebuiltReleaseLines.push(
                ...renderedEntries
            )
        }
    }
}

const updatedReleaseSection =
    rebuiltReleaseLines.join('\n')

const updatedChanges =
    beforeRelease +
    updatedReleaseSection +
    afterRelease

//
// Do not create a commit when there is no actual change.
//

if (updatedChanges === changes) {
    console.log()
    console.log(
        'CHANGES.md is already up to date.'
    )

    process.exit(0)
}

//
// Write the updated changelog.
//

fs.writeFileSync(
    changesPath,
    updatedChanges
)

console.log()
console.log(
    `Updated ${changesPath}.`
)
