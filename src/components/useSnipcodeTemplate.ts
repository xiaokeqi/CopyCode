import * as vscode from 'vscode';
import * as fs from 'fs'
import { dbTransaction } from './utils'

export default function useSnipcode() {
  const {list, obj}:any = dbTransaction('getSnippet', '', 'snippet')
  // 插入字符串逻辑
  const {
    activeTextEditor
  } = vscode.window
  vscode.window.showQuickPick(list).then(res => {
    if(!res) return
    const { path } = obj[res]
    const content = fs.readFileSync(path, 'utf-8')
    // 插入到当前光标所在编辑框
    if (activeTextEditor) {
      activeTextEditor.edit((editBuilder) => {
        var position = new vscode.Position(activeTextEditor.selection.active.line, activeTextEditor.selection.active.character)
        editBuilder.insert(position, content)
      })
    }
  })
  
  
}
