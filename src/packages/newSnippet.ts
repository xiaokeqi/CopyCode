import * as vscode from 'vscode';
import {newSnippet} from './utils';

export default async function newMainSnippet() {
  const pwd = await vscode.window.showInputBox({
    prompt: "输入代码片段名称",
    ignoreFocusOut: true,
    validateInput: (s) => s.trim() ? undefined : "名称不能为空" ,
  })
  if(pwd) {
    let currentEditor: any = vscode.window.activeTextEditor
    const txt = currentEditor.document.getText(new vscode.Range(currentEditor.selection.start, currentEditor.selection.end))
    newSnippet(pwd, txt)
  }
}