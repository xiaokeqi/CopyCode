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
export function newTemplate(filename: string, source:string, type: string) {
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
        newSuccess(type)
       } else {
          vscode.window.showInformationMessage("已存在同名模板,换一个试试？");
       }
    });
  } else {
    newSuccess(type)
  }

  function newSuccess(type:string) {
    fs.writeFileSync(templatePath, sourceContent, 'utf-8')
    dbTransaction('add', `${filename}${ext}`, type)
    vscode.window.showInformationMessage(`${filename}模板保存成功！！！`)
  }

}

export function newSnippet(name:string, txt: string) {
  const templateDirPath:string = getInstalledExtensionPath()
  if(!isExist(templateDirPath)) {
    cp.execSync(`mkdir -p ${templateDirPath}`)
  }
  const templatePath = `${templateDirPath}/${name}.snippet`
  if(isExist(templatePath)) {
    vscode.window.showWarningMessage('已存在同名代码片段，是否覆盖', { modal: true }, 'yes').then(pick =>{
      if (pick === 'yes') {
        newSuccess()
       } else {
          vscode.window.showInformationMessage("已存在同名代码片段,换一个试试？");
       }
    });
  } else {
    newSuccess()
  }

  function newSuccess() {
    fs.writeFileSync(templatePath, txt, 'utf-8')
    dbTransaction('add', `${name}.snippet`, 'snippet')
    vscode.window.showInformationMessage(`${name}代码片段保存成功！！！`)
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
export function dbTransaction(type: string, key: string, fileType?:string) {
  const templateDirPath:string = getInstalledExtensionPath()
  const dbPath = `${templateDirPath}/${config.dbFile}`
  let dbObj: any = {}
  if(isExist(dbPath)) {
    const dbData = fs.readFileSync(dbPath, 'utf-8')
    try {
      dbObj = typeof dbData === 'object'? dbData : JSON.parse(dbData)
    } catch (error) {
      vscode.window.showErrorMessage('数据解析失败')
    }
  }
  switch(type) {
    // 新增模板
    case 'add':
      if(!dbObj[key]) {
        dbObj[key] = {
          name: key,
          path: `${templateDirPath}/${key}`,
          relate: '',
          count: 0,
          type: fileType
        }
        fs.writeFileSync(dbPath, JSON.stringify(dbObj, null, 4), 'utf-8')
      }
      break;
    case 'update':
      break;
    case 'del':
      break;
    case 'move':
      break;
    case 'getAll': 
      const list = []
      for(let key in dbObj) {
       list.push(dbObj[key])
      }
      return list
    case 'getJS':
      // 通用模板获取
      return getType('js')
    case 'getCss':
      return getType('css')
    case 'getSnippet':
        return getType('snippet')
  }

  function getType(typeName: string, type?: string) {
      let filter = []
      let filterObj:any = {}
      for(let key in dbObj) {
        if(dbObj[key].type === typeName) {
          filter.push(key)
          filterObj[key] = dbObj[key]
        }
      }
      return {
        list: filter,
        obj: filterObj
      }
  }

}
