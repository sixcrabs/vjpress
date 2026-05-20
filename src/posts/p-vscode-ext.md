---
title:  VS Code 插件开发指南：从零到完整示例
date: 2026-05-20
excerpt:  从零到完整示例
tags: ["vscode","ext"]
outline: deep
---

#  `VS Code` 插件开发指南：从零到完整示例

<PostMeta />

## 1. 环境准备

```bash
# 安装 Node.js（>= 18）和 npm
npm --version

# 安装 Yeoman 和 VS Code Extension Generator
npm install -g yo generator-code

# 安装 VS Code（显然 😄）
```

## 2. 脚手架生成项目

```bash
yo code
```

交互选择：
- 选 **New Extension (TypeScript)**
- 输入名称、描述、包名等
- 选择初始化 git：Yes

生成后的目录结构：

```text
my-extension/
├── src/
│   └── extension.ts      # 入口文件
├── package.json          # 插件配置
├── tsconfig.json
├── .vscode/
│   ├── launch.json       # 调试配置
│   └── tasks.json        # 编译任务
└── README.md
```

## 3. 核心概念

VS Code 插件的入口函数：

```typescript
// src/extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // 插件激活时调用，注册命令、监听事件等
    console.log('🎉 插件已激活！');
}

export function deactivate() {
    // 插件停用时调用
}
```

## 4. 完整示例：「Hello World + 代码片段计数器」插件

下面做一个实用插件：**统计当前文件中选中的代码行数，并通过通知和状态栏展示**。

### 4.1 `package.json`

```json
{
  "name": "line-counter",
  "displayName": "Line Counter",
  "description": "统计选中代码行数",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "lineCounter.countLines",
        "title": "Line Counter: 统计选中行数"
      }
    ],
    "keybindings": [
      {
        "command": "lineCounter.countLines",
        "key": "ctrl+shift+l",
        "mac": "cmd+shift+l",
        "when": "editorTextFocus"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "package": "vsce package"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@types/node": "^18.0.0",
    "typescript": "^5.3.0"
  }
}
```

### 4.2 `src/extension.ts`

```typescript
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    // 创建状态栏项
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.command = 'lineCounter.countLines';
    context.subscriptions.push(statusBarItem);

    // 注册命令
    const disposable = vscode.commands.registerCommand(
        'lineCounter.countLines',
        () => {
            countSelectedLines();
        }
    );

    context.subscriptions.push(disposable);

    // 监听选区变化，实时更新状态栏
    vscode.window.onDidChangeTextEditorSelection((e) => {
        updateStatusBar(e.textEditor);
    });

    // 初始化状态栏
    if (vscode.window.activeTextEditor) {
        updateStatusBar(vscode.window.activeTextEditor);
    }
}

function countSelectedLines() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('请先打开一个文件并选中代码。');
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (selectedText.length === 0) {
        vscode.window.showWarningMessage('没有选中任何代码！');
        return;
    }

    const lines = selectedText.split('\n');
    const nonEmptyLines = lines.filter((l) => l.trim().length > 0).length;
    const totalLines = lines.length;

    vscode.window.showInformationMessage(
        `📊 选中了 ${totalLines} 行代码（其中 ${nonEmptyLines} 行非空）`
    );
}

function updateStatusBar(editor: vscode.TextEditor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (selectedText.length > 0) {
        const lines = selectedText.split('\n').length;
        statusBarItem.text = `📏 ${lines} lines selected`;
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

export function deactivate() {
    statusBarItem.dispose();
}
```

### 4.3 `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "out",
    "lib": ["ES2020"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

## 5. 调试与运行

```bash
cd my-extension
npm install
```

在 VS Code 中按 **F5**（或 运行 → 启动调试），会自动打开一个 **Extension Development Host** 窗口，里面运行着你的插件。

按 `Ctrl+Shift+L` 选中代码测试，或在命令面板 (`Ctrl+Shift+P`) 中搜索 "Line Counter"。

## 6. VS Code 插件 API 速查

```typescript
import * as vscode from 'vscode';

// ── 编辑器 ──
const editor = vscode.window.activeTextEditor;
editor?.document.getText();        // 全文
editor?.document.getText(selection); // 选中文本
editor?.edit((editBuilder) => {     // 编辑文档
    editBuilder.replace(range, newText);
});

// ── 通知 ──
vscode.window.showInformationMessage('提示');
vscode.window.showWarningMessage('警告');
vscode.window.showErrorMessage('错误');

// ── 快捷输入 ──
const input = await vscode.window.showInputBox({
    prompt: '请输入名称',
    placeHolder: 'MyClass',
});

// ── 配置读取 ──
const config = vscode.workspace.getConfiguration('myExtension');
const value = config.get('someSetting');

// ── 文件系统 ──
const uri = vscode.Uri.file('/path/to/file');
const content = await vscode.workspace.fs.readFile(uri);

// ── 输出频道 ──
const channel = vscode.window.createOutputChannel('My Extension');
channel.appendLine('日志信息');
channel.show();

// ── Webview (HTML 面板) ──
const panel = vscode.window.createWebviewPanel(
    'myWebview',
    'My Panel',
    vscode.ViewColumn.One
);
panel.webview.html = `<h1>Hello Webview!</h1>`;

// ── 监听文件变化 ──
vscode.workspace.onDidChangeTextDocument((e) => {
    console.log('文件被修改了:', e.document.fileName);
});
```

## 7. 打包发布

```bash
# 安装打包工具
npm install -g @vscode/vsce

# 打包为 .vsix 文件
vsce package

# 发布到 VS Code Marketplace
vsce publish
```

## 8. 进阶方向

| 方向 | API |
|---|---|
| **自定义语言** | `vscode.languages.*` (诊断、补全、悬停提示) |
| **代码补全** | `vscode.languages.registerCompletionItemProvider` |
| **Tree View** | `vscode.window.createTreeView` |
| **终端集成** | `vscode.window.createTerminal` |
| **设置页面** | `contributes.configuration` in package.json |
| **主题/图标** | `contributes.themes` / `contributes.iconThemes` |




<PostNav />
