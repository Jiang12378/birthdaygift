// 数据配置文件
const DATA = {
    // 第一次见面的正确答案
    firstHeroAnswer: '孙尚香',

    // 王者荣耀英雄列表：来自 heroList.browser.js 的全量英雄数据库
    heroes: (typeof window !== 'undefined' && Array.isArray(window.allHeroes)) ? window.allHeroes : [],

    // 分路影响
    laneInfluence: {
        '打野': { operation: 12, awareness: 14, carry: 10, team: -5 },
        '中单': { operation: 10, awareness: 12, carry: 8, team: 0 },
        '对抗路': { operation: 11, awareness: 9, carry: 8, team: -3 },
        '发育路': { operation: 13, awareness: 10, carry: 12, team: 0 },
        '游走': { operation: 8, awareness: 15, carry: 5, team: 10 },
        '全能补位': { operation: 7, awareness: 11, carry: 3, team: 15 }
    },

    // 游戏性格影响
    personalityInfluence: {
        '认真指挥型': { mentality: 10, meme: -8, rapport: 5 },
        '安静发育型': { mentality: 8, meme: -5, rapport: 0 },
        '温柔稳局型': { mentality: 12, meme: -10, rapport: 15 },
        '整活气氛型': { mentality: 5, meme: 12, rapport: 8 },
        '直爽吐槽型': { mentality: 3, meme: 5, rapport: -3 },
        '佛系随缘型': { mentality: 10, meme: 8, rapport: 8 }
    },

    // 组队状态影响
    teamInfluence: {
        '固定双排': { rapport: 18, persona: 'duet' },
        '三五排开黑': { rapport: 15, persona: 'squad' },
        '常年单排': { rapport: -8, persona: 'solo' },
        '随缘组队': { rapport: 5, persona: 'random' },
        '陪朋友上线': { rapport: 20, persona: 'companion' },
        '看心情，都可以': { rapport: 10, persona: 'flexible' }
    },

    // 趣味关键词映射：来自 keywordList.browser.js
    idKeywords: (typeof window !== 'undefined' && window.idKeywords) ? window.idKeywords : {},

    // 测评选择题
    questions: [
        {
            id: 1,
            text: '逆风局你的第一反应？',
            options: [
                { text: 'A. 先稳住发育，找机会慢慢翻', influence: { awareness: 8, mentality: 8, operation: 5 } },
                { text: 'B. 开始观察局势，试图指挥队友', influence: { awareness: 12, carry: 10, operation: 3 } },
                { text: 'C. 心态有点波动，但还能继续打', influence: { meme: 10, mentality: 3 } },
                { text: 'D. 先安抚队友，别急着内讧', influence: { mentality: 10, rapport: 12 } }
            ]
        },
        {
            id: 2,
            text: '拿到人头或打出高光之后，你会？',
            options: [
                { text: 'A. 赶紧推塔拿龙，扩大优势', influence: { awareness: 10, carry: 12 } },
                { text: 'B. 小小得意一下，但继续认真打', influence: { operation: 8, mentality: 8 } },
                { text: 'C. 有点上头，忍不住继续追', influence: { operation: 12, meme: 8 } },
                { text: 'D. 发个信号或表情，和队友分享快乐', influence: { rapport: 15, meme: 5 } }
            ]
        },
        {
            id: 3,
            text: '队友抢了你的 Buff，你会？',
            options: [
                { text: 'A. 算了算了，先赢再说', influence: { mentality: 12, rapport: 10 } },
                { text: 'B. 默默走开，假装无事发生', influence: { rapport: -5 } },
                { text: 'C. 发个问号，表达一下态度', influence: { meme: 8 } },
                { text: 'D. 直接沟通：下次能不能别抢', influence: { awareness: 8, operation: 5 } }
            ]
        },
        {
            id: 4,
            text: '排位最害怕遇到哪种情况？',
            options: [
                { text: 'A. 队友挂机、摆烂、乱送', influence: { operation: 5, awareness: 8 } },
                { text: 'B. 对面节奏太快，全程被针对', influence: { carry: 10, operation: 10 } },
                { text: 'C. 队友互相甩锅，气氛变差', influence: { rapport: -8, mentality: -5 } },
                { text: 'D. 自己突然没手感，操作变形', influence: { operation: 3, mentality: 5 } }
            ]
        },
        {
            id: 5,
            text: '队友坑崩整局时，你通常会？',
            options: [
                { text: 'A. 不喷不骂，认真打完', influence: { mentality: 12, rapport: 12 } },
                { text: 'B. 沉默处理，打完就下一局', influence: { rapport: -5 } },
                { text: 'C. 忍不住吐槽两句，但不会真吵', influence: { meme: 5 } },
                { text: 'D. 心态爆炸，想立刻下线冷静', influence: { meme: 12, mentality: -8 } }
            ]
        },
        {
            id: 6,
            text: '你打王者的核心目的是？',
            options: [
                { text: 'A. 认真冲分，想变得更强', influence: { carry: 12, operation: 10 } },
                { text: 'B. 放松娱乐，开心最重要', influence: { meme: 10 } },
                { text: 'C. 陪朋友一起玩，有人开黑才有意思', influence: { rapport: 18 } },
                { text: 'D. 解压消遣，打几局换换心情', influence: { meme: 8, mentality: 6 } }
            ]
        }
    ],

    // 运势签文
    fortunes: [
        '大吉签：峡谷之运眷顾于你，今日五连胜定是小事。',
        '吉签：宝剑锋从磨砺出，你的努力在峡谷中闪闪发光。',
        '吉签：团队之力如此澎湃，与汝同行未有败局。',
        '平签：平者则安，稳健发育是智者的选择。',
        '平签：机遇总是垂青有准备的人，你准备好了吗？',
        '吉签：知己知彼，百战不殆。你的棋盘正在展开。',
        '大吉签：操作如诗，意识如剑，今日你就是峡谷的王。',
        '吉签：万事开头难，但你已经迈出了第一步。',
        '平签：得失有常，专注于当下，胜利会自然而至。',
        '吉签：队友的信任是最大的力量源泉。'
    ],

    // 人设匹配规则与评语
    personas: [
        {
            id: 1,
            name: '温柔稳局陪玩型',
            conditions: {
                personality: ['温柔稳局型', '佛系随缘型'],
                team: ['固定双排', '陪朋友上线', '三五排开黑'],
                lane: ['游走', '中单'],
            },
            description: '你是峡谷里很少见的稳局型玩家。顺风不乱浪，逆风不急躁，队友心态快崩的时候，你往往是那个能把气氛拉回来的人。你不一定每局都要当最亮眼的核心，但总能让队伍打得更舒服。你的优势不是压迫感，而是稳定感。和你一起开黑，至少不用担心局内气氛突然爆炸。生日快乐，愿你以后匹配少遇离谱队友，多遇靠谱搭子，本命英雄常有高光。'
        },
        {
            id: 2,
            name: '高冷 Carry 实力型',
            conditions: {
                personality: ['安静发育型', '认真指挥型'],
                lane: ['打野', '对抗路', '发育路'],
                carry: true
            },
            description: '你属于话不多但很有存在感的类型。比起在局内疯狂输出情绪，你更习惯用操作和节奏说话。该发育时发育，该开团时开团，关键时刻能站出来打出存在感。你的人设关键词是：低调、认真、能扛事。队友可能听不到你说太多话，但能感觉到你确实在努力赢。生日快乐，祝你新的一岁手感在线，关键团不掉链子，排位一路稳稳向上。'
        },
        {
            id: 3,
            name: '峡谷整活气氛型',
            conditions: {
                personality: ['整活气氛型'],
                memeIndex: true
            },
            description: '你打游戏的重点不只是输赢，还有快乐本身。别人进游戏是来上分的，你进游戏像是来给峡谷增加节目效果的。顺风能整活，逆风也能找点乐子，只要有你在，对局就不太容易冷场。你的强项是气氛感，哪怕局势一般，也能把游戏打得没那么难受。生日快乐，愿你新的一岁把把都有名场面，输赢都不影响快乐，偶尔整活也能意外躺赢。'
        },
        {
            id: 4,
            name: '安静独狼单排型',
            conditions: {
                personality: ['安静发育型'],
                team: ['常年单排', '随缘组队'],
                solitary: true
            },
            description: '你是典型的独自闯峡谷型玩家。不太依赖组队，也不太喜欢局内复杂社交，更多时候是自己上线、自己排、自己消化整局体验。赢了继续，输了下一把，主打一个安静但有自己的节奏。你不是没情绪，只是不太喜欢把情绪丢给别人。你的人设关键词是：独立、低调、自洽。生日快乐，愿你单排少遇奇怪队友，多遇正常阵容，安安稳稳打出自己的节奏。'
        },
        {
            id: 5,
            name: '直爽真实上分型',
            conditions: {
                personality: ['直爽吐槽型', '认真指挥型'],
                carry: true
            },
            description: '你是那种很真实的玩家。打得好会认真夸，打得离谱也真的忍不住想说两句。你不是故意制造矛盾，只是对对局比较投入，看不得太离谱的操作和莫名其妙的摆烂。你的特点是有态度、有胜负心，也有自己的底线。虽然偶尔会上头，但大多数时候还是想把游戏认真打完。生日快乐，愿你以后少被队友气到，多打顺风局，本命英雄越玩越顺手。'
        },
        {
            id: 6,
            name: '专属开黑搭子型',
            conditions: {
                personality: [],
                team: ['固定双排', '三五排开黑', '陪朋友上线'],
                rapport: true
            },
            description: '你打王者不只是为了段位，也很在意和谁一起玩。对你来说，一局游戏好不好玩，有时候不完全取决于输赢，而是取决于有没有熟悉的人一起聊天、配合、吐槽和整活。你是很适合长期组队的玩家，靠谱、有回应，也愿意陪朋友一起打。你的人设关键词是：陪伴感、默契感、开黑稳定成员。生日快乐，愿你新的一岁身边一直有合拍搭子，游戏有人陪，快乐不缺席。'
        }
    ],

    // 生日彩蛋配置
    easterEggs: {
        heroCorrect: '你还记得我们第一次见面时的那个英雄，很感动，不过记得是应该的！因为我也记得你玩的是马超。希望今后也能一直玩的开心！',
        heroWrong: '虽然记错了英雄，但不要紧。重要的是后来我们一起玩过的每一局，那些才是我们最珍贵的回忆。',
        idMessages: [
            id => `ID 中有这样的特点的你，在峡谷中总能给人留下深刻印象。`,
            id => `独特的 ID，独特的风格。希望你今年在峡谷中继续闪闪发光！`,
            id => `你的 ID 就像一个标签，代表着你在这个峡谷中的独特位置。生日快乐！`
        ]
    }
};
