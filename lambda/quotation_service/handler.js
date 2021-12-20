var AWS = require('aws-sdk');



exports.handler = function(event, context, callback) {
    
    var body = JSON.parse(event.body)
    // Create an SQS service object
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});  

    var queueURL = process.env.QUEUE_URL;

    // Set the parameters
    const params = {
        MessageBody: JSON.stringify(body),
        QueueUrl: queueURL //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
    };

    sqs.sendMessage(params, function(err, data) {
        console.log(params);
        if (err) {
          console.log("Error", err);
          callback(err);
        } else {
          console.log("Success", data.MessageId);
          console.log(body)
          callback(null, {
              statusCode: 200, 
              body: JSON.stringify(body)
          })
        }
    });
}