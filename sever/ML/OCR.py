from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io
import base64
from transformers import pipeline

app = Flask(__name__)

# Initialize LLM
generator = pipeline('text-generation', model='gpt2')

@app.route('/process_image', methods=['POST'])
def process_image():
    # Get image from request
    image_data = base64.b64decode(request.json['image'])
    image = Image.open(io.BytesIO(image_data))

    # Perform OCR
    text = pytesseract.image_to_string(image)

    # Generate flashcard using LLM
    prompt = f"Create a flashcard question and answer based on this text: {text}"
    generated_text = generator(prompt, max_length=100, num_return_sequences=1)[0]['generated_text']

    # Extract question and answer (this is a simple approach, you might need more sophisticated parsing)
    parts = generated_text.split('\n')
    question = parts[0] if len(parts) > 0 else ""
    answer = parts[1] if len(parts) > 1 else ""

    return jsonify({
        'original_text': text,
        'question': question,
        'answer': answer
    })

if __name__ == '__main__':
    app.run(debug=True)