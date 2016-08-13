from flask import Flask, send_from_directory, request, abort


app = Flask(__name__)
# app.debug = True


@app.route('/')
def root():
    return send_from_directory('./public', 'index.html')


@app.route('/<path:filename>')
def index(filename):
    print(filename)
    return send_from_directory('./public', filename)


@app.route('/image', methods=['POST'])
def login():
    # if request.method == 'POST':
    json = request.get_json()
    print(len(json))
    # else:
    #     print(request.method)
    #     abort(400)

if __name__ == "__main__":
    app.run(port=8080)
