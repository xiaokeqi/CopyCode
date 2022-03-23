/** 使用js模板文件 */
import * as vscode from 'vscode';
import * as fs from 'fs'
import * as npath from 'path'
import { dbTransaction, isExist } from './utils'

export default function useJsTemplate(uri:any, type:string) {
  const {list, obj}:any = dbTransaction('getJS', '', 'js')
  vscode.window.showQuickPick(list).then(res=> {
    if(!res) return
    const { path } = obj[res]
    const content = fs.readFileSync(path, 'utf-8')
    const dirname = npath.dirname(uri.path)
    const newTempPath = dirname + '/' + res
    if(isExist(newTempPath)){
      vscode.window.showInformationMessage('该目录下已存在同名模板文件，请重命名后再使用')
      return
    }
    fs.writeFileSync(newTempPath, content)
  })
}