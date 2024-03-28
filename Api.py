from recomment import movie_recommendation,getpage
from flask import Flask, render_template,request,jsonify,json
from flask_cors import CORS, cross_origin
import pandas as pd

app=Flask(__name__)
CORS(app, support_credentials=True)
@app.route("/recomment",methods=['GET','POST'])
def recomment():
    param_value = request.args.get('name')
    try:
        jsondata =  movie_recommendation(f'{param_value}')
        return jsondata
    except:
        return {}

@app.route("/home",methods=['GET','POST'])
def home():
    param_value = request.args.get('page')
    return getpage(f'{param_value}')

if __name__ == '__main__':
    app.run(debug=True)