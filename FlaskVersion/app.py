from flask import Flask, send_from_directory, request

from json import JSONEncoder

from sd import process_image


app = Flask(__name__)
app.debug = True


@app.route('/image', methods=['POST'])
def image():
    json = request.get_json()
    print('contentType', request.content_type)
    length = len(json['binaryData'])
    print('json length', length)
    resultImageBuffer = process_image(json['binaryData'])
    resultJsonString = JSONEncoder().encode({'resultImageBuffer': resultImageBuffer})
    return resultJsonString


@app.route('/')
def root():
    return send_from_directory('./public', 'index.html')


@app.route('/public/<path:filename>')
def index(filename):
    # print(filename)
    return send_from_directory('./public', filename)


if __name__ == "__main__":
    app.run(port=8080)
