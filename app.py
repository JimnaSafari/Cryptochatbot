from flask import Flask, render_template, request, jsonify
from chatbot import CryptoBuddy

app = Flask(__name__)
chatbot = CryptoBuddy()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    response = chatbot.process_query(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True) 