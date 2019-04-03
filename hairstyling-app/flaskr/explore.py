from flask import render_template, url_for, session, redirect
from flaskr import app
import traceback

@app.route('/')
@app.route('/explore')
def explore():
    user = session['user'] if 'user' in session else None
    if not user:
        return redirect(url_for('login'))
    else:
        try:
            return render_template('explore.html')
        except Exception as e:
            traceback.print_tb(e.__traceback__)
            return render_template('error.html', msg='something goes wrong~')
