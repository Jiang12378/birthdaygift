# 王者荣耀生日趣味测评网页 - 部署指南

## 🎉 项目概述

这是一个为朋友生日准备的王者荣耀趣味测评网页。用户可以填写游戏信息、回答选择题、获得五维评分、人设评语和生日祝福。

### ✨ 主要功能

- ✅ 隐藏彩蛋：第一次见面英雄问题
- ✅ 基础信息采集：昵称、本命英雄、分路、性格、组队状态等
- ✅ 6 道趣味选择题
- ✅ 运势签文抽签
- ✅ 五维评分（操作分、意识分、心态分、摆烂指数、队友好感度）
- ✅ 个性化人设匹配（6 种人设评语）
- ✅ 生日彩蛋祝福
- ✅ 轻盈简洁的生日主题 UI

---

## 📁 项目结构

```
birthday-test-site/
├── index.html          # 主页面（所有 HTML 结构）
├── styles.css          # 样式文件（生日主题设计）
├── data.js             # 数据配置（英雄、题目、权重、人设等）
├── script.js           # 主逻辑脚本（页面控制、评分计算、结果生成）
└── README.md           # 本文档
```

---

## 🚀 快速开始

### 方案 A：部署到 GitHub Pages（推荐）

#### 步骤 1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 **"+"** 按钮，选择 **"New repository"**
3. 填写仓库信息：
   - Repository name: `birthday-test` （或你喜欢的名字）
   - Description: `王者荣耀生日趣味测评网页`
   - 选择 **"Public"**
   - 其他选项保持默认
4. 点击 **"Create repository"**

#### 步骤 2：上传文件

**方式1：Web 界面上传（最简单）**

1. 打开新创建的仓库
2. 点击 **"Add file"** → **"Upload files"**
3. 将以下文件拖到上传区域：
   - `index.html`
   - `styles.css`
   - `data.js`
   - `script.js`
4. 在下方写入 commit message：`Initial commit: Add birthday test website`
5. 点击 **"Commit changes"**

**方式2：Git 命令行**

```bash
# 1. 克隆仓库到本地
git clone https://github.com/你的用户名/birthday-test.git
cd birthday-test

# 2. 复制所有文件到该目录
# (将 index.html、styles.css、data.js、script.js 复制到这里)

# 3. 提交更改
git add .
git commit -m "Initial commit: Add birthday test website"
git push origin main
```

#### 步骤 3：启用 GitHub Pages

1. 打开仓库，进入 **Settings**
2. 在左侧菜单找到 **"Pages"**
3. 在 **"Source"** 下拉菜单选择 **"main"** 分支
4. 点击 **"Save"**
5. 等待几秒钟，刷新页面
6. 你会看到一个绿色提示：`Your site is live at https://你的用户名.github.io/birthday-test/`

#### 访问网站

将链接分享给朋友：`https://你的用户名.github.io/birthday-test/`

朋友可以用手机浏览器直接打开，**自动支持 HTTPS**！

---

### 方案 B：本地测试（开发阶段）

#### 使用 VS Code Live Server

1. 在 VS Code 中打开项目文件夹
2. 在 `index.html` 上右键
3. 选择 **"Open with Live Server"**
4. 浏览器自动打开 `http://localhost:5500/index.html`
5. 手机可以连到同一网络，输入电脑 IP 地址访问（例如：`http://192.168.1.100:5500/index.html`）

#### 使用 Python 本地服务器

```bash
# Python 3
python -m http.server 8000

# 然后访问 http://localhost:8000
```

---

## 🛠️ 如何自定义

### 修改英雄列表

编辑 `data.js` 中的 `DATA.heroes` 数组：

```javascript
heroes: [
    { name: '李白', type: '刺客', influence: { operation: 10, awareness: 5, rapport: -5 } },
    // 添加更多英雄...
]
```

### 修改签文内容

编辑 `data.js` 中的 `DATA.fortunes` 数组：

```javascript
fortunes: [
    '大吉签：峡谷之运眷顾于你...',
    // 添加更多签文...
]
```

### 修改人设评语

编辑 `data.js` 中的 `DATA.personas` 数组，修改 `description` 字段。

### 调整题目权重

在 `data.js` 中的 `DATA.questions` 中，每个选项都有 `influence` 字段，可以调整分数权重。

---

## 📊 评分机制说明

### 五维评分

- **操作分**：反映用户的操作水平
- **意识分**：反映用户的游戏意识
- **心态分**：反映用户的心态稳定性
- **摆烂指数**：反映用户容易摆烂的程度
- **队友好感度**：反映用户与队友相处的好感度

### 评分来源

1. **基础分**：每个维度初始 50 分
2. **选择题影响**：每个选项贡献不同的分值
3. **基础信息影响**：
   - 本命英雄会影响操作、意识、队友好感度
   - 常用分路会影响操作、意识、carry 倾向
   - 游戏性格会影响心态、摆烂指数、队友好感度
   - 组队状态会影响队友好感度和人设匹配

### 人设匹配规则

系统根据用户的游戏性格、组队状态、分路等综合信息匹配最适合的人设。

---

## 📱 移动端优化

网站已完全适配移动设备：
- ✅ 单题页面设计（每页一个问题）
- ✅ 大按钮、易点击
- ✅ 竖屏展示（移动优先）
- ✅ 生日主题装饰

---

## 🔧 技术栈

- **前端框架**：纯 HTML/CSS/JavaScript（无外部依赖）
- **存储方式**：浏览器内存（刷新页面数据会丢失）
- **部署平台**：GitHub Pages（免费、自动 HTTPS）

---

## 📋 检查清单

部署前请确认：

- [ ] 所有 4 个文件已上传（index.html、styles.css、data.js、script.js）
- [ ] GitHub Pages 已启用
- [ ] 仓库是 Public 的
- [ ] 可以用手机浏览器访问链接
- [ ] 页面加载正常，无报错

---

## 🐛 常见问题

### Q: 页面打开是空白的

A: 检查浏览器控制台（F12）是否有报错。通常是因为文件路径错误或未找到 JS 文件。

### Q: 手机无法访问

A: 
- 确保 GitHub Pages 已启用
- 检查仓库是否为 Public
- 等待 GitHub 部署完成（通常 1-2 分钟）

### Q: 想要修改内容

A: 所有内容都在 `data.js` 中配置，修改后重新上传即可。

### Q: 想要添加更多题目

A: 在 `data.js` 的 `DATA.questions` 数组中添加新的问题对象，然后在 `script.js` 中确保题目数量匹配。

---

## 📝 许可证

本项目仅供个人使用。

---

## 💡 后续扩展建议

- [ ] 添加后端保存用户结果
- [ ] 生成可分享的海报
- [ ] 多人对比排行
- [ ] 更多个性化人设
- [ ] 集成 AI 生成个性化评语

---

**祝你的朋友生日快乐！🎉🎂**
