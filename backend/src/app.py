import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import base64
from io import BytesIO

indicies = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load model and face cascade once
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
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

@app.route('/predict-sentiment', methods=['POST'])
def predict_sentiment():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    assets_path = os.path.join(os.path.dirname(__file__), 'assets')
    tfidf_path = os.path.join(assets_path, 'tfidf_vectorizer.pkl')
    model_path = os.path.join(assets_path, 'sentiment_model.pkl')

    tfidf = joblib.load(tfidf_path)
    model = joblib.load(model_path)

    X = tfidf.transform([text])
    pred = model.predict(X)
    sentiment = pred[0]

    print(f"Sentiment for '{text}': {sentiment}")
    return jsonify({'status': 'ok'})

def calculate_final_sentiment(photo_sentiment, text_sentiment):
    photo_map = {
        "Happy": 2, "Surprise": 1, "Neutral": 0,
        "Sad": -1, "Fear": -1, "Angry": -2, "Disgust": -2
    }
    text_map = {
        "Normal": 0, "Stress": -1, "Anxiety": -2,
        "Depression": -3, "Bipolar": -3, 
        "Personality disorder": -4, "Suicidal": -5
    }
    photo_score = photo_map.get(photo_sentiment, 0)
    text_score = text_map.get(text_sentiment, 0)
    final_score = (photo_score * 0.4) + (text_score * 0.6)
    # Normalize to 0-5 scale
    min_score = -5
    max_score = 2
    normalized_score = (final_score - min_score) / (max_score - min_score) * 5
    normalized_score_rounded = round(normalized_score, 2)
    combined_map = {**photo_map, **text_map}
    final_class = min(combined_map, key=lambda k: abs(combined_map[k] - final_score))
    return {
        "photo_sentiment": photo_sentiment,
        "text_sentiment": text_sentiment,
        "final_score": normalized_score_rounded,
        "final_class": final_class
    }

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    image_bytes = None
    # Check for photo file or base64 string
    if 'file' in request.files:
        file = request.files['file']
        import imghdr
        if not imghdr.what(file):
            return jsonify({'error': 'Uploaded file is not a valid image'}), 400
        image_bytes = file.read()
    elif 'image_base64' in request.form:
        image_base64 = request.form['image_base64']
        if image_base64.startswith('data:image'):
            image_base64 = image_base64.split(',')[1]
        try:
            image_bytes = base64.b64decode(image_base64)
        except Exception as e:
            return jsonify({'error': 'Invalid base64 image data'}), 400
    else:
        return jsonify({'error': 'Photo is required'}), 400

    # Predict emotion from photo
    photo_sentiment = predict_emotion(image_bytes)

    # Check for thought
    thought = request.form.get('thought', '').strip()
    text_sentiment = None
    if thought:
        # Predict sentiment from thought
        assets_path = os.path.join(os.path.dirname(__file__), 'assets')
        tfidf_path = os.path.join(assets_path, 'tfidf_vectorizer.pkl')
        model_path = os.path.join(assets_path, 'sentiment_model.pkl')
        import joblib
        tfidf = joblib.load(tfidf_path)
        model = joblib.load(model_path)
        X = tfidf.transform([thought])
        pred = model.predict(X)
        text_sentiment = pred[0]
        result = calculate_final_sentiment(photo_sentiment, text_sentiment)
        print(f"Photo sentiment: {photo_sentiment}, Thought sentiment: {text_sentiment}, Final score: {result['final_score']}, Final class: {result['final_class']}")
        print(f"Final score: {result['final_score']}, Final sentiment: {result['final_class']}")
    else:
        # Only photo provided, use photo only in mapping
        result = calculate_final_sentiment(photo_sentiment, None)
        print(f"Photo sentiment: {photo_sentiment}, Final score: {result['final_score']}, Final class: {result['final_class']}")
        print(f"Final score: {result['final_score']}, Final sentiment: {result['final_class']}")

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)