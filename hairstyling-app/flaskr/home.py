from flask import render_template, url_for, session, redirect
from flaskr import app
from flaskr import models
import traceback
import json

@app.route('/')
@app.route('/home')
def home():
    user = session['user'] if 'user' in session else None
    if not user:
        return redirect(url_for('login'))
    else:
        try:
            customer_name = session['user']['name']

            # get_latest_visited barbershop by the user
            # resv_table = models.ResvTable()
            # latest_barbershop_name = resv_table.get_latest_barbershop(customer_name)
            # latest_barbershop = None
            # if latest_barbershop_name:
            #     barbershop_table = models.BarberShopTable()
            #     latest_barbershop = barbershop_table.get_barbershop(latest_barbershop_name)

            # get_recmd_list(session['user']['name'])
            # customer_name
            rec_url = ['https://s3.amazonaws.com/ece1779-images/Hagen_Hair_And_Barber.png','https://s3.amazonaws.com/ece1779-images/N15_Hair_Salon.png',
                   'https://s3.amazonaws.com/ece1779-images/Crows_Nest_Barbershop.png']

            rec_title = ['Hagen_Hair_And_Barber', 'N15_Hair_Salon', 'Crows_Nest_Barbershop']
            return render_template('home.html', rec_url=rec_url, rec_title=rec_title)

        except Exception as e:
            print(e)
            traceback.print_tb(e.__traceback__)
            return render_template('error.html', msg='something goes wrong~')


@app.route('/load_markers', methods=['GET', 'POST'])
def load_markers():
    barbershop_table = models.BarberShopTable()
    barbershops = barbershop_table.get_all_barbershop()
    # print(barbershops)
    return json.dumps(barbershops)
