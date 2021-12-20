// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// import { success, failure } from '../util/response';


exports.handler = async function(event, context, callback) {


    var dynamoDB = new AWS.DynamoDB({apiVersion: '2012-11-05'});    
    
    var tableName = process.env.QUOTATION_KEEP_SERVICE_TABLE_NAME

    // start with an empty list of tasks
    let result = [];
  
    let params = {
        TableName: tableName,
    }

    let dbResponse = await dynamoDB.scan(params).promise();
    console.log(dbResponse.Items, 'db response');

    if (dbResponse.Items) {
        result =  dbResponse.Items;
    }

    return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        // Body needs to be string so render the JSON to string
        body: JSON.stringify(result),
     };

}


