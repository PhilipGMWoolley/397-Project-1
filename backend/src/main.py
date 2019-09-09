from flask import Flask, jsonify, request

app=Flask(__name__)

@app.route('/')
def index():
    #this is where we load the index page with the form on it
    return jsonify("hello world")

@app.route('/score')
def calculate_score():
    # this is where we calculate the score and send it to the score page
    return