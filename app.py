from flask import Flask, render_template, request, jsonify
import random
import os

app = Flask(__name__)

# Fake predictions for UI testing
FAKE_CLASSES = [
    "Apple - Black Rot",
    "Apple - Healthy",
    "Corn - Common Rust",
    "Potato - Late Blight",
    "Tomato - Early Blight"
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("image")

    if not file:
        return jsonify({"error": "No image uploaded"})

    filepath = os.path.join("static", file.filename)
    file.save(filepath)

    label = random.choice(FAKE_CLASSES)
    confidence = round(random.uniform(70, 99), 2)

    return jsonify({
        "prediction": label,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)
