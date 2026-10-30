# Change Log

All notable changes to Word and Selection Highlighter are recorded here.

## [0.4.2] - 2026-10-30

- Adds configurable selection and overview ruler indicator colors through `word-selection-highlighter.selectionColor` and `word-selection-highlighter.rulerColor`.
- Applies color setting changes immediately and clarifies that the ruler color is used for matching-word indicators.

## [0.4.1] - 2026-10-30

- Disabled matching bracket highlighting by default; it can be enabled with `word-selection-highlighter.matchBrackets`.

## [0.4.0] - 2026-10-30

- Checks global selection, occurrence, and bracket settings on activation, applying expected values when any are missing or different.

## [0.3.1] - 2026-10-30

- Updated the README with selection highlighting and nested bracket highlighting illustrations.
- Clarified the documentation for the `matchBrackets` setting.

## [0.3.0] - 2026-10-30

- Highlights the word under the cursor and matching occurrences in the editor and overview ruler.
- Highlights selected text and matching brackets, with bracket highlighting configurable through `word-selection-highlighter.matchBrackets`.
- Preserves the user's VS Code settings instead of changing editor settings on activation.
- Documents optional VS Code settings for disabling overlapping built-in selection, occurrence, and bracket highlights.
- Disposes the selection-change listener with the extension and safely handles the absence of an active editor.
- Names the extension Word and Selection Highlighter and declares its bracket-highlighting setting in the Settings UI.
