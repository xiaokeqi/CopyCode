// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import newJsFile from './packages/saveJsFile';
import newCssFile from './packages/saveCssFile';
import newSnippet from './packages/saveSnippet';
import useTemplate from './packages/useTemplate';
import useSnippetTemp from './packages/useSnipcodeTemplate'
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
	let saveJsFile = vscode.commands.registerCommand('CopyPaste.newJsFile',async (uri) => {
		newJsFile(uri, 'js')
	});

	let newCssTemplate = vscode.commands.registerCommand('CopyPaste.newCssFile', (uri) => {
		newCssFile(uri, 'css')
	});
	let newMainSnipcode = vscode.commands.registerCommand('CopyPaste.newSnippet', () => {
		newSnippet()
	});

	let useJsTemplate = vscode.commands.registerCommand('CopyPaste.useJsTemplate', (uri) => {
		useTemplate(uri, 'js', 'getJS')
	})
	let useCssTemplate = vscode.commands.registerCommand('CopyPaste.useCssTemplate', (uri) => {
		useTemplate(uri, 'css', 'getCss')
	})

	let useSnipcode = vscode.commands.registerCommand('CopyPaste.useSnippet', () => {
		useSnippetTemp()
	})


	context.subscriptions.push(useSnipcode)
	context.subscriptions.push(useCssTemplate);
	context.subscriptions.push(useJsTemplate);
	context.subscriptions.push(newMainSnipcode);
	context.subscriptions.push(newCssTemplate);
	context.subscriptions.push(saveJsFile);
}

// this method is called when your extension is deactivated
export function deactivate() {}
