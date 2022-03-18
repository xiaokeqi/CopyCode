// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import newJsFile from './packages/newJsFile';
import newCssFile from './packages/newCssFile';
import newSnippet from './packages/newSnippet'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CopyPaste" is now active!');
	let currentEditor: any = vscode.window.activeTextEditor

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let newJsTemplate = vscode.commands.registerCommand('CopyPaste.newJsFile',async (uri) => {
		newJsFile(uri)
	});

	let newCssTemplate = vscode.commands.registerCommand('CopyPaste.newCssFile', (uri) => {
		newCssFile(uri)

	});
	let newMainSnipcode = vscode.commands.registerCommand('CopyPaste.newSnippet', () => {
		newSnippet()
	});
	context.subscriptions.push(newMainSnipcode);
	context.subscriptions.push(newCssTemplate);
	context.subscriptions.push(newJsTemplate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
