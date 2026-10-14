# ChatRoad · AI 角色聊天

![ChatRoad](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20purple%20gradient%20tech%20banner%20with%20abstract%20chat%20bubbles%20and%20sparkles%2C%20minimal%20modern&image_size=landscape_16_9)

一个「AI 角色聊天」Web 应用，基于 **React 18 + Vite + TypeScript**。
从登录、角色广场，到实时流式（SSE）对话、Markdown 渲染与响应式布局，覆盖了常见的前端工程实践。

## 功能

- **登录与鉴权**：模拟登录、token 持久化（刷新不掉线）、路由守卫与登录后回跳
- **角色广场**：关键词搜索、标签筛选、响应式网格卡片
- **角色详情**：封面、标签、介绍与开场白，一键进入聊天
- **实时聊天**：基于 SSE 的流式回复（打字机效果）、Markdown 渲染、代码高亮与一键复制
- **会话管理**：按角色维度保存会话，侧栏展示最近会话，可一键清空
- **响应式布局**：桌面端固定侧栏 / 移动端抽屉式侧栏

## 技术栈

| 方向 | 选型 | 说明 |
| --- | --- | --- |
| 框架 / 构建 | React 18 · Vite 5 · TypeScript | 快、类型安全、配置简单 |
| 样式 | Tailwind CSS 3 | 原子化样式，自定义品牌色板 |
| 路由 | React Router 6 | 路由级懒加载，自动代码分割 |
| 状态管理 | Zustand | 轻量、无样板代码，支持 persist 中间件 |
| Markdown | react-markdown · remark-gfm · rehype-highlight | GFM 语法 + 代码高亮 |
| 流式对话 | Server-Sent Events（SSE） | fetch + ReadableStream 手动解析 |

## 快速开始

```bash
npm install
npm run dev      # 开发服务器 http://localhost:5173
npm run build    # 类型检查 + 生产构建
npm run preview  # 预览构建产物
npm run lint     # ESLint 检查
npm run format   # Prettier 格式化
```

> 演示模式：登录页任意用户名 / 密码即可登录；聊天接口由内置的模拟服务提供。

## 目录结构

```
├── server/                     # 开发 / 预览环境的模拟后端（Vite 插件）
│   └── chatMock.ts             #   POST /api/chat/stream，SSE 流式响应
├── src/
│   ├── api/                    # 数据访问层
│   │   ├── auth.ts             #   模拟登录
│   │   └── chatStream.ts       #   SSE 流式客户端（含本地降级）
│   ├── components/
│   │   ├── character/          #   角色卡片
│   │   ├── chat/               #   消息列表 / 气泡 / 输入框 / Markdown / 代码块
│   │   ├── layout/             #   AppLayout / Header / Sidebar / 会话列表
│   │   ├── ui/                 #   通用组件（Avatar）
│   │   ├── icons/              #   自建 SVG 图标
│   │   └── ProtectedRoute.tsx  #   路由守卫
│   ├── data/                   # 模拟数据（角色）
│   ├── mock/                   # 模拟回复生成逻辑（前后端共用）
│   ├── pages/                  # 页面（登录 / 角色广场 / 详情 / 聊天 / 404）
│   ├── router/                 # 路由表
│   ├── store/                  # 状态（authStore / chatStore）
│   ├── styles/                 # 全局样式（Tailwind + Markdown / 代码主题）
│   ├── types/                  # TypeScript 类型
│   └── utils/                  # 工具函数（图片 / 剪贴板 / 时间 / id）
└── vite.config.ts
```

## 核心实现

### 1. SSE 流式输出

前端用 `fetch` + `ReadableStream` 手动解析 `text/event-stream`，每收到一段 `delta` 就追加到消息内容上，实现打字机效果；请求通过 `AbortController` 支持中断（离开页面时自动取消）。

```ts
const reader = response.body.getReader()
const decoder = new TextDecoder()
// 按 "\n\n" 切分 SSE 事件，解析 `data:{"delta":"..."}`，以 `data:[DONE]` 结束
```

后端 `server/chatMock.ts` 是一个 **Vite 插件**，在 `dev` / `preview` 环境注册 `/api/chat/stream` 中间件，把模拟回复按片段定时推送。生产环境替换为真实后端同名接口即可，**前端代码无需改动**；接口不可用时前端会自动降级为本地模拟，保证静态部署仍可演示。

### 2. 状态管理

- `authStore`：使用 `persist` 中间件把 token / 用户信息写入 `localStorage`，实现刷新保持登录
- `chatStore`：按 `characterId` 维度存储会话，支持消息追加、`delta` 增量拼接、结束 / 失败状态

### 3. 路由与代码分割

使用 `createBrowserRouter` + 路由级 `lazy`，页面按路由自动分包；配合 `ProtectedRoute` 做登录校验。

## Roadmap

- [ ] 接入真实大模型接口（OpenAI 兼容协议）
- [ ] 会话历史持久化（IndexedDB）与多会话管理
- [ ] 消息重新生成、编辑与停止生成
- [ ] 单元测试（Vitest）与 E2E（Playwright）

## License

MIT
