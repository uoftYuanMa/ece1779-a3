import boto3

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


class ReviewTable:
    def __init__(self):
        pass


class ResvTable:
    table = dynamodb.Table('Resv')

    def get_latest_barbershop(self, name):
        """
        get latest visited(reserved) barbershop
        :param name: user name
        :return: barbershop item
        """
        pass

