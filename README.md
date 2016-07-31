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
####1. A Javascript Brwoser End
Currently I have 2 main modules created by me:
1. index.js: the user space code which bridges html with other APIs
2. socketio_client_manager.js: manages all the socketio usage, such as file upload/download, exposes a set of APIs to index.js

Currently dependencies:
socketio, socketio-stream, materializecss, and most importantly tesseract.js

####2. A NodeJS Express Back End
Just a bridge between browser and Python. If I know how to do web dev in Python such as Flask, Django, I will probably just use them instead of NodeJS with Express. Anyway, the choice of NodeJS is purely due to my ignorance rather than any smart decision.

####3. A Python Image Processing module that should be called by NodeJS (probably through a file stream in some manner)
This is just a python script that uses opencv to process images. It send the processed image back to NodeJS. Then NodeJS send this iamge back to browser.

Although the text recognition is purely done on browser by tesseract.js and a web worker (or service worker? I'm not sure yet), the image still required some preprocess. OpenCV might be the best image manipulation tools available since this software needs to do some pretty advanced image processing. Currently, the python code just extract all the text by removing other stuff from the original image.

# Test
### There is no test.
I heard of Test Driven Development. I heard of behavioral test vs. implementation test. I have never done them.
That said, I'm just a newbie developer.

# To do, I re-evaluated my priorities.
1. make sure python module can send a complete image back to NodeJS 
   and NodeJS can send a complete file/image back to browser
      Very likely that I am doing something terribly wrong on opencv side.
2. browser side semantic checking
3. browser side image compression, to make it faster
4. refine the socketio module and apis, make the code more maintable if I have enough time
