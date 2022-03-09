import * as fs from 'fs'
import * as cp from 'child_process'
import * as vscode from 'vscode'
import * as path from 'path'
const config = require('./config.json')
/**
 * @param filename 新建模板
 * @param source 以哪个文件为基准新建模板
 * @returns 
 */
export function newTemplate(filename: string, source:string) {
  const extensionPlugin = vscode.extensions.getExtension(config.extensionPath)
  if(!extensionPlugin) {
    vscode.window.showErrorMessage('您没有安装CopyCode,请去应用商店安装')
    return
  }
  const { extensionPath } = extensionPlugin
  const templateDirPath = `${extensionPath}/.copycode`
  if(!isExist(templateDirPath)) {
    cp.execSync(`mkdir -p ${templateDirPath}`)
  }
  const ext = path.extname(source)
  let sourceContent = fs.readFileSync(source)
  // 若直接在fs中使用模板字符串变量赋值，创建不到.copycode文件夹中
  const templatePath = `${templateDirPath}/${filename}.${ext}`
  if(isExist(templateDirPath)) {
    vscode.window.showWarningMessage('已存在同名模板，是否覆盖', { modal: true }, 'yes').then(pick =>{
      if (pick === 'yes') {
        fs.writeFileSync(templatePath, sourceContent, 'utf-8')
        vscode.window.showInformationMessage("Success")
       } else {
          vscode.window.showInformationMessage("已存在同名模板,换一个试试？");
       }
    });
  }
}

export function isExist(path: string) {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
}
/**
 * 
 * @param path 充当db的文件地址
 * @param type 操作类型，如增加：add,修改：update, 删除：del, 移动：move，查看：get
 * @param key 操作某个文件
 */
export function dbTransaction(path: string, type: string, key: string) {

}
