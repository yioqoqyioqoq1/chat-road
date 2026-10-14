const FLAVOR: Record<string, { open: string; tip: string }> = {
  'lin-shen': { open: '嗯，我听到了。', tip: '别急，先让情绪落地，我们再一起想办法。' },
  nova: { open: '分析完成。', tip: '建议拆成可执行的小步骤，逐一验证。' },
  'a-che': { open: '又来活了是吧。', tip: '先把报错贴全，别自己瞎猜。' },
  'xing-ye': { open: '收到收到！', tip: '你一定可以的，先给自己打个气～' },
  'mo-bai': { open: '善。', tip: '世事如棋，缓行则安。' },
  echo: { open: 'Got it!', tip: "Let's practice a bit more with a few examples." },
  'su-nian': { open: '我在。', tip: '允许自己慢一点，没关系的。' },
  byte: { open: '这题有意思。', tip: '先想清楚「状态」怎么定义，再动手写代码。' },
}

/**
 * 根据角色与用户输入生成一段模拟回复（带 Markdown 格式，便于演示渲染能力）。
 * 真实项目中该逻辑位于后端（LLM 推理），前端只负责接收并渲染流式结果。
 */
export function buildReply(characterId: string, userText: string): string {
  const flavor = FLAVOR[characterId] ?? { open: '收到。', tip: '我们一步一步来。' }
  const quoted = userText.trim().slice(0, 60) || '（你还没有输入内容）'

  return [
    `${flavor.open} 关于「${quoted}」，我们可以这样看：`,
    '',
    '- 先拆解问题：把它拆成几个能独立验证的小点',
    '- 再逐个击破：每解决一个小点就记录一次结论',
    '- 最后复盘：把过程沉淀成可复用的经验',
    '',
    flavor.tip,
    '',
    '需要的话，给你一段**示例代码**：',
    '',
    '```ts',
    'interface Plan {',
    '  step: string',
    '  done: boolean',
    '}',
    '',
    'export function nextStep(plan: Plan[]) {',
    '  return plan.find((item) => !item.done)',
    '}',
    '```',
    '',
    '希望对你有帮助，随时继续聊。',
  ].join('\n')
}

/** 把文本切成小片段，用于模拟逐字（打字机）输出 */
export function tokenize(text: string): string[] {
  return text.match(/[\s\S]{1,3}/g) ?? []
}
