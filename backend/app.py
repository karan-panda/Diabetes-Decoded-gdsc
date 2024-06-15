from flask import Flask, request, jsonify
import numpy as np
import joblib
import tensorflow as tf

app = Flask(__name__)

scaler = joblib.load('scaler.pkl')
model = tf.keras.models.load_model('model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    # Extract the input features from the request data
    features = np.array([[
        data.get('Pregnancies', 0),
        data['Glucose'],
        data['BloodPressure'],
        data['SkinThickness'],
        data['Insulin'],
        data['BMI'],
        data['DiabetesPedigreeFunction'],
        data['Age']
    ]])

    # Scale the features
    scaled_features = scaler.transform(features)

    # Make a prediction
    prediction = model.predict(scaled_features)
    print(prediction)
    is_diabetic = prediction[0][0] >= 0.5

    result = 'diabetic' if is_diabetic else 'non-diabetic'
    probability_percentage = prediction[0][0] * 100 if is_diabetic else (1 - prediction[0][0]) * 100

    return jsonify({
        'prediction': result,
        'probability': f"{probability_percentage:.2f}%",
        'success': True
    })

if __name__ == '__main__':
    app.run(debug=True)