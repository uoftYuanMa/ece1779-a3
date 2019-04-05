import boto3
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
        response = self.table.get_item(
            Key={
                'name': barbershop
            }
        )
        review_list = None
        if 'Item' in response:
            review_list = response['Item']
        return review_list

    def put_review_by_barbershop(self, customer, barbershop, timestamp, text, rating):
        # todo  to confirm about timestamp????
        # reviewid = (str)((int)(time.time()))
        review = {
            'resvid': reviewid,
            'customer': customer,
            'barbershop': barbershop,
            'timestamp': timestamp,
            'text': text,
            'rating':rating
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
            'expected_time':expected_time,
            'price': price,
            'service_type':service_type
        }
        self.table.put_item(
            Item=new_record
        )

    def get_latest_barbershop(self, name):
        """
        get latest visited(reserved) barbershop
        :param name: user name
        :return: barbershop item
        """
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
        # todo return reservation items
        pass


    def get_reserve_record_by_barbershop(self, barbershop):
        # todo return barbershop
        pass
