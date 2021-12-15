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