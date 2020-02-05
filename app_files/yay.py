
import flask
from flask import request

from flask import render_template
from flask import Flask
import pickle
import sklearn
import numpy as np 
from sklearn.externals import joblib

#define functions for the different predictions
def predict_cat(to_predict_list): 
    loaded_model = joblib.load("rel_length_RF.sav") 
    result_a = loaded_model.predict(to_predict_list) 
    return result_a[0] 

def predict_quality(to_predict_list):
    loaded_model = joblib.load("rel_quality_model_RF.sav")
    result_b = loaded_model.predict(to_predict_list)
    return result_b[0]

# Initialize the app
app = Flask(__name__)
# An example of routing:
# If they go to the page "/" (this means a GET request
# to the page http://127.0.0.1:5000/)
@app.route("/", methods=['GET', 'POST'])
def predict():
    if request.method == 'POST': 
        to_predict_list = request.form.to_dict()
        print(to_predict_list); 
        to_predict_list = list(to_predict_list.values())
        print(to_predict_list);
        to_predict_list = np.array(to_predict_list)
        to_predict_list = to_predict_list.reshape(1,-1) 
        result1 = predict_cat(to_predict_list)
        if (result1 == "bottom_quartile"):
            answer="less than 10 years"
        elif (result1 == "second_quartile"):
            answer="10 to 18 years"
        elif (result1 == "third_quartile"):
            answer="18 to 30 years"
        else:
            answer="more than 30 years" 
        result2 = predict_quality(to_predict_list)
        return render_template("results.html", prediction1 = answer, prediction2 = result2)     
    else:    
        return render_template('couple_input.html')

# Start the server, continuously listen to requests.
if __name__=="__main__":
    # For local development, set to True:
    app.run(debug=False)
    # For public web serving:
    #app.run(host='0.0.0.0')
    app.run()