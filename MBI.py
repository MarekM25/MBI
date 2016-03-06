from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text
from flask.ext.restless import APIManager

app = Flask(__name__,static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pin.db'
db = SQLAlchemy(app)

class Pin(db.Model):
    id = Column(Integer,primary_key = True)
    title = Column(Text, unique = False)
    image = Column(Text, unique = False)

db.create_all()
api_manager = APIManager(app,flask_sqlalchemy_db=db)
api_manager.create_api(Pin, methods=['GET','POST','DELETE','PUT'])

@app.route('/')
def hello_world():
    return app.send_static_file("index.html")

app.debug = True

if __name__ == '__main__':
    app.run()
