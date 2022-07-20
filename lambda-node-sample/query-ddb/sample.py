
#　参照元のPython実装
import boto3
import json
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("GameDatas")
def op_query(transaction):
    key = 'application'
    sortkey = 'table'
    queryData = table.query(
        KeyConditionExpression = Key(key).eq(transaction[key]) & Key(sortkey).begins_with(transaction[sortkey]) 
    )
    return queryData

def lambda_handler(event, context): #//Lambdaから最初に呼びされるハンドラ関数
    op = event['Operation']
    try:
        if op == 'QUERY':
            transaction = event['Keys']
            return op_query(transaction)
        elif op == 'HELLO':
            return 'HELLO'
    except Exception as e:
        print("Error Exception.")
        print(e)