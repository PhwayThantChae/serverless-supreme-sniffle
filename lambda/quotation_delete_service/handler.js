// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// import { success, failure } from '../util/response';
const dynamoDB =  new AWS.DynamoDB.DocumentClient();

exports.handler = async function(event, context, callback) {

    var tableName = process.env.QUOTATION_SERVICE_TABLE_NAME;

    console.log(event);

    let body;
    let statusCode = 200;

    let quotationId = event.pathParameters.id;

    try{
        let params = {
            TableName: tableName,
            Key: {
              id: quotationId
            },
          }
        console.log(params);
    
        await dynamoDB.delete(params).promise();
        body = `Deleted item ${quotationId}`;
    }catch(err){
        console.log(err, "ERR");
        statusCode = 400;
        body = err.message;
    }finally{
        body = body;
    }

    let responseBody = {
        statusCode: statusCode,
        message: body
    }

    return {
        statusCode: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseBody)
    };
}


