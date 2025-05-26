from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
from convert_images import get_training_names
from training import load_training_params
from service.classifier_service import handle_fungus_classify

app = Flask(__name__)
root = Blueprint('api_v1', __name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
training_params = load_training_params()
output_classes = get_training_names()


@root.route("/classify-fungus", methods=['POST'])
def classify_fungus():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    result = handle_fungus_classify(
        image, training_params, output_classes)

    return jsonify({'result': result})


app.register_blueprint(root, url_prefix='/api/v1')
