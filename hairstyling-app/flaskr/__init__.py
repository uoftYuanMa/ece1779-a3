from flask import Flask
from flaskr.config import Config
import boto3

app = Flask(__name__)
app.config.from_object(Config)

from flaskr import home
from flaskr import home_barbershop
from flaskr import tryout
from flaskr import barbershop
from flaskr import login
from flaskr import error

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
