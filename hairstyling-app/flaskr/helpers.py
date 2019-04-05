import os
from models import *
import aws
import base64
import uuid
import re
from random import randint

def get_rand_lat_lon():
    min_lat, max_lat = 436416, 437977
    min_lon, max_lon = -796012, -793229
    lat = randint(min_lat, max_lat)
    lon = randint(min_lon, max_lon)
    return str(lat), str(lon)

def load_barbershop(dirname):
    for filename in os.listdir(dirname):
        name = base64.urlsafe_b64encode(uuid.uuid4().bytes).decode('utf-8')
        password = name
        title = re.sub('_', ' ', filename).split('.')[0]
        image = aws.upload_file(dirname, filename)
        lat, lon = get_rand_lat_lon()

        barbershop_table = BarberShopTable()
        barbershop_table.put_barbershop(name, password, title, image, lat, lon)

if __name__ == '__main__':
    dirname = '/Users/liuwl/Documents/UoT/course/cloud computing/assignments/a3/pictures'
    load_barbershop(dirname)
    # aws.clear_s3()