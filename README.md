# KnowledgeBase-xiaoyibao

### 这是 xiaoyibao 扩展项目中的知识库项目，用于存储生成 RAG 所需的医疗专业资料。

下载数据方法为：

#### 1. 安装 Python
```sh
# 安装 Python
```

#### 2. 安装 requests 包
```sh
pip install requests
```

#### 3. 执行数据库下载指令
```sh
python downloader.py nutritionDB.json
```

## 计划准备：
#### 1. 癌症患者营养食谱知识库

对应数据库文件为 `nutritionDB.json`

#### 2. 癌症患者心理辅导知识库

对应数据库文件为 `PsychologicalDB.json`

#### 3. 高尿酸人群饮食知识库

对应数据库文件为 `HyperuricemiaDB.json`

## 资料通过“下载链接+下载脚本”形式储存。

计划仓库中不同 json 文档存储不同的 `{标题-说明-链接}` 库，README 文件自动读取 json 文件渲染首页，下载脚本自动读取 json 并执行下载。

## 维基百科形式的协作
文档以维基百科的形式进行协同创作，任何人可以修改文档中的任何内容，包括删减不合适的目录。

贡献者可通过修改 json 文件提交代码，提交代码前需要检查下载脚本是否可以正确执行。