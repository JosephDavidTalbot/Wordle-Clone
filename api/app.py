from flask import Flask
from api_v1_blueprint import api_v1_blueprint

app = Flask(__name__)

app.register_blueprint(api_v1_blueprint)


if __name__ == '__main__':
    app.run()
