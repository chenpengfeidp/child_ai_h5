# AI 教育互动平台

这是一个基于 React 和 Vite 构建的 AI 教育互动平台，包含 AI 基础知识、AI 游戏和 AI 实验等模块。

## 快速部署指南

本项目提供多种免费的部署方式，你可以选择以下任意一种方式来部署你的项目：

### 方式一：使用 Gitee Pages（推荐）

1. 在 Gitee 上创建一个新的仓库
2. 在本地初始化 Git 并添加远程仓库：
   ```bash
   git init
   git add .
   git commit -m "初始化项目"
   git branch -M master
   git remote add origin 你的Gitee仓库地址
   git push -u origin master
   ```
3. 安装 gh-pages 包：
   ```bash
   npm install gh-pages --save-dev
   ```
4. 在 package.json 中添加部署脚本：
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
5. 在 vite.config.js 中添加 base 配置：
   ```javascript
   export default defineConfig({
     base: '/你的仓库名/',
     plugins: [react()]
   })
   ```
6. 运行部署命令：
   ```bash
   npm run deploy
   ```
7. 在 Gitee 仓库设置中启用 Gitee Pages，选择 gh-pages 分支
8. 点击「更新」按钮部署网站

### 方式二：使用 Netlify（零配置）

1. 注册 [Netlify](https://www.netlify.com/) 账号（可用 GitHub 账号登录）
2. 点击 "New site from Git"
3. 选择你的 GitHub 仓库
4. 构建配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 "Deploy site"

### 方式三：使用 Vercel（零配置）

1. 注册 [Vercel](https://vercel.com/) 账号（可用 GitHub 账号登录）
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. Vercel 会自动识别 Vite 项目并完成部署

所有这些平台都提供免费的 HTTPS 域名和 CDN 加速，你可以直接将生成的链接分享给其他人访问。
