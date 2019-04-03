import sys
sys.path.append('../../')
from flaskr.models import *


def get_feature_vector(name):
    """
    Obtain feature vector of a Barbershop from dynamodb
    :param name: barbershop name
    :return: feature vector
    """
    pass


def get_feature_dist(fv1, fv2):
    """
    Obtain distance of two feature vectors
    :param fv1: feature vector1
    :param fv2: feature vector2
    :return: distance (Euclidean or other metrics)
    """
    pass


def get_recmd_list(name):
    """
    Obtain recommended barbershop for customer
    :param name: customer name
    :return: list of barbershop(dict)
    """
    pass
