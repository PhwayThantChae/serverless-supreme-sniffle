import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
// import * as cognito from '@aws-cdk/aws-cognito';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
// import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class QuotationAttachmentService extends core.Construct {
  constructor(scope: core.Construct, id: string, s3: s3.Bucket) {
    super(scope, id);


    // Create a lambda function for operation service handler
    const QuotationAttachmentServiceHandler = new lambda.Function(this, 'QuotationAttachmentServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/quotation_attachment_service'),
      handler: 'get_signed_url.handler',
      environment: {
        S3_BUCKET: s3.bucketName
      }
    });

    // Create API for operation service lambda function QuotationAttachmentServiceHandler
    const QuotationAttachmentServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationAttachmentServiceApi', {
      handler: QuotationAttachmentServiceHandler,
      proxy: false
    });
    const operations = QuotationAttachmentServiceApi.root.addResource('get_attachment_signed_url');
    operations.addMethod('POST');  // GET /items

    s3.grantPut(QuotationAttachmentServiceHandler);


    // const lambdaFunction = new lambda.Function(this, 'Function', {
    //   code: lambda.Code.fromAsset('src'),
    //   handler: 'index.handler',
    //   functionName: 'BucketPutHandler',
    //   runtime: lambda.Runtime.NODEJS_12_X,
    // });

    // const s3PutEventSource = new lambdaEventSources.S3EventSource(bucket, {
    //   events: [
    //     s3.EventType.OBJECT_CREATED_PUT
    //   ]
    // });

    // lambdaFunction.addEventSource(s3PutEventSource);

  }
}


{
  "uploadURL": "https://apistack-quotationattachments5a7d8268-er1ay7bmmg51.s3.ap-southeast-1.amazonaws.com/b19b962c-38a5-46d6-8b25-f32f389d729c.png?AWSAccessKeyId=ASIAS3JL7NKMZ5UV4FX3&Content-Type=image%2Fpng&Expires=1639528614&Signature=U6EGFQoJ6jzEAy0eTOV5PHNtYDI%3D&x-amz-meta-attachment_id=b19b962c-38a5-46d6-8b25-f32f389d729c.png&x-amz-meta-content_type=image%2Fpng&x-amz-meta-quotation_id=674a371d-71b7-5f5a-add2-6d2e74f5d891&x-amz-security-token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgOkX%2BCEDOrz5sb8YSXdUGS7UHptpuJSNX8vlTkBDE5S8CIQDYRMMefeC%2By%2F0ePwqsXw5mvwKJdirrRwm4bz9j5Df8MyrEAghqEAAaDDE5NjA1MDExOTMyMSIMp2ELIpuke4vngC3DKqECWdC%2FE69n5uaBkXv5qAG3Azl3JGuk3qUnV3OygSAis%2B%2Bu2vx7THy3Dcm1066YqcWG131lZmLNahOST%2FzA2jdKrTkJInKYEqv4Xj7TPCYdlRe7WyUqyY%2BoMr82eVe%2FFmD5HNyGHajcvdHUUkBHpX52nO9Wm9rurpWjWhrAZc3x7PRW2XTBUvmTcA4%2BPwkLbHqL3u8m0DejAg7kF%2BvE6nY%2BAuB%2Bf2Wmlm0glfOjupGXexHuJRgkQFLdYW21U%2B89UafSu5nR6IzQJu46TWNl3tf1HGJrCaaxwbQo9Ym4C0HAGAs6Sk%2FDEBpf94HsU%2F9pcufH%2BRLzAlo7xwRExOtiR6D0AOZxBixwjMPMNK4osyXHIK9PRnaZT%2Btu01hnNydCxD3PLzD67uSNBjqaAcsNbNME2kYlGQpi9cGDZGmSfj%2FQor3XrteMH24u%2F5qZvUR6Z3FhqLp4hQ8FtWowOYCWBnB8ytIdkKkEjx3OoL63p9bJAMTuRWpbIpvnlMU4Xo5iUVW%2FoyVZjQaktmJU3a0jaWR5%2FzTLL3c2Hlb2mGzk0ImpxlAj5E1Iy3Y61BM8PahmrKS6uDfWbmO%2B8wCdj8qQG9CCMBJZq9M%3D",
  "attachment_id": "b19b962c-38a5-46d6-8b25-f32f389d729c",
  "quotation_id": "674a371d-71b7-5f5a-add2-6d2e74f5d891"
}