# Change Log

All notable changes to the "Word and Selection Highlighter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.3.0] - 2026-10-30

- Removed activation-time editor setting changes, which could overwrite user preferences and used obsolete values for occurrence and bracket highlighting.
- Documented current optional VS Code setting values and declared the extension's bracket-highlighting option in the Settings UI.
- Disposed the selection-change listener with the extension and guarded against there being no active editor.
- Renamed the extension to Word and Selection Highlighter, updated its identifier, and renamed its bracket-highlighting setting.

#### 0.2.4
++ disable Bracket Pair Color Setting

#### 0.1.1
++ Bracket Pair Color  
![PNG](https://raw.githubusercontent.com/ebicochineal/Images/master/bracket.png)  
++
```
"editor.matchBrackets": false,
```

--
```
"workbench.colorCustomizations": {
        "editor.selectionBackground": "#FFB3C7"
},
```
#### 0.0.7
++ this extension adds user settings  
-- this extension adds workspace settings  
#### 0.0.5
++ this extension adds workspace settings  
#### 0.0.3
this extension not adds settings
not adds recomend settings
```
// recomend settings
"workbench.colorCustomizations": {
        "editor.selectionBackground": "#FFB3C7"
},
"editor.selectionHighlight": false,
"editor.occurrencesHighlight": false,
```

