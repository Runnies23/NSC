from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
import cv2
import easyocr
import numpy as np 

app = Flask(__name__)
reader = easyocr.Reader(['th'])

def ImageAugment(image):
    # Convert PIL image to OpenCV format
    open_cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    grayinput = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
    _, binaryImage = cv2.threshold(grayinput, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    result = reader.readtext(binaryImage)
    text_only = [item[1] for item in result]
    return text_only

@app.route('/process_image', methods=['POST'])
def process_image():
    # Get image from request
    image_data = base64.b64decode(request.json['image'])
    image = Image.open(io.BytesIO(image_data))

    # Perform OCR
    text = ImageAugment(image)

    return jsonify({
        'OCR_Text': text
    })

if __name__ == '__main__':
    app.run(debug=True)
