# -*- coding: utf-8 -*-
import os
import json
from flask import Flask, request, send_file
from flask import render_template

app = Flask(__name__, template_folder='templates', static_folder='static_animationlist', static_url_path='/static_animationlist')
app.jinja_env.variable_start_string = '{['
app.jinja_env.variable_end_string = ']}'

with open('./animation_data/all_data.json', encoding='utf-8') as json_file:
    animation_data = json.load(json_file)

print('Waiting...')


@app.route('/animationlist', methods=["GET", "POST"])
def index():
    return render_template('index.html')

@app.route('/animationlist/comment', methods=["GET", "POST"])
def comment():
    id_list = request.args.get('data').split(',')
    result = {}
    for id in id_list:
        result['_' + str(id)] = animation_data['_' + str(id)]
    return render_template(
        'comment.html',
        data=result
    )

@app.route('/animationlist/result', methods=["GET", "POST"])
def result():
    id_list = request.args.get('data').split(',')
    user_id = request.args.get('id')
    title = request.args.get('title')
    content = request.args.get('content')
    data = {}
    for id in id_list:
        data['_' + str(id)] = animation_data['_' + str(id)]
    return render_template(
        'result.html',
        id=user_id,
        data=data,
        title=title,
        content=content
    )

@app.route('/animationlist/getListFromId', methods=["POST"])
def get_list_from_name():
    id_list = request.form.get('data').split(',')
    result = {}
    for id in id_list:
        result[str(id)] = animation_data[str(id)]
    return result


@app.route('/animationlist/getCover', methods=["GET"])
def get_cover():
    path = request.args.get('path').replace('and_signal_amp;', '&')
    pic_path = os.path.join(os.path.abspath('.'), '.' + path)
    print(pic_path)
    return send_file(pic_path)

@app.route('/animationlist/getBackground', methods=["GET"])
def get_background():
    return send_file('./static_animationlist/picture/background.png')

@app.route('/animationlist/getData', methods=["GET"])
def get_data():
    year = request.args.get('year')
    with open('./animation_data/data_' + year + '.json', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return json.dumps(data)

@app.route('/animationlist/getDataDict', methods=["GET"])
def get_data_dict():
    with open('./animation_data/data_dict.json', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return json.dumps(data)


@app.route('/error')
def error():
    return '404 not found'


app.run(host='0.0.0.0', debug=False, port=52173)  # 52inami
