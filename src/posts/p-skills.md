---
title: Awesome Skills
date: 2026-05-12
excerpt: 收集常用、好用的skill
tags: ["skill","LLM","AI"]
outline: deep
---

# Awesome Skills

<PostMeta />

## 常用skill hub

### 流行
- [skill.sh](https://www.skills.sh/)  由 Vercel 推出，提供非常直观的 24小时热榜和安装量排行榜，能帮助开发者快速了解当前社区最流行的 Skill 趋势
- [skillsmp](https://skillsmp.com/)  由Anthropic 推出，含有很多常用的skills
- [skillhub](https://skillhub.club/) SkillHub.club 侧重于通过 AI 评估给出质量评分
- [clawhub](https://clawhub.ai/skills?sort=downloads) openclaw 推出

### 国内可直接访问
- [cocoloop](https://hub.cocoloop.cn/)
- [腾讯 skillhub](https://skillhub.cloud.tencent.com/)

### 行业性的skill
- [colleague skill](https://titanwings.github.io/colleague-skill-site/gallery/)
  
### claude
- [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)

## 安装 skill

本地安装 Skill 通常有两种最主流的方式：**命令行一键安装**（推荐，适合新手）和**手动拖拽文件安装**（简单粗暴）。

具体使用哪种方法，取决于你当前使用的 AI 框架或工具（例如 Claude Code、OpenClaw 等）。以下是详细的操作指南：

### 方式一：通过命令行/对话一键安装（推荐）
这是目前最便捷的方式，AI 会自动帮你完成下载、依赖配置和部署。你只需要在对应的终端或对话框中输入指令即可。

* **如果你使用的是 Claude Code / OpenCode 等工具：**
* 
直接在对话框中发送指令：“帮我安装这个 skill，项目地址是：`[Skill的GitHub链接]`”。
例如，安装官方提供的 `skill-creator`，你可以直接说：
> “帮我安装这个Skill，项目地址是：https://github.com/anthropics/skills/tree/main/skills/skill-creator”

* **如果你使用的是 OpenClaw 框架：**
可以在控制台输入自然语言指令，或者使用标准的 CLI 命令：
```bash
# 自然语言指令示例
帮我安装Skill，项目地址是https://github.com/anthropics/skills/blob/main/skills/pptx，遇到报错时自动修复

# 或者使用命令行精准安装（--auto-fix 表示开启自动纠错）
openclaw skill install --url "https://github.com/anthropics/skills/blob/main/skills/pptx" --auto-fix --local
```

* ** 使用的是 Vercel 推出的 skills 命令行工具：**
可以通过 `npx` 或全局安装的 `skills` 命令来拉取：
```bash
# 使用 npx 安装（例如安装 skill-creator）
npx skills add anthropics/skills@skill-creator -a claude-code -g -y

# 或者使用镜像源解决网络超时问题
npx skills add https://github.com.cnpmjs.org/anthropics/skills@skill-creator -a claude-code -g -y
```

### 📂 方式二：手动拖拽/复制文件夹安装
如果你觉得配置网络或敲命令太麻烦，也可以直接把下载好的 Skill 文件夹放到电脑指定的隐藏目录里。

1. **获取 Skill 文件**：先在 GitHub 或 Skill Hub 上找到你想要的 Skill，将其代码仓库下载到本地并解压成文件夹。
2. **放入指定目录**：将解压后的文件夹复制到以下对应的系统路径中：
   * **Claude Code 用户**：放入 `~/.claude/skills/` 目录下（支持全局共享）。
   * **OpenCode 用户 (Mac)**：放入 `/Users/你的用户名/.config/opencode/skill` 目录下。
   * **Windows 用户**：通常在 `AppData` 文件夹下对应的应用配置目录中（如 `C:\Users\你的用户名\AppData\...`）。
3. **重启生效**：放置完成后，建议完全退出并重启你的 AI 客户端或终端，让程序重新扫描并加载新的技能。

### 💡 避坑与注意事项
* **检查是否识别成功**：安装完后，如果 AI 提示“未找到该 Skill”，可以尝试重启客户端。对于 Claude Code，也可以在终端输入 `npx skills ls -a claude-code -g` 来查看已安装的技能列表。
* **注意网络环境**：由于很多 Skill 托管在 GitHub 上，国内直接拉取可能会遇到“克隆失败”或“连接超时”。如果遇到这种情况，建议使用国内的镜像源地址，或者直接采用第二种“手动下载压缩包再拖拽”的方法作为兜底方案。
* **Skill 命名规范**：如果你是手动创建或修改 Skill，记得核心配置文件必须是 `SKILL.md`，且文件夹名称最好只包含小写字母和连字符（例如 `my-skill-name`），不要有空格。


<PostNav />
