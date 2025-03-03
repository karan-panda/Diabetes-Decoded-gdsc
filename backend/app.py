from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load the scaler and model
scaler = joblib.load('scaler.pkl')
model = tf.keras.models.load_model('model.h5', compile=False)  # No need to compile here
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])  # Optional for inference

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        # Extract the input features from request data
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

        # Predict
        prediction = model.predict(scaled_features)
        print("Raw Prediction:", prediction)

        is_diabetic = prediction[0][0] >= 0.5
        result = 'diabetic' if is_diabetic else 'non-diabetic'
        probability_percentage = prediction[0][0] * 100 if is_diabetic else (1 - prediction[0][0]) * 100

        print("Result:", result, f"with {probability_percentage:.2f}% confidence")

        return jsonify({
            'prediction': result,
            'probability': f"{probability_percentage:.2f}%",
            'success': True
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
