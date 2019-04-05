import sys

sys.path.append('../../')
from flaskr.models import *
import numpy
from flaskr.models import TrainTable


def get_feature_vector(item_name):
    """
    Obtain feature vector of a Barbershop from dynamodb
    :param item_name: barbershop name
    :return: feature vector
    """
    review_table_list = TrainTable().get_train_list('1')
    for item in review_table_list:
        review_table = item['list']
    barbers_list=TrainTable().get_train_list('2')
    for item in barbers_list:
        barbers = item['list']
    for b in len(barbers):
        if barbers[b]==item_name:
            return review_table[:,b]


def get_user_ratings(user_name):
    """
    Obtain feature vector of a Barbershop from dynamodb
    :param user_name: user name
    :return: user ratings
    """
    review_table_list=TrainTable().get_train_list('1')
    for item in review_table_list:
        review_table=item['list']
    #print(review_table)
    review_table_arr=numpy.array(review_table)
    customers_list=TrainTable().get_train_list('3')
    for item in customers_list:
        customers=item['list']
    c=0
    for users in customers:
        if customers[c]==user_name:
            return review_table_arr[c,:]
        c+=1
    return numpy.zeros(review_table_arr.shape[1])


def get_feature_dist(item1, item2):
    """
    Obtain distance of two feature vectors
    :param fv1: feature vector1
    :param fv2: feature vector2
    :return: distance (Euclidean or other metrics)
    """
    fv1=get_feature_vector(1)[item1]
    fv2=get_feature_vector(1)[item2]
    similarity = numpy.corrcoef(fv1, fv2)[0, 1]
    return similarity


def get_unpurchased_item_prediction(user_ratings, item_unpurchased):
    item_purchased = numpy.where(user_ratings > 0)[0]
    purchased_item_ratings=user_ratings[item_purchased]
    item_similarities = numpy.zeros(item_purchased.shape[0])
    count = 0
    for i in item_purchased:
        item_similarities[count]=get_feature_dist(item_unpurchased, i)
        count = count+1
    if ((purchased_item_ratings.size>0) & (item_similarities.size>0)):
        return numpy.sum(purchased_item_ratings * item_similarities) / numpy.linalg.norm(item_similarities, 1)
    else:
        return 0


def get_recmd_list(user_name):
    """
    Obtain recommended barbershop for customer
    :param name: customer name
    :return: list of barbershop(dict)
    """
    user_ratings = get_user_ratings(user_name)
    item_unpurchased = numpy.where(user_ratings == 0)[0]
    predicted_ratings = numpy.zeros(user_ratings.shape[0])
    for i in item_unpurchased:
        predicted_ratings[i]=get_unpurchased_item_prediction(user_ratings, i)
    recmd_list= numpy.where(predicted_ratings > 0)[0]
    print(predicted_ratings)
    return recmd_list

get_recmd_list('liu')