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
  const templateDirPath:string = getInstalledExtensionPath()
  if(!isExist(templateDirPath)) {
    cp.execSync(`mkdir -p ${templateDirPath}`)
  }
  const ext = path.extname(source)
  let sourceContent = fs.readFileSync(source)
  // 若直接在fs中使用模板字符串变量赋值，创建不到.copypaste文件夹中
  const templatePath = `${templateDirPath}/${filename}${ext}`
  if(isExist(templatePath)) {
    vscode.window.showWarningMessage('已存在同名模板，是否覆盖', { modal: true }, 'yes').then(pick =>{
      if (pick === 'yes') {
        newSuccess()
       } else {
          vscode.window.showInformationMessage("已存在同名模板,换一个试试？");
       }
    });
  } else {
    newSuccess()
  }

  function newSuccess() {
    fs.writeFileSync(templatePath, sourceContent, 'utf-8')
    dbTransaction('add', `${filename}${ext}`)
    vscode.window.showInformationMessage("Success")
  }

}

export function getInstalledExtensionPath():string {
  const extensionPlugin = vscode.extensions.getExtension(config.extensionPath)
  if(!extensionPlugin) {
    vscode.window.showErrorMessage('您没有安装CopyPaste,请去应用商店安装')
    return ''
  }
  const { extensionPath } = extensionPlugin
  const templateDirPath = `${path.dirname(extensionPath)}/${config.cacheDir}`
  return templateDirPath
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
 * @param type 操作类型，
 * 如增加：add,
 * 修改：update, 
 * 删除：del, 
 * 移动：move，
 * 查看某个：get
 * 查看所有：all
 * @param key 操作某个文件
 */
export function dbTransaction(type: string, key: string) {
  const templateDirPath:string = getInstalledExtensionPath()
  const dbPath = `${templateDirPath}/${config.dbFile}`
  let dbObj: any = {}
  if(isExist(dbPath)) {
    dbObj = JSON.parse(require(dbPath))
  }
  switch(type) {
    // 新增模板
    case 'add':
      if(!dbObj[key]) {
        dbObj[key] = {
          name: key,
          path: `${templateDirPath}/${key}`,
          relate: '',
          count: 0
        }
      }
      break;
    case 'update':
      break;
    case 'del':
      break;
    case 'move':
      break;
    case 'get':
      break;
  }
  fs.writeFileSync(dbPath, JSON.stringify(dbObj, null, 4), 'utf-8')

}
