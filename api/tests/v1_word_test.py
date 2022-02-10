import threading, requests, sys, json, pytest

target = 'http://localhost:5000/api/v1/word'

def test_one_status():
    status_all_good = True
    for i in range(20):
        if(requests.get(target).status_code != 200):
            status_all_good = False
    assert status_all_good

def test_two_variety():
    words = []
    for i in range(20):
        temp = json.loads(requests.get(target).text)
        words.append(temp["word"])
    max_occurance = 0
    for word in words:
        if (words.count(word) > max_occurance):
            max_occurance = words.count(word)
    assert max_occurance < 3
