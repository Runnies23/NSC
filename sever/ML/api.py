from flask import Flask, request, jsonify
from gemini_generate import generate_Question_Answer
import google.generativeai as genai
import pandas as pd

app = Flask(__name__)
gemini_api_key = "AIzaSyAPLLmfELgkcM1h3xTby08vfgbFOfladoE"
genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel('gemini-pro')

@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, World!"

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    data = request.json
    
    # Check for required data in the request
    if not data or 'topic' not in data or 'amount' not in data:
        return jsonify({'error': 'Missing topic or amount in request'}), 400
    
    topic = data['topic']
    amount = data['amount']
    
    try:
        # Generate prompt using your custom logic
        Question, Answer = generate_Question_Answer(topic, amount, model)
        return jsonify({'question': Question, 'answer': Answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
