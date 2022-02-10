from flask import Flask, jsonify, request, Response, Blueprint
import threading, requests, sys, json, random
import lib.word_list as WordList

api_v1_blueprint = Blueprint('api_v1_blueprint', __name__)

@api_v1_blueprint.route('/api/v1/word', methods=['GET'])
def return_random_word():
    word_list = WordList.get_words()
    random_word = random.choice(word_list)
    #return Response(json.dumps({'word': random_word}), status=200, mimetype='application/json')
    return jsonify({'word': random_word})
