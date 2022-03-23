import * as vscode from 'vscode';
import {newTemplate} from './utils'
export default async function newJsFile(uri:any, type: string) {
  const pwd = await vscode.window.showInputBox({
    prompt: "输入js模板名称",
    ignoreFocusOut: true,
    validateInput: (s) => s.trim() ? undefined : "模板名称不能为空" ,
  })
  if(pwd) {
    newTemplate(pwd, uri.path, type)
  }
}