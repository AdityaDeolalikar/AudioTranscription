# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import whisper
# import os

# # Initialize the Flask app and allow CORS
# app = Flask(__name__)
# CORS(app)

# # Load the Whisper model
# model = whisper.load_model("base")  # Choose model size (base, small, medium, large)

# # Create an endpoint for transcribing audio files
# @app.route('/transcribe', methods=['POST'])
# def transcribe_audio():
#     try:
#         # Get the uploaded file from the request
#         audio_file = request.files['audio']
        
#         # Set the path where the audio file will be saved temporarily
#         audio_path = os.path.join("uploads", audio_file.filename)
        
#         # Save the uploaded audio file
#         audio_file.save(audio_path)
        
#         # Transcribe the audio file using Whisper
#         result = model.transcribe(audio_path)
#         transcription = result["text"]
        
#         # Remove the audio file after transcription
#         os.remove(audio_path)
        
#         # Return the transcription result as JSON
#         return jsonify({"transcription": transcription})

#     except Exception as e:
#         # Handle errors and return a message to the frontend
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     # Ensure the uploads directory exists
#     os.makedirs("uploads", exist_ok=True)
#     # Run the Flask app
#     app.run(port=5000, debug=True)
# # ---------------------------------------------------------------------------------
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os

# Initialize the Flask app and allow CORS
app = Flask(__name__)
CORS(app)

# Load the Whisper model
model = whisper.load_model("base")  # Choose model size (base, small, medium, large)

# Create an endpoint for transcribing audio files with timestamps
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    try:
        # Get the uploaded file from the request
        audio_file = request.files['audio']
        
        # Set the path where the audio file will be saved temporarily
        audio_path = os.path.join("uploads", audio_file.filename)
        
        # Save the uploaded audio file
        audio_file.save(audio_path)
        
        # Transcribe the audio file using Whisper
        result = model.transcribe(audio_path)
        
        # Extract segments with timestamps
        segments = []
        for segment in result["segments"]:
            # Each segment has 'start', 'end', and 'text'
            segments.append({
                "start": segment["start"],
                "end": segment["end"],
                "text": segment["text"]
            })
        
        # Remove the audio file after transcription
        os.remove(audio_path)
        
        # Return the transcription segments as JSON
        return jsonify({"segments": segments})

    except Exception as e:
        # Handle errors and return a message to the frontend
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Ensure the uploads directory exists
    os.makedirs("uploads", exist_ok=True)
    # Run the Flask app
    app.run(port=5000, debug=True)
