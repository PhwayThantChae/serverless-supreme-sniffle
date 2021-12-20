const AWS = require('aws-sdk')

const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event, context, callback) => {
  return await getUploadURL(event, context, callback)
}

const getUploadURL = async function(event, context, callabck) {

  const CONTENT_TYPE_SUFFIX_MAPPINGS = {
    'image/jpeg': 'jpg',
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'image/jpg': 'jpg'
  };

  const attachmentId =  context.awsRequestId;
  var body = JSON.parse(event.body);
  const key = `${attachmentId}.${CONTENT_TYPE_SUFFIX_MAPPINGS[body.content_type]}`;

  let attachmentMetaData = {
    content_type: body.content_type,
    quotation_id: body.quotation_id,
    attachment_name: key,
    attachment_id: attachmentId
  };

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: body.content_type,
    Metadata: attachmentMetaData
  }

  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  console.log(uploadURL, "UPLOAD URL");

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uploadURL: uploadURL,
      attachment_id: attachmentId, 
      quotation_id: body.quotation_id
    })
 };
}

