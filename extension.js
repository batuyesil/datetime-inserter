const vscode = require('vscode');

function activate(context) {
  console.log('Extension activated!');

  let disposable = vscode.commands.registerCommand(
      'datetime-inserter.insertDateTime', function() {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const year = now.getFullYear();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');

          const dateTime = day + '.' + month + '.' + year + ' ' + hours + ':' +
              minutes + ':' + seconds;

          editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, dateTime);
          });

          vscode.window.showInformationMessage('Tarih eklendi!');
        } else {
          vscode.window.showErrorMessage('Aktif editor yok!');
        }
      });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}