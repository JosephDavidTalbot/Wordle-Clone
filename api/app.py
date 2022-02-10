from flask import Flask, jsonify, request, Response
import threading, requests, sys, json, sqlite3, random
from sqlite3 import Error

app = Flask(__name__)


configFile = open(".\\config.json", 'r', encoding='utf-8')
config = json.loads(configFile.read())
wordList = config['words']
configFile.close()

#Step #1: Return a word
@app.route('/api/v1/word', methods=['GET'])
def return_random_word():
    random_word = random.choice(wordList)
    #return Response("{\nword: \'"+random_word+"\'\n}", status=200, mimetype='application/json')
    return Response(json.dumps({'word': random_word}), status=200, mimetype='application/json')

@app.route('/')
def hello_world():
    return "Hello, world"

if __name__ == '__main__':
    app.run()
