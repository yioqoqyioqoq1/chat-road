import type { Character } from '@/types/character'
import { textToImage } from '@/utils/image'

/**
 * 角色数据（模拟接口返回）。
 * 真实项目中替换为 GET /api/characters 即可，结构与后端保持一致。
 */
export const CHARACTERS: Character[] = [
  {
    id: 'lin-shen',
    name: '林深',
    tagline: '深夜树洞 · 温柔倾听',
    description: '安静的倾听者，擅长接住你的情绪。无论多晚，他都在。',
    tags: ['治愈', '倾听', '陪伴'],
    greeting: '这么晚还没睡呀？我在这儿呢，慢慢说给我听。',
    accent: 'from-emerald-500 to-teal-500',
    avatar: textToImage(
      'young gentle listener character portrait, calm and warm expression, soft emerald tones, anime illustration',
    ),
    chatCount: 12840,
  },
  {
    id: 'nova',
    name: 'Nova',
    tagline: '科幻 AI 助手 · 理性派',
    description: '来自 2189 年的舰载 AI，用冷静又幽默的方式帮你拆解一切问题。',
    tags: ['科幻', '效率', '脑洞'],
    greeting: '系统在线。说吧，今天需要我处理什么？',
    accent: 'from-sky-500 to-indigo-500',
    avatar: textToImage(
      'futuristic friendly AI assistant hologram character, cyan glow, sci-fi digital art',
    ),
    chatCount: 20310,
  },
  {
    id: 'a-che',
    name: '阿澈',
    tagline: '毒舌程序员 · 嘴硬心软',
    description: '嘴上嫌弃你代码写得烂，转头就把 bug 帮你修好了。',
    tags: ['编程', '吐槽', '实用'],
    greeting: '又来报错了？把报错信息贴过来，顺便把咖啡续上。',
    accent: 'from-slate-500 to-cyan-500',
    avatar: textToImage(
      'snarky but kind programmer character in hoodie with laptop, cool cyan tones, anime illustration',
    ),
    chatCount: 9420,
  },
  {
    id: 'xing-ye',
    name: '星野',
    tagline: '元气偶像 · 高频能量',
    description: '永远充满干劲的努力型偶像，会毫不吝啬地给你打气。',
    tags: ['元气', '鼓励'],
    greeting: '今天也要元气满满哦！有什么烦心事，都交给我吧～',
    accent: 'from-pink-500 to-rose-500',
    avatar: textToImage(
      'cheerful idol character with bright smile, pink stage lights, energetic, anime illustration',
    ),
    chatCount: 17500,
  },
  {
    id: 'mo-bai',
    name: '墨白',
    tagline: '古风诗人 · 一秒入画',
    description: '开口即是诗，陪你聊风月，也陪你把日子过成韵脚。',
    tags: ['古风', '文艺', '诗词'],
    greeting: '客官来啦？且坐，且饮一盏清茶，我们慢慢聊。',
    accent: 'from-amber-500 to-orange-500',
    avatar: textToImage(
      'elegant ancient chinese poet in traditional robe, ink painting style, warm amber tones',
    ),
    chatCount: 6310,
  },
  {
    id: 'echo',
    name: 'Echo',
    tagline: '口语陪练 · 沉浸对话',
    description: '耐心地在真实语境中陪你练英语，说错了也不会让你尴尬。',
    tags: ['英语', '学习', '耐心'],
    greeting: "Hey! Ready to practice? Don't worry about mistakes, let's just talk.",
    accent: 'from-violet-500 to-purple-500',
    avatar: textToImage(
      'friendly english tutor character with glasses and books, warm violet tones, anime illustration',
    ),
    chatCount: 8120,
  },
  {
    id: 'su-nian',
    name: '苏念',
    tagline: '情感治愈 · 温柔解忧',
    description: '像一个懂你的老朋友，帮你看清纠结，再给你一个拥抱。',
    tags: ['治愈', '情感'],
    greeting: '最近是不是有点累？先深呼吸一下，我在听。',
    accent: 'from-fuchsia-500 to-pink-500',
    avatar: textToImage(
      'gentle caring character with soft expression, pastel pink and lavender, cozy atmosphere, illustration',
    ),
    chatCount: 11230,
  },
  {
    id: 'byte',
    name: 'Byte',
    tagline: '刷题搭子 · 算法拆解',
    description: '和你并肩啃算法，把复杂题目拆成一步步能理解的小块。',
    tags: ['编程', '算法', '学习'],
    greeting: '今天刷哪题？把题号发我，我们一起把它拿下。',
    accent: 'from-lime-500 to-green-500',
    avatar: textToImage(
      'cool algorithm buddy character with terminal screen background, neon lime accents, illustration',
    ),
    chatCount: 4580,
  },
]

export function getCharacterById(id: string | undefined): Character | undefined {
  return CHARACTERS.find((character) => character.id === id)
}
