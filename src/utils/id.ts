/** 生成消息 id，优先使用原生 randomUUID */
export function createChatId(): string {
  const cryptoRef = globalThis.crypto
  if (cryptoRef && typeof cryptoRef.randomUUID === 'function') {
    return cryptoRef.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
