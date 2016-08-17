# WebAct
Text Recognition made easy on Web 网页技术实现的文字识别

# Deployment 部署须知
Dependencies 依赖：Python2.7.12, Flask 0.11.1, OpenCV 3.0.0-rc1
建议部署人员建立本地化的运行环境，而不是使用系统全局的环境，以免造成冲突

# Code & API
see source code comments 参见源代码注释

# Design
### The current architecture 目前的架构
####1. Frond End 前端
index.html, index.js + web worker

####2. Python 后端，负责 Web Server 和图像处理
Python Flask Web Server + OpenCV Image Processing Module

# Test
### There is no test. 没有测试


# To do, I re-evaluated my priorities.
2. 整理前端代码
3. browser side semantic checking
4. browser side image compression, to make it faster
5. 更合理的UI
