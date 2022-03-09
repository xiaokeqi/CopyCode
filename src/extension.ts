// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CopyCode" is now active!');
	let currentEditor: any = vscode.window.activeTextEditor

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('CopyCode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CopyCode!');
	});

	let newJsTemplate = vscode.commands.registerCommand('CopyCode.newJsFile', () => {
		vscode.window.showInformationMessage('newJsFile from CopyCode!');
	});

	let newCssTemplate = vscode.commands.registerCommand('CopyCode.newCssFile', () => {
		vscode.window.showInformationMessage('newCssFile from CopyCode!');
	});
	let newCssSnipcode = vscode.commands.registerCommand('CopyCode.newCssSnipcode', (textEditor, edit) => {
		// console.log(textEditor.document)
		console.log(currentEditor.document.getText(new vscode.Range(currentEditor.selection.start, currentEditor.selection.end)))
		// console.log(textEditor.document.getText()
		// vscode.window.showInformationMessage(currentEditor.selection)
		vscode.window.showInformationMessage('newCssFile from CopyCode!');
	});
	let newJsSnipcode = vscode.commands.registerCommand('CopyCode.newJsSnipcode', () => {
		// vscode.window.showInformationMessage(currentEditor.selection)
		vscode.window.showInformationMessage('newCssFile from CopyCode!');
	});
	context.subscriptions.push(newCssSnipcode);
	context.subscriptions.push(newJsSnipcode);
	context.subscriptions.push(newCssTemplate);
	context.subscriptions.push(newJsTemplate);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
