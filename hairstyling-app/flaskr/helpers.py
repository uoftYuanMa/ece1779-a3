import os
from models import *

def load_barbershop(dirname):
    for file in os.listdir(dirname):
        print(file)

if __name__ == '__main__':
    dirname = '/Users/liuwl/Documents/UoT/course/cloud computing/assignments/a3/pictures'
    load_barbershop(dirname)