import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS

indicies = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}

app = Flask(__name__)
CORS(app)

# Load model and face cascade once
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# Always resolve model path relative to this file's location
model_path = os.path.join(os.path.dirname(__file__), 'assets', 'model_new.h5')
print('Loading model from:', model_path)
model = tf.keras.models.load_model(model_path)

def predict_emotion(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    for (x, y, w, h) in faces:
        face = img[y:y+h, x:x+w]
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
        face = cv2.resize(face, (48, 48))
        face_array = np.array(face)
        face_array = np.expand_dims(face_array, axis=0)
        face_array = np.expand_dims(face_array, axis=-1)
        prediction = np.argmax(model.predict(face_array), axis=1)
        class_ = indicies[prediction[0]]
        print(f"Predicted Emotion: {class_}")  # Print in terminal
        return class_
    print("No face detected")
    return "No face detected"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    import imghdr
    if not imghdr.what(file):
        return jsonify({'error': 'Uploaded file is not a valid image'}), 400
    image_bytes = file.read()
    emotion = predict_emotion(image_bytes)
    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True) 