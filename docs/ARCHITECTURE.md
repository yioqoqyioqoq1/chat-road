# 架构说明 · ChatRoad

本文说明项目的分层结构、关键数据流与主要技术决策。

## 1. 分层结构

```
页面(Pages) ──调用──▶ 状态(Stores) ──读取/写入──▶ 数据层(Api/Data) ──▶ 后端接口
     │                                              │
     └────────── 组件(Components) 复用 UI ──────────┘
```

- **Pages**：路由对应的页面组件，负责编排与交互（`Created`/`Detail`/`Chat`/`Login`）
- **Stores**：zustand 状态容器，`authStore`（登录态）与 `chatStore`（会话数据）
- **Api/Data**：`api/*` 负责与后端通信，`data/*` 为本地模拟数据
- **Components**：可复用 UI，按领域分目录（`character` / `chat` / `layout` / `ui` / `icons`）

## 2. 关键数据流

### 2.1 登录

```
LoginPage ──调用──▶ authStore.login ──▶ api/auth.login (模拟)
   │                      │
   │                      └─▶ 写入 { token, user } ──▶ localStorage (persist)
   └─ 成功后 navigate(from) 回跳
ProtectedRoute 读取 authStore.token 决定放行或重定向
```

### 2.2 流式聊天

```
ChatInput.onSend
  └─▶ chatStore.appendMessage(用户消息)
  └─▶ chatStore.appendMessage(空的助手消息, streaming = true)
  └─▶ api/chatStream.streamChat(...)
         ├─ fetch POST /api/chat/stream  →  server/chatMock.ts (SSE)
         ├─ 逐段 onDelta ──▶ chatStore.appendDelta (增量拼接)
         └─ 结束 ──▶ chatStore.finishMessage (streaming = false)
                                     │
                             MessageList 依赖 messages 自动滚到底部
                             MessageBubble 结束后渲染 Markdown
```

## 3. 主要技术决策

| 决策 | 选择 | 理由 |
| --- | --- | --- |
| 构建工具 | Vite | 启动/热更新快，配置简单，适合中小型前端应用 |
| 状态管理 | Zustand | API 简洁、无样板代码；`persist` 中间件开箱即用 |
| 后端模拟 | Vite 插件中间件 | 不引入额外服务进程，一条 `npm run dev` 即可跑通全流程 |
| 流式方案 | SSE（非 WebSocket） | 对话场景为单向推送，SSE 更轻量、易与 HTTP 基础设施兼容 |
| Markdown | react-markdown | 组件化渲染，可自定义元素映射，避免引入重型编辑器 |
| 样式 | Tailwind | 原子化、无样式文件膨胀，配合 CSS 变量做主题 |

## 4. 可访问性与体验

- 交互控件均带 `aria-label`；侧栏抽屉点击遮罩可关闭
- 流式输出期间禁用输入框，避免并发请求；离开页面中断请求
- 图片加载失败降级为渐变底色 + 首字母，避免破图

## 5. 后续演进

- 将 `chatStore` 与会话历史接入 IndexedDB，支持多会话与离线
- 抽出 `api` 层的类型与错误码，统一错误处理
- 增加 Vitest 单测与 Playwright E2E，CI 中执行
