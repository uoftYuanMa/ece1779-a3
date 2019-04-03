from flask import render_template, url_for, session, redirect
from flaskr import app
import traceback

@app.route('/')
@app.route('/home')
def home():
    user = session['user'] if 'user' in session else None
    if not user:
        return redirect(url_for('login'))
    else:
        try:
            # get_recmd_list(session['user']['name'])

            # get_latest_visited(session['user']['name'])

            return render_template('home.html')
        except Exception as e:
            traceback.print_tb(e.__traceback__)
            return render_template('error.html', msg='something goes wrong~')
