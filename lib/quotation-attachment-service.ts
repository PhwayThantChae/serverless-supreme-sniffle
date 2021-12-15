import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
// import * as cognito from '@aws-cdk/aws-cognito';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
import { S3EventSource } from '@aws-cdk/aws-lambda-event-sources'
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class QuotationAttachmentService extends core.Construct {
  constructor(scope: core.Construct, id: string, s3_bucket: s3.Bucket, table: dynamodb.Table) {
    super(scope, id);


    // Create a lambda function for operation service handler
    const QuotationAttachmentServiceHandler = new lambda.Function(this, 'QuotationAttachmentServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/quotation_attachment_service'),
      handler: 'get_signed_url.handler',
      environment: {
        S3_BUCKET: s3_bucket.bucketName
      }
    });

    const QuotationAttachmentServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationAttachmentServiceApi', {
      handler: QuotationAttachmentServiceHandler,
      proxy: false
    });
    const operations = QuotationAttachmentServiceApi.root.addResource('get_attachment_signed_url');
    operations.addMethod('POST');

    s3_bucket.grantPut(QuotationAttachmentServiceHandler);

    // Lambda function to process uploaded photo via s3 create trigger
    const ProcessUploadedAttachmentServiceHandler = new lambda.Function(this, 'ProcessUploadedAttachmentServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/quotation_attachment_service'),
      handler: 'process_uploaded_attachment.handler',
      events: [
        new lambdaEventSources.S3EventSource(s3_bucket, {
          events: [ s3.EventType.OBJECT_CREATED ]
        })
      ],
      environment: {
        S3_BUCKET: s3_bucket.bucketName, 
        ATTACHMENT_TABLE: table.tableName
      }
    });
    
    s3_bucket.grantRead(ProcessUploadedAttachmentServiceHandler);
    table.grantWriteData(ProcessUploadedAttachmentServiceHandler);

  }
}