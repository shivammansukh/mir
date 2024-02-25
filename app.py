from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def count_images_in_folder(folder_path):
    count = 0
    for filename in os.listdir(folder_path):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            count += 1
    return count

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'files[]' not in request.files:
        return jsonify({'error': 'No file part'})

    files = request.files.getlist('files[]')
    results = []

    
    image_count = count_images_in_folder(UPLOAD_FOLDER)
    print(image_count)
    if image_count < 1:
        for file in files:
            
            if file and allowed_file(file.filename):
                filename = file.filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                results.append(filename + ' uploaded successfully')
            else:
                results.append(file.filename + ' is not allowed')

        return jsonify({'results': results})
    else:
        results.append('Previous request is not completed yet... Please wait for mail...')
        return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
