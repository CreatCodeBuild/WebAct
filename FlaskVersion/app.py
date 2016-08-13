from flask import Flask, send_from_directory, request, abort


app = Flask(__name__)
app.debug = True
# url_for('public', filename='index.html')


@app.route('/')
def root():
    return send_from_directory('./public', 'index.html')


@app.route('/<path:filename>')
def index(filename):
    print(filename)
    return send_from_directory('./public', filename)


@app.route('/image', methods=['POST'])
def login():
    if request.method == 'POST':
        do_the_login()
    else:
        abort(400)

if __name__ == "__main__":
    app.run(port=8080)
