# 部署指南

## Vercel 部署（推荐）

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 在项目根目录运行
```bash
vercel
```

3. 按照提示完成部署配置

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 配置项目设置：
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
6. 点击 "Deploy"

## 其他部署平台

### Netlify

1. 在项目根目录创建 `netlify.toml`：
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

2. 将代码推送到 Git 仓库
3. 在 Netlify 中连接仓库并部署

### 自托管

1. 构建项目
```bash
pnpm build
```

2. 启动生产服务器
```bash
pnpm start
```

3. 配置反向代理（如 Nginx）指向 `localhost:3000`

## 环境变量

目前项目使用本地存储，无需配置额外的环境变量。

如果未来需要添加数据库或其他服务，请在部署平台中配置相应的环境变量。

## 注意事项

- 确保 Node.js 版本 >= 18
- 使用 pnpm 作为包管理器
- 项目使用 Next.js App Router
- 数据存储在浏览器本地存储中，不会在设备间同步

## 性能优化

- 项目已启用 Turbopack 进行快速开发
- 使用了 Tailwind CSS 进行样式优化
- 图标使用 Lucide React，体积小且性能好
- 组件采用懒加载和代码分割

## 监控和分析

部署后可以考虑添加：
- Google Analytics 或其他分析工具
- 错误监控（如 Sentry）
- 性能监控（如 Vercel Analytics）
