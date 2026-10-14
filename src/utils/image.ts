export type ImageSize =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9'

/**
 * 生成 AI 图片地址。项目中的角色头像 / 封面统一通过该服务获取，
 * 后续可无缝替换为真实的 OSS / CDN 地址。
 */
export function textToImage(prompt: string, size: ImageSize = 'square'): string {
  const query = new URLSearchParams({ prompt, image_size: size })
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?${query.toString()}`
}
