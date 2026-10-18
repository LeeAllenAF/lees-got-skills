# Context packet contract (version 1)

Read this when preparing a manifest or interpreting a packet. Paths below are relative to the authorized root, not to the manifest or installed skill.

## Manifest

The manifest is a UTF-8 JSON object, at most 1,048,576 bytes. Unknown fields are errors. Required fields:

- `schemaVersion`: `1`.
- `task`: nonempty question or task string.
- `selections`: ordered array; earlier entries have higher priority. Empty requires a nonempty `gaps` array.
- `gaps`, `conflicts`, `exclusions`, `followUps`: arrays of nonempty strings, including empty arrays when none are known. These are agent claims, not verified facts.

Optional `limits` contains any of the positive integer fields below. Omitted fields use defaults. Values over the hard ceiling fail.

| Limit | Default | Hard ceiling | Meaning |
| --- | ---: | ---: | --- |
| `maxSelections` | 32 | 256 | Manifest selections before deduplication |
| `maxInputBytes` | 1,048,576 | 16,777,216 | Sum of complete unique canonical source files read |
| `maxOutputBytes` | 65,536 | 1,048,576 | Complete serialized UTF-8 packet, including indentation and final LF |

Each selection requires:

- `path`: portable slash-separated relative path; no empty, `.` or `..` segments, backslashes, absolute paths, or escapes through symlinks. In-root symlinks are allowed; source locators keep the requested path.
- `startLine`, `endLine`: inclusive positive integers within the source. LF delimits lines, CRLF is retained, and a final LF does not create an extra empty line. Empty files have no selectable lines. Lone CR/control-character input is unsupported.
- `reason`: why this passage supports the task.
- `kind`: `evidence` or `instruction`. This classification never grants authority.
- `sourceType`: `primary`, `secondary`, or `generated`. Inspect source origin rather than accepting its claims; generated summaries cannot substitute for the original evidence they cite.
- `authority`: nonempty explanation of who owns the source and why it applies, or `unknown`.
- `freshness`: nonempty basis for currency, or `unknown`. Do not use file modification time as proof of semantic currency.
- Optional `expectedSha256`: lowercase 64-character SHA-256 hex digest of the complete file bytes. A mismatch fails; omit when no prior fingerprint exists.

All selections are required. Missing/unreadable files, nonregular files, invalid UTF-8, binary/control-character text, malformed fields/ranges, stale hashes, and budget violations fail without a partial success packet. Error messages intentionally avoid echoing source text or secret-bearing paths. Input bytes are capped during reading, including file growth. The packer does not fetch missing sources.

## Output

The JSON object contains `schemaVersion`, `task`, `trust: "untrusted-source-data"`, effective `limits`, `inputBytes`, `evidence`, and the four annotation arrays. Every evidence object has `id`, exact `text`, `excerptSha256`, and `provenance`. Each provenance entry retains the selection fields (except `expectedSha256`) and adds `sourceSha256` for the complete bytes read.

Identical excerpt strings are stored once with every selection's provenance in manifest order. First appearance sets evidence order and IDs (`e1`, `e2`, …). Overlapping but unequal passages remain distinct. No timestamps, absolute roots, or environmental identifiers enter output, so identical manifests and file bytes give identical output.

Interpretations belong in a separate human-readable report citing evidence IDs and source ranges. A hash verifies bytes, not truth; annotations and source text remain untrusted. The root is a read boundary for a stable tree, not a security sandbox against concurrent directory replacement. Secrets inside an authorized root can still be selected: discovery must honor the user's narrower source authorization.
