const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-11-05'});    

// Main Lambda entry point
exports.handler = async (event, context, callback) => {
  return await processUploadedAttachment(event, context, callback)
}

const processUploadedAttachment = async function(event, context, callabck) {

    const tableName = process.env.ATTACHMENT_TABLE;
    const s3Record = event.Records[0].s3;

    console.log(s3Record);

    // Fetch metadata from S3
    const s3Object = await s3.headObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise();
    if (!s3Object.Metadata) {
        const errorMessage = 'Cannot process photo as no metadata is set for it';
        throw new Error(errorMessage);
    }

    // S3 metadata fields are all lowercase, so need to map them out carefully
    const attachmentDetails = {
        quotation_id: s3Object.Metadata.quotation_id,
        id: s3Object.Metadata.attachment_id,
        contentType: s3Object.Metadata.content_type,
        // Map the S3 bucket key to a CloudFront URL to be stored in the DB
        url: `https://apistack-quotationattachments5a7d8268-er1ay7bmmg51.s3.ap-southeast-1.amazonaws.com/${s3Record.object.key}`,
    }
    console.log(attachmentDetails);

    let newAttachment = {
        id: {S: s3Object.Metadata.attachment_id},
        quotation_id: {S: s3Object.Metadata.quotation_id},
        content_type: {S: s3Object.Metadata.content_type},
        url: {S: `https://apistack-quotationattachments5a7d8268-er1ay7bmmg51.s3.ap-southeast-1.amazonaws.com/${s3Record.object.key}`}
    };


    var params = {
        TableName: tableName,
        Item: newAttachment
    };

    console.log(params, 'params');

    // Call DynamoDB to add the item to the table
    createdAttachment = await dynamoDB.putItem(params).promise();

    console.log(createdAttachment, 'CREATED ATTACHMENT');


}