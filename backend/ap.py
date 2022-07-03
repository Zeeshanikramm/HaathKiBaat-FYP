from flask import Flask,jsonify
from flask import request
from flask import Response
#from flask_cors import CORS
from pprint import pprint
import json
import base64
import speech_recognition as sr
app = Flask(__name__)
#CORS(app)

@app.route('/audio', methods=['POST'])
def process_audio():
    # GET JSON FROM FRONTEND
    data = request.get_json()
    # Get temp_uri from the JSON
    encode_string = data['temp_uri']
    # Open an Audio file at backend
    wav_file = open("phone_audio.wav", "wb")
    # Decode base64 string that came from frontend
    decode_string = base64.b64decode(encode_string)
    # Write that string to the audio file that was opened
    wav_file.write(decode_string)
    recognizer = sr.Recognizer()
    # Open audio file for transcribing
    audioFile = sr.AudioFile("phone_audio.wav")
    with audioFile as source:
        data = recognizer.record(source)
    transcript = recognizer.recognize_google(data, key=None, language='ur-PK')
    strr = transcript
    print(strr)
    # POST / Return a Transcribed string in JSON format
    return jsonify({'message': strr})

if __name__ == "__main__":
    app.run(debug=True)
