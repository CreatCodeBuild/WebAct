from flask import Flask, url_for, send_from_directory


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


if __name__ == "__main__":
    app.run(port=8080)
