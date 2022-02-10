from flask import Flask, jsonify, request, Response, Blueprint
import threading, requests, sys, json, sqlite3, random
from sqlite3 import Error

api_v1_blueprint = Blueprint('api_v1_blueprint', __name__)


configFile = open(".\\config.json", 'r', encoding='utf-8')
config = json.loads(configFile.read())
wordList = config['words']
configFile.close()

@api_v1_blueprint.route('/api/v1/word', methods=['GET'])
def return_random_word():
    random_word = random.choice(wordList)
    return Response(json.dumps({'word': random_word}), status=200, mimetype='application/json')
