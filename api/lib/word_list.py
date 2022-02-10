import json

def get_words():
    configFile = open(".\\config.json", 'r', encoding='utf-8')
    config = json.loads(configFile.read())
    wordList = config['words']
    configFile.close()
    return wordList
