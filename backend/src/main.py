from flask import Flask, jsonify, request
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.route('/')
def index():
    #this is where we load the index page with the form on it
    return jsonify("hello world")

@app.route('/score', methods=['GET'])
def calculate_score():
    # this is where we calculate the score and send it to the score page
    return jsonify(score=10, category="true")