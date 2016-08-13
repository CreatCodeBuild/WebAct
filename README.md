# WebAct
Text Recognition made easy on Web

# How to Use It?
The web app is not publicly avaiable yet. Still developing...
But you can fork or clone this repo, and run it in your localhost with NodeJS

# Code & API
see the source code comments

# Design
I watched a "Documentation Driven Development" talk from PyCon16, which inspired me to write this doc to guide my development.
Hope this can get you excited to join me as well. (No, I don't really has that hope unless this is a cool software)

### The current architecture
####1. Frond End 前端
Currently I have 2 main modules created by me:
1. index.js: the user space code which bridges html with other APIs
2. socketio_client_manager.js: manages all the socketio usage, such as file upload/download, exposes a set of APIs to index.js

Currently dependencies:
socketio, socketio-stream, materializecss, tesseract.js

####2. NodeJS Express Back End
A bridge between browser and Python.

####3. A Python Image Processing module that should be called by NodeJS (probably through a file stream in some manner)
This is just a python script that uses opencv to process images. It send the processed image back to NodeJS. Then NodeJS send this iamge back to browser.

# Test
### There is no test. 没有测试


# To do, I re-evaluated my priorities.
0. Change the whole system to Flask / jQuery ajax should be good for file/binary data uploading
1. browser needs to construct an image from the string buffer it received from NodeJS
2. browser side semantic checking
3. browser side image compression, to make it faster
