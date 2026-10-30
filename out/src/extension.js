'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const g = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
const cochineal_light = {
    //color: '#000000',
    overviewRulerColor: '#FF99B4',
    backgroundColor: '#FF99B4',
    borderColor: '#FF99B4'
};
const cochineal_dark = {
    //color: '#FFFFFF',
    overviewRulerColor: '#AE2B52',
    backgroundColor: '#AE2B52',
    borderColor: '#AE2B52'
};
const select_cochineal_light = {
    borderWidth: '1px',
    borderStyle: 'solid',
    color: '#000000',
    overviewRulerColor: '#FFB3C7',
    backgroundColor: '#FFB3C7',
    borderColor: '#000000'
};
const select_cochineal_dark = {
    borderWidth: '1px',
    borderStyle: 'solid',
    color: '#FFFFFF',
    overviewRulerColor: '#C7506F',
    backgroundColor: '#C7506F',
    borderColor: '#FFFFFF'
};
const mselect_cochineal_light = {
    borderWidth: '1px',
    borderStyle: 'solid',
    overviewRulerColor: '#FFB3C7',
    backgroundColor: '#FFB3C7',
    borderColor: '#000000'
};
const mselect_cochineal_dark = {
    borderWidth: '1px',
    borderStyle: 'solid',
    overviewRulerColor: '#C7506F',
    backgroundColor: '#C7506F',
    borderColor: '#FFFFFF'
};
const bdark = {
    color: '#FFFFFF'
};
const blight = {
    color: '#000000'
};
var highlight = vscode.window.createTextEditorDecorationType({});
var selecthighlight = vscode.window.createTextEditorDecorationType({});
var mselecthighlight = vscode.window.createTextEditorDecorationType({});
var brackets_color = new Array(6).fill(vscode.window.createTextEditorDecorationType({}));
var prev_ver = 0;
var bracket_option = true;
function activate(context) {
    let subscriptions = [];
    const op = vscode.workspace.getConfiguration();
    if (op.get("word-selection-highlighter.matchBrackets") == false) {
        bracket_option = false;
    }
    subscriptions.push(vscode.window.onDidChangeTextEditorSelection(on_change_select));
    context.subscriptions.push(...subscriptions);
    // vscode.languages.registerHoverProvider('*', {
    //     provideHover(document, position, token) {
    //         return {
    //             contents: ["---"]
    //         };
    //     }
    // });
}
exports.activate = activate;
function on_change_select() {
    var e = vscode.window.activeTextEditor;
    if (!e) {
        return;
    }
    var s = e.document.getText(e.selection);
    highlight.dispose();
    highlight = vscode.window.createTextEditorDecorationType({
        light: cochineal_light,
        dark: cochineal_dark
    });
    selecthighlight.dispose();
    selecthighlight = vscode.window.createTextEditorDecorationType({
        light: select_cochineal_light,
        dark: select_cochineal_dark
    });
    mselecthighlight.dispose();
    mselecthighlight = vscode.window.createTextEditorDecorationType({
        light: mselect_cochineal_light,
        dark: mselect_cochineal_dark
    });
    brackets_color[0].dispose();
    brackets_color[1].dispose();
    brackets_color[2].dispose();
    brackets_color[3].dispose();
    brackets_color[4].dispose();
    brackets_color[5].dispose();
    brackets_color[0] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#FFD700',
        light: blight,
        dark: bdark
    });
    brackets_color[1] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#8FBC8F',
        light: blight,
        dark: bdark
    });
    brackets_color[2] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#B0C4DE',
        light: blight,
        dark: bdark
    });
    brackets_color[3] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#9370DB',
        light: blight,
        dark: bdark
    });
    brackets_color[4] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#D3D3D3',
        light: blight,
        dark: bdark
    });
    brackets_color[5] = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#FFA500',
        light: blight,
        dark: bdark
    });
    var now_ver = e.document.version;
    if (prev_ver != now_ver && s.length == 0) {
        prev_ver = now_ver;
        return;
    }
    var select_range = new vscode.Range(e.selection.start, e.selection.end);
    // ()
    if (bracket_option && s.length == 0 && e.selections.length < 2) {
        var start = new vscode.Position(e.selection.anchor.line, e.selection.anchor.character);
        var end = new vscode.Position(e.selection.anchor.line, e.selection.anchor.character);
        var linesize = e.document.lineAt(start.line).text.length;
        var cpos = e.selection.anchor.character;
        var sn = 0;
        var en = 0;
        if (cpos - sn - 1 > -1) {
            sn += 1;
            var rtmp = start.translate(0, -sn);
            var text = e.document.getText(new vscode.Range(rtmp, end));
            var b = true;
            if ('(){}[]'.indexOf(text[0]) < 0) {
                b = false;
            }
            if (!b) {
                sn -= 1;
            }
        }
        start = start.translate(0, -sn);
        if (sn == 0) {
            if (cpos + en < linesize) {
                en += 1;
                var rtmp = end.translate(0, en);
                var text = e.document.getText(new vscode.Range(start, rtmp));
                var b = true;
                if ('(){}[]'.indexOf(text[0]) < 0) {
                    b = false;
                }
                if (!b) {
                    en -= 1;
                }
            }
            end = end.translate(0, en);
        }
        var r = new vscode.Range(start, end);
        select_range = r;
        s = e.document.getText(r);
    }
    if (s.length == 0 && e.selections.length < 2) {
        var start = new vscode.Position(e.selection.anchor.line, e.selection.anchor.character);
        var end = new vscode.Position(e.selection.anchor.line, e.selection.anchor.character);
        var linesize = e.document.lineAt(start.line).text.length;
        var cpos = e.selection.anchor.character;
        var sn = 0;
        var en = 0;
        while (cpos - sn - 1 > -1) {
            sn += 1;
            var rtmp = start.translate(0, -sn);
            var text = e.document.getText(new vscode.Range(rtmp, end));
            var b = true;
            for (var j = 0; j < text.length; ++j) {
                if (g.indexOf(text[j]) < 0) {
                    b = false;
                }
            }
            if (!b) {
                sn -= 1;
                break;
            }
        }
        start = start.translate(0, -sn);
        while (cpos + en < linesize) {
            en += 1;
            var rtmp = end.translate(0, en);
            var text = e.document.getText(new vscode.Range(start, rtmp));
            var b = true;
            for (var j = 0; j < text.length; ++j) {
                if (g.indexOf(text[j]) < 0) {
                    b = false;
                }
            }
            if (!b) {
                en -= 1;
                break;
            }
        }
        end = end.translate(0, en);
        var r = new vscode.Range(start, end);
        select_range = r;
        s = e.document.getText(r);
        // console.log(e.document.lineAt(start.line).text);
        // console.log(e.document.offsetAt(e.selection.anchor));
    }
    if (bracket_option && s.length == 1 && e.selections.length < 2 && '(){}[]'.indexOf(s) > -1) {
        var ranges = [];
        var p = pair_pos(s, e.document.offsetAt(select_range.start), e.document.getText());
        if (p > -1) {
            var sp = 0;
            var ep = 0;
            if (e.document.offsetAt(select_range.start) < p) {
                sp = e.document.offsetAt(select_range.start);
                ep = p;
            }
            else {
                sp = p;
                ep = e.document.offsetAt(select_range.start);
            }
            ranges.push(new vscode.Range(e.document.positionAt(sp), e.document.positionAt(sp + 1)));
            ranges.push(new vscode.Range(e.document.positionAt(ep), e.document.positionAt(ep + 1)));
            //console.log(e.document.getText(new vscode.Range(e.document.positionAt(sp+1), e.document.positionAt(ep))));
            e.setDecorations(highlight, ranges);
            var selectranges = [];
            selectranges.push(e.selection);
            e.setDecorations(selecthighlight, selectranges);
            var n = 0;
            var t = e.document.getText(new vscode.Range(e.document.positionAt(sp + 1), e.document.positionAt(ep)));
            var branges = [[], [], [], [], [], []];
            if (t.length > 1) {
                for (var i = 0; i < t.length - 1; ++i) {
                    if ('({['.indexOf(t[i]) > -1) {
                        var d = pair_pos2(i, t);
                        if (d < 0) {
                            continue;
                        }
                        branges[n % 6].push(new vscode.Range(e.document.positionAt(sp + 1 + i), e.document.positionAt(sp + 2 + i)));
                        branges[n % 6].push(new vscode.Range(e.document.positionAt(sp + 1 + d), e.document.positionAt(sp + 2 + d)));
                        n += 1;
                    }
                }
                for (var i = 0; i < 6; ++i) {
                    e.setDecorations(brackets_color[i], branges[i]);
                }
            }
        }
    }
    else if (s.length > 0 && s.indexOf(' ') < 0 && s.indexOf('\n') < 0 && e.selections.length < 2) {
        var text = e.document.getText();
        var ranges = [];
        for (var i = 0; i < text.length;) {
            var pos = text.indexOf(s, i);
            var front = 1;
            var back = 1;
            i = pos + s.length;
            if (pos > 0) {
                for (var j = 0; j < g.length; ++j) {
                    if (text[pos - 1] == g[j]) {
                        front = 0;
                        break;
                    }
                }
            }
            if (i < text.length - 1) {
                for (var j = 0; j < g.length; ++j) {
                    if (text[i] == g[j]) {
                        back = 0;
                        break;
                    }
                }
            }
            if (pos > -1) {
                if (front * back > 0) {
                    ranges.push(new vscode.Range(e.document.positionAt(pos), e.document.positionAt(i)));
                }
            }
            else {
                break;
            }
        }
        ranges.push(select_range);
        e.setDecorations(highlight, ranges);
        var selectranges = [];
        selectranges.push(e.selection);
        e.setDecorations(selecthighlight, selectranges);
    }
    else {
        if (e.selections.length > 1) {
            var selectranges = [];
            for (var i = 0; i < e.selections.length; ++i) {
                selectranges.push(e.selections[i]);
            }
            e.setDecorations(mselecthighlight, selectranges);
        }
        else {
            var ranges = [];
            ranges.push(select_range);
            e.setDecorations(mselecthighlight, ranges);
        }
    }
}
var brackets = { '(': ')', ')': '(', '{': '}', '}': '{', '[': ']', ']': '[' };
// var brackets = { '(':')', ')':'(', '{':'}', '}':'{', '[':']', ']':'[', '<':'>', '>':'<' };
function pair_pos(c, cpos, text) {
    var t = brackets[c];
    var acnt = 0;
    var bcnt = 0;
    if ('({['.indexOf(c) > -1) {
        for (var i = cpos; i < text.length; ++i) {
            if (text[i] == c) {
                acnt += 1;
            }
            if (text[i] == t) {
                bcnt += 1;
            }
            if (acnt > 0 && acnt == bcnt) {
                return i;
            }
        }
    }
    else {
        for (var i = cpos; i >= 0; --i) {
            if (text[i] == c) {
                acnt += 1;
            }
            if (text[i] == t) {
                bcnt += 1;
            }
            if (acnt > 0 && acnt == bcnt) {
                return i;
            }
        }
    }
    return -1;
}
function pair_pos2(spos, text) {
    var c = text[spos];
    var t = brackets[c];
    var acnt = 0;
    var bcnt = 0;
    for (var i = spos; i < text.length; ++i) {
        if (text[i] == c) {
            acnt += 1;
        }
        if (text[i] == t) {
            bcnt += 1;
        }
        if (acnt > 0 && acnt == bcnt) {
            return i;
        }
    }
    return -1;
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
