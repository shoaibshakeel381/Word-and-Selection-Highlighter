# Word and Selection Highlighter

Highlights the word under the cursor and displays matching occurrences in the editor and overview ruler.

## Settings

The extension does not change VS Code settings automatically. To disable VS Code's overlapping built-in highlights, add these optional settings:

```json
{
  "editor.selectionHighlight": false,
  "editor.occurrencesHighlight": "off",
  "editor.matchBrackets": "never"
}
```

`editor.selectionHighlight` remains a boolean. `editor.occurrencesHighlight` and `editor.matchBrackets` use string values in current VS Code versions.

The extension's own bracket highlighting can be disabled with:

```json
{
  "word-selection-highlighter.matchBrackets": false
}
```

Restarting VS Code is not required after changing these settings.
