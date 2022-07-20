const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient()

/**
 * API Gatewayを通してリクエストから受け取ったユーザーID、動画IDと一致するitemを取得して返却するLambda
 * 
 * @param {*} event APIGatwayからわたってくるパラメーターがこのevent引数を通して渡される
 * GETリクエストにおけるクエリはqueryStringParametersというプロパティに設定されている
 * @returns 
 */
exports.handler = async (event)=>{

    // GET https://<ドメイン>/movies?userId=user1&movieId=1
    // といった形のリクエストを想定している
    const userId = event.queryStringParameters.userId // 上記の場合この変数は'user1'
    const movieId = event.queryStringParameters.movieId // 上記の場合この変数は'1'

    /**
     * ハッシュキー:userId、ソートキー:movieIdというDynamoDBテーブルを想定している
     */
    const result = await client.query({
        TableName:'<任意のTable名>',
        KeyConditionExpression:'#userId = :userId AND #movieId = :movieId',
        ExpressionAttributeNames:{
            '#userId':'userId',
            '#movieId':'movieId'

        },
        ExpressionAttributeValues:{
            ':userId':userId,
            ':movieId':movieId,
        }
    }).promise()


    const items = result.Items

    return {
        statusCode:200,
        body:JSON.stringify(items)
    }
    
}