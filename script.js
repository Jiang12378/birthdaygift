// 主应用逻辑
const app = {
    // 当前页面索引
    currentPageIndex: 0,
    
    // 用户数据
    userData: {
        firstHero: '',
        firstHeroCorrect: false,
        nickname: '',
        mainHero: '',
        gameId: '',
        lane: '',
        schedule: '',
        personality: '',
        team: '',
        quizAnswers: [null, null, null, null, null, null],
        fortuneDraw: null
    },

    // 页面顺序
    pages: [
        'home-page',
        'first-hero-page',
        'nickname-page',
        'main-hero-page',
        'lane-page',
        'schedule-page',
        'personality-page',
        'team-page',
        'question-page', // 动态页面，显示 6 个选择题
        'draw-page',
        'result-page',
        'easter-egg-page'
    ],

    // 初始化应用
    init() {
        console.log('App initialized');
    },

    // 开始测评
    startTest() {
        this.goToPage(1);
    },

    // 提交第一次见面英雄
    submitFirstHero() {
        const input = document.getElementById('first-hero-input').value.trim();
        if (!input) {
            alert('请输入英雄名字');
            return;
        }
        
        this.userData.firstHero = input;
        
        // 验证第一次见面的英雄
        this.userData.firstHeroCorrect = (input === DATA.firstHeroAnswer);
        
        // 显示反馈
        const message = this.userData.firstHeroCorrect 
            ? '答对啦！看来这段峡谷记忆你还记得。专属生日测评正式开启！'
            : '好吧，这次没有答对。这个生日测评是专属彩蛋，答对我们第一次见面的英雄才能继续开启。';
        
        alert(message);
        if (!this.userData.firstHeroCorrect) {
            return;
        }
        this.goToPage(2);
    },

    // 提交昵称
    submitNickname() {
        const input = document.getElementById('nickname-input').value.trim();
        if (!input) {
            alert('请输入你的峡谷大名');
            return;
        }
        this.userData.nickname = input;
        this.goToPage(this.currentPageIndex + 1);
    },

    // 提交本命英雄
    submitMainHero() {
        const input = document.getElementById('main-hero-input').value.trim();
        if (!input) {
            alert('请输入你的本命英雄');
            return;
        }
        this.userData.mainHero = input;
        this.goToPage(this.currentPageIndex + 1);
    },

    // 提交游戏ID
    submitGameId() {
        const input = document.getElementById('game-id-input').value.trim();
        this.userData.gameId = input;
        this.goToPage(this.currentPageIndex + 1);
    },

    // 选择选项
    selectOption(type, value, buttonElement) {
        this.userData[type] = value;
        console.log(`选择 ${type}: ${value}`);
        
        // 更新UI显示选中状态
        if (buttonElement && buttonElement.parentElement) {
            const buttons = buttonElement.parentElement.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));
            buttonElement.classList.add('selected');
        }
        
        // 自动跳转到下一页
        setTimeout(() => this.nextPage(), 300);
    },

    // 进入问题页面
    enterQuestionMode(questionIndex) {
        this.currentQuestionIndex = questionIndex || 0;
        this.showQuestion(this.currentQuestionIndex);
    },

    // 显示选择题
    showQuestion(index) {
        if (index >= DATA.questions.length) {
            this.goToPage(9); // 进入抽签页面
            return;
        }
        
        this.goToPage(8); // 问题页面
        
        const question = DATA.questions[index];
        document.getElementById('question-num').textContent = (index + 8);
        document.getElementById('question-text').textContent = question.text;
        
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        question.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.onclick = () => this.answerQuestion(index, idx, opt);
            container.appendChild(btn);
        });
    },

    // 回答选择题
    answerQuestion(questionIndex, optionIndex, option) {
        this.userData.quizAnswers[questionIndex] = {
            questionIndex,
            optionIndex,
            influence: option.influence
        };
        
        // 显示下一题或进入抽签
        if (questionIndex + 1 < DATA.questions.length) {
            this.showQuestion(questionIndex + 1);
        } else {
            this.goToPage(9); // 进入抽签页面
        }
    },

    // 抽签
    drawFortune() {
        const card = document.getElementById('draw-card');
        if (this.userData.fortuneDraw !== null || card.classList.contains('drawn')) {
            return;
        }

        card.classList.add('drawn');
        
        const fortuneIndex = Math.floor(Math.random() * DATA.fortunes.length);
        this.userData.fortuneDraw = fortuneIndex;
        card.classList.add('disabled');
        card.querySelector('.draw-text').textContent = '已抽签';
        
        setTimeout(() => {
            const fortuneText = DATA.fortunes[fortuneIndex];
            document.getElementById('fortune-result').style.display = 'block';
            document.getElementById('fortune-text').textContent = fortuneText;
            document.getElementById('draw-confirm-btn').style.display = 'block';
            card.classList.remove('drawn');
        }, 600);
    },

    // 下一页
    nextPage() {
        const currentPage = this.pages[this.currentPageIndex];
        
        // 根据当前页面保存数据
        if (currentPage === 'nickname-page') {
            this.submitNickname();
            return;
        } else if (currentPage === 'main-hero-page') {
            this.submitMainHero();
            return;
        }
        
        if (currentPage === 'team-page') {
            this.enterQuestionMode(0);
            return;
        }
        
        if (currentPage === 'question-page') {
            return; // 问题页面由 answerQuestion 控制
        }
        
        this.goToPage(this.currentPageIndex + 1);
    },

    // 跳转到指定页面
    goToPage(pageIndex) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // 显示目标页面
        if (pageIndex === 8) {
            // 问题页面处理 - 只显示页面，不调用 showQuestion（避免无限递归）
            document.getElementById('question-page').classList.add('active');
            this.currentPageIndex = 8;
        } else if (pageIndex === 10) {
            this.showResults();
        } else if (pageIndex < this.pages.length) {
            const pageName = this.pages[pageIndex];
            const pageEl = document.getElementById(pageName);
            if (pageEl) {
                pageEl.classList.add('active');
                this.currentPageIndex = pageIndex;
            }
        }
    },

    // 显示结果
    showResults() {
        // 计算评分
        const scores = this.calculateScores();
        console.log('评分:', scores);
        console.log('用户数据:', this.userData);
        
        // 获取人设
        const persona = this.matchPersona();
        console.log('人设:', persona);
        
        // 生成标签
        const tags = this.generateTags();
        console.log('标签:', tags);
        
        // 更新UI
        document.getElementById('result-nickname').textContent = this.userData.nickname || '玩家';
        
        // 显示评分
        this.displayScores(scores);
        
        // 显示标签
        this.displayTags(tags);
        
        // 显示人设
        document.getElementById('persona-name').textContent = persona.name;
        this.displayPersonaDescription(persona.description);
        
        // 跳转到结果页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('result-page').classList.add('active');
        this.currentPageIndex = 10;
    },

    // 显示彩蛋页面
    showEasterEgg() {
        this.goToPage(11); // 彩蛋页面
    },

    // 返回结果页面
    backToResult() {
        this.goToPage(10); // 结果页面
    },

    // 计算评分
    calculateScores() {
        const scores = {
            operation: 50,
            awareness: 50,
            mentality: 50,
            meme: 30,
            rapport: 50
        };
        
        // 加入选择题的影响
        this.userData.quizAnswers.forEach(answer => {
            if (answer && answer.influence) {
                Object.keys(answer.influence).forEach(key => {
                    if (scores.hasOwnProperty(key)) {
                        scores[key] += answer.influence[key];
                    }
                });
            }
        });
        
        // 加入本命英雄的影响
        if (this.userData.mainHero) {
            const hero = this.findHeroProfile(this.userData.mainHero);
            if (hero && hero.influence) {
                Object.keys(hero.influence).forEach(key => {
                    if (scores.hasOwnProperty(key)) {
                        scores[key] += hero.influence[key];
                    }
                });
            }
        }
        
        // 加入分路的影响
        if (this.userData.lane && DATA.laneInfluence[this.userData.lane]) {
            const laneData = DATA.laneInfluence[this.userData.lane];
            scores.operation += laneData.operation || 0;
            scores.awareness += laneData.awareness || 0;
            scores.mentality += laneData.team || 0; // 团队倾向影响心态
        }
        
        // 加入游戏性格的影响
        if (this.userData.personality && DATA.personalityInfluence[this.userData.personality]) {
            const personalityData = DATA.personalityInfluence[this.userData.personality];
            scores.mentality += personalityData.mentality || 0;
            scores.meme += personalityData.meme || 0;
            scores.rapport += personalityData.rapport || 0;
        }
        
        // 加入组队状态的影响
        if (this.userData.team && DATA.teamInfluence[this.userData.team]) {
            scores.rapport += DATA.teamInfluence[this.userData.team].rapport || 0;
        }
        
        // 确保分数在有效范围内
        Object.keys(scores).forEach(key => {
            scores[key] = Math.max(0, Math.min(100, scores[key]));
        });
        
        return scores;
    },

    // 查找英雄资料，兼容用户输入中的空格和全角空格
    findHeroProfile(heroName) {
        const normalize = value => String(value || '').replace(/\s+/g, '').trim();
        const target = normalize(heroName);
        if (!target || !Array.isArray(DATA.heroes)) {
            return null;
        }

        return DATA.heroes.find(hero => normalize(hero.name) === target) || null;
    },

    // 显示评分
    displayScores(scores) {
        const scoreConfig = [
            {
                id: 'operation',
                text: '操作分',
                high: '手感很在线，别装了我看得出来。',
                low: '今天先不拼手速，靠脑子也能赢。'
            },
            {
                id: 'awareness',
                text: '意识分',
                high: '你是真的会看局势，雷达开着呢。',
                low: '地图可以多看两眼，但可爱先满分。'
            },
            {
                id: 'mentality',
                text: '心态分',
                high: '稳得像峡谷定海神针。',
                low: '这颗心需要被蛋糕和朋友保护一下。'
            },
            {
                id: 'meme',
                text: '摆烂指数',
                high: '快乐浓度超标，但我允许。',
                low: '认真得有点明显，偶尔也可以放松。'
            },
            {
                id: 'rapport',
                text: '队友好感度',
                high: '谁和你开黑都会偷偷开心。',
                low: '你只是比较有边界感，不是不好相处。'
            }
        ];
        
        scoreConfig.forEach(config => {
            const score = scores[config.id];
            const fillEl = document.getElementById(`score-${config.id}`);
            const textEl = document.getElementById(`score-${config.id}-text`);
            const noteEl = this.ensureScoreNoteElement(config.id, textEl);
            
            if (fillEl) {
                fillEl.style.width = score + '%';
            }
            if (textEl) {
                textEl.textContent = score + '/100';
            }
            if (noteEl) {
                if (score > 80) {
                    noteEl.textContent = config.high;
                    noteEl.style.display = 'block';
                } else if (score < 30) {
                    noteEl.textContent = config.low;
                    noteEl.style.display = 'block';
                } else {
                    noteEl.textContent = '';
                    noteEl.style.display = 'none';
                }
            }
        });
    },

    // 确保每个评分项都有短评位置
    ensureScoreNoteElement(scoreId, textEl) {
        if (!textEl || !textEl.parentElement) {
            return null;
        }

        const noteId = `score-${scoreId}-note`;
        let noteEl = document.getElementById(noteId);
        if (!noteEl) {
            noteEl = document.createElement('div');
            noteEl.id = noteId;
            noteEl.className = 'score-note';
            textEl.parentElement.appendChild(noteEl);
        }
        return noteEl;
    },

    // 显示人设评语，将生日祝福段落单独换行突出
    displayPersonaDescription(description) {
        const container = document.getElementById('persona-description');
        if (!container) {
            return;
        }

        container.innerHTML = '';
        const conversationalDescription = description.startsWith('我知道')
            ? description
            : `我知道${description}`;
        const birthdayIndex = conversationalDescription.indexOf('生日快乐');
        const parts = birthdayIndex >= 0
            ? [conversationalDescription.slice(0, birthdayIndex), conversationalDescription.slice(birthdayIndex)]
            : [conversationalDescription];

        parts.forEach((part, index) => {
            const text = part.trim();
            if (!text) {
                return;
            }

            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            if (index === 1) {
                paragraph.className = 'birthday-wish';
            }
            container.appendChild(paragraph);
        });
    },

    // 匹配人设
    matchPersona() {
        let bestPersona = DATA.personas[5]; // 默认人设 6
        let bestScore = 0;
        
        DATA.personas.forEach(persona => {
            let matchScore = 0;
            
            // 检查游戏性格匹配
            if (persona.conditions.personality && persona.conditions.personality.includes(this.userData.personality)) {
                matchScore += 30;
            }
            
            // 检查组队状态匹配
            if (persona.conditions.team && persona.conditions.team.includes(this.userData.team)) {
                matchScore += 30;
            }
            
            // 检查分路匹配
            if (persona.conditions.lane && persona.conditions.lane.includes(this.userData.lane)) {
                matchScore += 20;
            }
            
            // 检查 carry 倾向
            if (persona.conditions.carry) {
                const scores = this.calculateScores();
                if (scores.operation > 60 || scores.awareness > 60) {
                    matchScore += 20;
                }
            }
            
            // 检查摆烂倾向
            if (persona.conditions.memeIndex) {
                const scores = this.calculateScores();
                if (scores.meme > 50) {
                    matchScore += 20;
                }
            }
            
            // 检查独狼倾向
            if (persona.conditions.solitary) {
                if (this.userData.team === '常年单排' || this.userData.team === '随缘组队') {
                    matchScore += 30;
                }
            }
            
            // 检查好感度倾向
            if (persona.conditions.rapport) {
                const scores = this.calculateScores();
                if (scores.rapport > 60) {
                    matchScore += 20;
                }
            }
            
            if (matchScore > bestScore) {
                bestScore = matchScore;
                bestPersona = persona;
            }
        });
        
        return bestPersona;
    },

    // 生成标签
    generateTags() {
        const tags = [];
        
        // 分路标签
        const laneTagMap = {
            '打野': '打野大佬',
            '中单': '法师之灵',
            '对抗路': '上路猛男',
            '发育路': '射手精英',
            '游走': '游走幽灵',
            '全能补位': '全能战士'
        };
        if (this.userData.lane && laneTagMap[this.userData.lane]) {
            tags.push(laneTagMap[this.userData.lane]);
        }
        
        // 性格标签
        const personalityTagMap = {
            '认真指挥型': '队长气质',
            '安静发育型': '稳健发育',
            '温柔稳局型': '定海神针',
            '整活气氛型': '气氛大师',
            '直爽吐槽型': '真性情',
            '佛系随缘型': '随缘之人'
        };
        if (this.userData.personality && personalityTagMap[this.userData.personality]) {
            tags.push(personalityTagMap[this.userData.personality]);
        }
        
        // 组队标签
        const teamTagMap = {
            '固定双排': '单排搭档',
            '三五排开黑': '开黑常客',
            '常年单排': '独狼战士',
            '随缘组队': '随缘侠士',
            '陪朋友上线': '陪玩天使',
            '看心情，都可以': '灵活战士'
        };
        if (this.userData.team && teamTagMap[this.userData.team]) {
            tags.push(teamTagMap[this.userData.team]);
        }
        
        // 昵称关键词标签
        const keywordSource = `${this.userData.nickname || ''}${this.userData.mainHero || ''}`;
        if (keywordSource) {
            Object.keys(DATA.idKeywords).forEach(keyword => {
                if (keywordSource.includes(keyword)) {
                    tags.push(DATA.idKeywords[keyword].tag);
                }
            });
        }
        
        // 作息标签
        const scheduleTagMap = {
            '深夜上分党': '夜间卧虎',
            '午休摸鱼党': '摸鱼高手',
            '放学下班党': '黄金时段',
            '周末集中党': '周末战士',
            '随时在线党': '永远在线'
        };
        if (this.userData.schedule && scheduleTagMap[this.userData.schedule]) {
            tags.push(scheduleTagMap[this.userData.schedule]);
        }
        
        return tags;
    },

    // 显示标签
    displayTags(tags) {
        const container = document.getElementById('tags-container');
        container.innerHTML = '';
        
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            container.appendChild(tagEl);
        });
    },

    // 生成彩蛋文案
    generateEasterEgg() {
        let text = '';
        
        // 第一次见面英雄彩蛋
        if (this.userData.firstHero) {
            text += this.userData.firstHeroCorrect 
                ? DATA.easterEggs.heroCorrect
                : DATA.easterEggs.heroWrong;
            text += '\n\n';
        }
        
        // ID相关彩蛋
        if (this.userData.gameId) {
            const messageIndex = Math.floor(Math.random() * DATA.easterEggs.idMessages.length);
            text += DATA.easterEggs.idMessages[messageIndex](this.userData.gameId);
        } else {
            text += '你的峡谷故事在这里写下了新的篇章。祝你生日快乐，峡谷之中常有欢笑！';
        }
        
        return text;
    },

    // 重新开始
    restart() {
        // 重置数据
        this.currentPageIndex = 0;
        this.userData = {
            firstHero: '',
            firstHeroCorrect: false,
            nickname: '',
            mainHero: '',
            gameId: '',
            lane: '',
            schedule: '',
            personality: '',
            team: '',
            quizAnswers: [null, null, null, null, null, null],
            fortuneDraw: null
        };
        
        // 清空所有输入框
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        this.resetDrawUI();
        
        // 回到首页
        this.goToPage(0);
    },

    // 重置抽签区 UI
    resetDrawUI() {
        const card = document.getElementById('draw-card');
        const fortuneResult = document.getElementById('fortune-result');
        const fortuneText = document.getElementById('fortune-text');
        const confirmBtn = document.getElementById('draw-confirm-btn');

        if (card) {
            card.classList.remove('drawn', 'disabled');
            const text = card.querySelector('.draw-text');
            if (text) {
                text.textContent = '点击抽签';
            }
        }
        if (fortuneResult) {
            fortuneResult.style.display = 'none';
        }
        if (fortuneText) {
            fortuneText.textContent = '';
        }
        if (confirmBtn) {
            confirmBtn.style.display = 'none';
        }
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
