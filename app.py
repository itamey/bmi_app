# Import necessary libraries
from cgitb import html
from flask import Flask, render_template, url_for, jsonify, request
import datetime

# Initialize Flask application
app = Flask(__name__)

# List to store BMI calculation history
history = []

# Route to the landing page
@app.route('/landing', methods=['GET', 'POST'])
def landing():
    return render_template("landing.html"), 200

# Route to the main BMI calculator page
@app.route('/', methods=['GET', 'POST'])
def bmi_app():
    return render_template("bmi_app.html"), 200

# Route to handle BMI calculation
@app.route('/bmi', methods=['POST'])
def calculate_bmi():
    # Get weight and height input from the form
    weight = float(request.form['weight'])
    height = float(request.form['height'])

    # Calculate BMI
    bmi = weight / (height * height)

    # Determine BMI category based on the calculated BMI
    bmi_category = get_bmi_category(bmi)

    # Get the current date and time
    current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Store the BMI calculation and related information in a dictionary
    calculation = {
        'bmi': bmi,
        'category': bmi_category,
        'date': current_date
    }

    # Append the current calculation to the history list
    history.append(calculation)

    # Return the BMI calculation result as JSON response with status code 201 (Created)
    return jsonify(calculation), 201

# Route to retrieve the BMI calculation history
@app.route('/history', methods=['GET'])
def get_history():
    # Return the entire BMI calculation history as JSON response with status code 200 (OK)
    return jsonify(history), 200

# Function to determine BMI category based on the BMI value
def get_bmi_category(bmi):
    if bmi < 18.5:
        return 'Underweight'
    elif bmi < 25.0:
        return 'Normal Weight'
    elif bmi < 30.0:
        return 'Overweight'
    else:
        return 'Obese'

# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
