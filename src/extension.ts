// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs"
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vscode-open-explorer" is now active!');
	const activityBarButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	activityBarButton.command = "extension.openExplorer";
	activityBarButton.text = "Open Explorer";
	activityBarButton.tooltip = "在文件资源管理器中打开当前工作区目录"

	setImmediate(() => {
		activityBarButton.show();
	})

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.openExplorer', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from vscode-open-explorer!');
		const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : ""
		if (workspaceFolder) {
			if (fs.existsSync(workspaceFolder)) {
				vscode.commands.executeCommand("revealFileInOS", vscode.Uri.file(workspaceFolder))
			} else {
				vscode.window.showErrorMessage("not find workspaceFolder")
			}
		} else {
			vscode.window.showErrorMessage("not open workspace")
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
