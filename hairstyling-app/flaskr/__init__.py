from flask import Flask
from flaskr.config import Config
import boto3

app = Flask(__name__)
app.config.from_object(Config)

from flaskr import home
from flaskr import explore
from flaskr import login
from flaskr import error