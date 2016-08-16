# WebAct
Text Recognition made easy on Web

# How to Use It?
The web app is not publicly avaiable yet. Still developing...
But you can fork or clone this repo, and run it in your localhost with NodeJS

# Code & API
see the source code comments

# Design
### The current architecture
####1. Frond End 前端
Currently I have 2 main modules created by me:
1. index.js: the user space code which bridges html with other APIs

####2. Python 后端，负责 Web Server 和图像处理
This is just a python script that uses opencv to process images. It send the processed image back to NodeJS. Then NodeJS send this iamge back to browser.

# Test
### There is no test. 没有测试


# To do, I re-evaluated my priorities.
1. 将得到的二进制数据变成文件，
2. 整理前端代码，显示到UI （image element）
3. browser side semantic checking
4. browser side image compression, to make it faster
5. 更合理的UI
