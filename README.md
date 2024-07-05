# KnowledgeBase-xiaoyibao

[![Data submission](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/submit-data.yml/badge.svg)][1]
[![Web deployment](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/deploy-Web.yml/badge.svg)][2]
[![PDF downloader](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/fetch-PDF.yml/badge.svg)][3]

这是 [xiaoyibao][4] 扩展项目中的知识库项目，用于存储生成 RAG 所需的医疗专业资料。

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][5]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][6]

## 你可以在此获得什么？

最终获益者为患者；仓库直接使用者为小胰宝或其他开源项目的技术人员；内容贡献者为医学相关专家。

面对此仓库，患者和医疗卫生人员可直接在渲染的网站上阅读 pdf 资料；小胰宝相关开发人员可快速构建 RAG 知识库测试 LLM；其他开发人员可获取可用于预训练的专病语料和微调的 QA 对。

## 数据库目录

[访问当前的数据库目录](https://xycjscs.github.io/KnowledgeBase-xiaoyibao/)

您可以通过此链接查看并访问我们的数据库目录，以便获取相关的信息和资源。

## 维基百科形式的协作

文档以维基百科的形式进行协同创作，任何人可以修改文档中的任何内容，包括删减不合适的目录。

- [数据提交](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/issues/new?&template=submit-data.yml&labels=documentation&assignees=xycjscs)
- [数据审核](https://github.com/xycjscs/KnowledgeBase-xiaoyibao/issues?q=is%3Aopen+is%3Aissue+label%3Adocumentation)

## 安装基础环境

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

### 2. 安装 PNPM

```sh
npm install pnpm -g
```

### 3. 下载源码

```sh
cd ~/Desktop
git clone https://github.com/xycjscs/KnowledgeBase-xiaoyibao.git
cd KnowledgeBase-xiaoyibao
```

### 4. 安装依赖

```sh
pnpm install
```

## 数据下载、转换、上传

### 1. 安装 cURL

#### Windows

在 CMD 或 PowerShell 等原生命令行中运行需安装 cURL：

```sh
winget install cURL.cURL -h
# 或
choco install curl -y
```

#### Mac

已内置。

#### Linux

已内置。

### 2. 配置环境变量

在项目根目录的 `.env` 文件中，将相应变量值替换为你实际使用的值。

### 3. 执行命令

```sh
pnpm tool nutritionDB.yml
```

详细用法可执行：

```sh
pnpm tool -h
```

## Web 前端开发

### 启动开发环境

```sh
npm start
```

### 构建生产环境

```sh
pnpm build
```

## 计划准备

### 1. 癌症患者营养食谱知识库

对应数据库文件为 `nutritionDB.yml`

### 2. 癌症患者心理辅导知识库

对应数据库文件为 `PsychologicalDB.yml`

### 3. 高尿酸人群饮食知识库

对应数据库文件为 `HyperuricemiaDB.yml`

> 资料通过“下载链接+下载脚本”形式储存。

计划仓库中不同 YAML 文档存储不同的 `{标题-说明-链接}` 库，README 文件自动读取 YAML 文件渲染首页，下载脚本自动读取 YAML 并执行下载。

## 待开发功能或资料

- [x] 自动化 PDF 文档转 Markdown 文本

- [x] 支持非PDF格式资料：html/doc/xls/txt等

- [ ] QA 对数据库

- [x] 专业人士审核机制

- [ ] 考虑到LLM开发人员多熟悉Python环境，增加以python实现主要或全部功能

- [x] 自动将文档更新于一链接

[1]: https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/submit-data.yml
[2]: https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/deploy-Web.yml
[3]: https://github.com/xycjscs/KnowledgeBase-xiaoyibao/actions/workflows/fetch-PDF.yml
[4]: https://github.com/PancrePal-xiaoyibao/PancrePal-xiaoyibao
[5]: https://codespaces.new/xycjscs/KnowledgeBase-xiaoyibao
[6]: https://gitpod.io/?autostart=true#https://github.com/xycjscs/KnowledgeBase-xiaoyibao
