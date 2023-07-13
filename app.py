from flask import Flask, jsonify, request
import datetime

app = Flask(__name__)
history = []

@app.route('/bmi', methods=['POST'])
def calculate_bmi():
    weight = float(request.form['weight'])
    height = float(request.form['height'])

    bmi = weight / (height * height)
    bmi_category = get_bmi_category(bmi)

    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    calculation = {
        'bmi': bmi,
        'category': bmi_category,
        'date': current_date
    }

    history.append(calculation)

    return jsonify(calculation), 201

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify(history), 200

def get_bmi_category(bmi):
    if bmi < 18.5:
        return 'Underweight'
    elif bmi < 25.0:
        return 'Normal Weight'
    elif bmi < 30.0:
        return 'Overweight'
    else:
        return 'Obese'

if __name__ == '__main__':
    app.run(debug=True)