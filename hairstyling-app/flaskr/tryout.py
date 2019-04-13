from flask import render_template, url_for, session, redirect
from flaskr import app
from flaskr import models
import traceback
import json


@app.route('/tryout')
def tryout():
    user = session['user'] if 'user' in session else None
    if not user:
        return redirect(url_for('login'))
    else:
        return render_template('tryout.html')
