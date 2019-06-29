import sys
sys.path.append('../../')
from flaskr.models import *
import schedule
import time
from flaskr.models import ReviewTable
from flaskr.models import CustomerTable
from flaskr.models import BarberShopTable
from flaskr.models import TrainTable
import numpy



def get_review():
    """
    get user and review of barbershop
    :return: review of barbershop
    """
    #get all customers and barbers to maintain a sequence
    customers = CustomerTable().get_all_customer()
    customers_list=[]
    for items in customers:
        customers_list.append(items['name'])
    barbers = BarberShopTable().get_all_barbershop()
    barbers_list = []
    for items in barbers:
        barbers_list.append(items['name'])

    c=0
    b=0
    review_table=numpy.zeros((len(customers_list),len(barbers_list)))
    for cust in customers_list:
        for barb in barbers_list:
            #print(cust)
            spec_review=ReviewTable().get_review_by_barbershop_and_user(cust,barb)
            average_rating=0
            multi_reviews=1
            for review in spec_review:
                average_rating=(average_rating+review['rating'])/multi_reviews
                review_table[c,b] = average_rating
                multi_reviews+=1
            b+=1
        c+=1

    return review_table, customers_list, barbers_list


def collb_filter():
    """
    run collaborative filtering algorithm
    results are written in dynamoDB
    """
    review_table, customers_list, barbers_list=get_review()
    review_table_list=review_table.tolist()
    review_table_list_dec=[[round(item) for item in sublist] for sublist in review_table_list]
    #print(review_table_list_dec)
    TrainTable().put_train_list(review_table_list_dec,customers_list,barbers_list)
    return None

#collb_filter()


if __name__ == '__main__':
    collb_filter()
    # schedule.every(60).minutes.do(collb_filter)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)
