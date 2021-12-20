// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// import { success, failure } from '../util/response';


exports.handler = function(event, context, callback) {

    // Create an SQS service object
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var dynamoDB = new AWS.DynamoDB({apiVersion: '2012-11-05'});    
    
    var tableName = process.env.QUOTATION_KEEP_SERVICE_TABLE_NAME;
    var queueURL = process.env.QUOTATION_KEEP_SERVICE_QUEUE;

    // const newUUID = context.awsRequestId();
    const newUUID = context.awsRequestId;

    console.log("The file name is:" + newUUID);

    console.log(event)
    console.log(event.Records)
    var body = JSON.parse(event.Records[0].body)
    console.log(body);

    if (body) {
        let newQuotation = {
            id: {S: newUUID},
            business_unit_id: {S: body.business_unit_id},
            external_id: {S: body.external_id},
            date_from: {S: body.date_from},
            date_to: {S: body.date_to},
            submit_before_date: {S: body.submit_before_date},
            to_emails: {SS: body.to_emails},
            cc_emails: {SS: body.cc_emails},
            comments: {S: body.comments},
            buyer_name: {S: body.buyer_name},
            vendor_id: {S: body.vendor_id}
        };


        var params = {
            TableName: tableName,
            Item: newQuotation
        };

        console.log(params, 'params');
    
        // Call DynamoDB to add the item to the table
        dynamoDB.putItem(params, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data);
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: event.Records[0].receiptHandle
            };
      
            sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                    console.log("Delete Error", err);
                } else {
                    console.log("Message Deleted", data);
                }
            });
            }
        });
    

    }


}


