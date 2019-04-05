import boto3

import time
from boto3.dynamodb.conditions import Key, Attr
import datetime


dynamodb = boto3.resource('dynamodb')


class CustomerTable:
    table = dynamodb.Table('customer')

    def get_customer(self, name):
        response = self.table.get_item(
            Key={
                'name': name
            }
        )
        customer = None
        if 'Item' in response:
            customer = response['Item']
        return customer

    def get_all_customer(self):
        response = self.table.scan(
            TableName="customer"
        )
        items = response['Items']
        return items

    def put_customer(self, name, salt, password, usertype):
        customer = {
            'name': name,
            'salt': salt,
            'password': password,
            'usertype': usertype
        }
        self.table.put_item(
            Item=customer
        )


class BarberShopTable:
    table = dynamodb.Table('barbershop')

    def get_barbershop(self, name):
        response = self.table.get_item(
            Key={
                'name': name
            }
        )
        barbershop = None
        if 'Item' in response:
            barbershop = response['Item']
        return barbershop


    def get_all_barbershop(self):
        response = self.table.scan(
            TableName="barbershop"
        )
        items = response['Items']
        return items
    def get_all(self):
        response = self.table.scan()
        items = None
        if 'Items' in response:
            items = response['Items']

        return items

    def put_barbershop(self, name, password, title, image, lat, long):

        barbershop = {
            'name': name,
            'password': password,
            'title': title,
            'image': image,
            'lat': lat,
            'long': long
        }
        self.table.put_item(
            Item=barbershop
        )


class ReviewTable:
    table = dynamodb.Table('review')

    def get_review_by_barbershop(self, barbershop):
        # todo query all reviews of a barbershop
        response = self.table.query(
            KeyConditionExpression=Key('barbershop').eq(barbershop)
        )
        items = response['Items']
        return items

    def scan_review_table(self):
        response = self.table.scan(
            TableName="review",
            ProjectionExpression="barbershop, customer"
        )
        items = response['Items']
        return items

    def get_review_by_barbershop_and_user(self, customer, barbershop):
        # todo query all reviews of a barbershop
        response = self.table.query(
            KeyConditionExpression=Key('barbershop').eq(barbershop) & Key('customer').eq(customer)
        )
        items = response['Items']
        return items

    def put_review_by_barbershop(self, customer, barbershop, timestamp, text, rating):
        # todo  to confirm about timestamp????
        # reviewid = (str)((int)(time.time()))
        review = {
            'resvid': reviewid,
            'customer': customer,
            'barbershop': barbershop,
            'timestamp': timestamp,
            'text': text,
            'rating': rating
        }
        self.table.put_item(
            Item=review
        )


class ResvTable:
    table = dynamodb.Table('resv')

    def put_latest_barbershop(self, customer, barbershop, timestamp,
                              expected_time, price, service_type):
        """
        record the last reservation
        :param name:
        :param barbershop_name:
        :return: null
        """
        # todo what about the timestamp
        # resvid = (str)((int)(time.time()))
        new_record = {
            'resvid': resvid,
            'customer': customer,
            'barbershop': barbershop,
            'timestamp': timestamp,
            'expected_time': expected_time,
            'price': price,
            'service_type': service_type
        }
        self.table.put_item(
            Item=new_record
        )

    def get_latest_barbershop(self, customer):
        """
        get latest visited(reserved) barbershop
        :param customer: user name

        """

#         current_time = (str)((int)(time.time()))
#         response = self.table.query(
#             KeyConditionExpression=Key('customer').eq(customer) & Key('expected_time').gt(current_time),
#             ScanIndexForward=False

#         )
#         items = response['Items']

#         return items

        response = self.table.scan()

        latest_barbershop = None
        latest_timestamp = -1
        if 'Items' in response:
            items = response['Items']
            for item in items:
                if item['customer'] == name and latest_timestamp < int(item['timestamp']):
                    latest_timestamp = int(item['timestamp'])
                    latest_barbershop = item['barbershop']

        return latest_barbershop



    def get_reserve_record_by_customer(self, customer):

        response = self.table.scan(
            TableName="resv"
        )
        items = response['Items']
        return items

        # todo return reservation items


    def get_reserve_record_by_barbershop(self, barbershop):

        response = self.table.query(
            KeyConditionExpression=Key('barbershop').eq(barbershop),
            ScanIndexForward=False
        )
        items = response['Items']
        return items


<<<<<<< HEAD
class TrainTable:
    table = dynamodb.Table('train')

    def put_train_list(self, review_table_list, customer_list, barber_list):
        put1 = {
            'trainid': "1",
            'list': review_table_list
        }
        self.table.put_item(
            Item=put1
        )
        put2 = {
            'trainid': "2",
            'list': customer_list
        }
        self.table.put_item(
            Item=put2
        )
        put3 = {
            'trainid': "3",
            'list': barber_list
        }
        self.table.put_item(
            Item=put3
        )

    def get_train_list(self,train_list_id):
        response = self.table.scan(
            TableName="train",
            FilterExpression = Attr('trainid').eq(train_list_id)
        )
        items = response['Items']
        return items
=======
>>>>>>> 01f38530c12c5754b3f57f53caf32039ca612e32
