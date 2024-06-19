# KnowledgeBase-xiaoyibao

[![Web deployment](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/deploy-Web.yml/badge.svg)][1]

这是 xiaoyibao 扩展项目中的知识库项目，用于存储生成 RAG 所需的医疗专业资料。

## 数据库目录

[访问当前的数据库目录](https://xycjscs.github.io/KnowledgeBase-xiaoyibao/)

您可以通过此链接查看并访问我们的数据库目录，以便获取相关的信息和资源。

## 下载数据方法

### 1. 安装 Python

#### Windows

```sh
winget install python -h
# 或
choco install python -y
refreshenv
```

#### Mac

```sh
brew install python
```

#### Linux

所有标准发行版已内置，如需自行安装最新版，参考：https://idea2app.feishu.cn/docx/doxcngAN2tjRKS9TH8LHQaXVSUa#doxcnMysQm0kYGgkUAtfQETXoRe

### 2. 更新 PIP 包管理器

```sh
python -m pip install --upgrade pip

# 中国大陆教育网用户切换镜像
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 3. 安装 requests 包

```sh
pip install requests
```

### 4. 执行数据库下载指令

```sh
python downloader.py nutritionDB.json
```

## Web 前端

### 1. 安装 Node.js 和 Git

#### Windows

```sh
winget install OpenJS.NodeJS.LTS Git.Git -h
# 或
choco install nodejs-lts git -y
```

#### Mac

```sh
brew install git node@18
```

#### Linux

- [Node.js 官方教程](https://nodejs.org/en/download/package-manager/all)
- [Git 官方教程](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#_installing_on_linux)

### 2. 下载源码

```sh
cd ~/Desktop
git clone https://github.com/xycjscs/KnowledgeBase-xiaoyibao.git
cd KnowledgeBase-xiaoyibao
```

### 3. 安装并启动开发环境

```sh
npm install
npm start
```

## 计划准备

### 1. 癌症患者营养食谱知识库

对应数据库文件为 `nutritionDB.json`

### 2. 癌症患者心理辅导知识库

对应数据库文件为 `PsychologicalDB.json`

### 3. 高尿酸人群饮食知识库

对应数据库文件为 `HyperuricemiaDB.json`

> 资料通过“下载链接+下载脚本”形式储存。

计划仓库中不同 json 文档存储不同的 `{标题-说明-链接}` 库，README 文件自动读取 json 文件渲染首页，下载脚本自动读取 json 并执行下载。

## 维基百科形式的协作

文档以维基百科的形式进行协同创作，任何人可以修改文档中的任何内容，包括删减不合适的目录。

贡献者可通过修改 json 文件提交代码，提交代码前需要检查下载脚本是否可以正确执行。

## 待开发功能或资料

- [ ] 自动化 PDF 文档转 Markdown 文本

  - https://github.com/bsorrentino/pdf-tools
  - https://github.com/opengovsg/pdf2md

- [ ] QA 对数据库

- [ ] 专业人士审核机制

- [x] 自动将文档更新于一链接

[1]: https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/deploy-Web.yml
