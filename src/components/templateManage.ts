import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { dbTransaction } from './utils'
export default function openManage(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'webview', // viewType
    'CopyPaste模板管理', // 视图标题
    vscode.ViewColumn.One, // 显示在编辑器的哪个部位
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  )
  panel.webview.html = getWebViewContent(context, 'src/components/panel/index.html')
  messageToClient(context, panel)

}

function getWebViewContent (context:vscode.ExtensionContext, templatePath: string) {
  const resourcePath = path.join(context.extensionPath, templatePath)
  const dirPath = path.dirname(resourcePath)
  let html = fs.readFileSync(resourcePath, 'utf-8')
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
    return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"'
  })
  return html
}

function messageToClient (context:vscode.ExtensionContext, panel: vscode.WebviewPanel) {
  // 发送消息
  const list:any = dbTransaction('getAll', '')

  panel.webview.postMessage({ cmd: 'send', data: list })
  // 接受消息
  panel.webview.onDidReceiveMessage(message => {
    vscode.window.showOpenDialog({
      defaultUri: vscode.Uri.file(message.src)
    })
  }, undefined, context.subscriptions)
}
