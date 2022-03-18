/** 使用js模板文件 */
import * as vscode from 'vscode';

export default function useJsTemplate(uri:any) {
  vscode.window.showQuickPick(['dandan1', 'xiaoqi2', 'wangpangzi3']).then(res=> {
    console.log('你选择了啥')
    console.log(res)
  })
}