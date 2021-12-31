import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import * as quotation_service from '../lib/quotation-service';
import * as quotation_keeping_service from '../lib/quotation-keeping-service';
import * as quotation_list_service from '../lib/quotation-list-service';
import * as quotation_attachment_service from '../lib/quotation-attachment-service';
import * as quotation_delete_service from '../lib/quotation-delete-service';
// import { Duration } from '@aws-cdk/core';

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create new SQS Queue
    const quotationQueue = new sqs.Queue(this, 'QuotationQueue', {
      // visibilityTimeout: cdk.Duration.seconds(300),
      // retentionPeriod: cdk.Duration.days(7),
      queueName: 'QuotationQueue'
    });

    // Creat a new dynamodb table called Quotation
    const quotationTable = new dynamodb.Table(this, 'Quotation', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'Quotation',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Create a new dynamodb table called Attachment
    const attachmentTable = new dynamodb.Table(this, 'Attachment', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'Quotation-Attachment',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // create bucket to store for attachments
    const s3Bucket = new s3.Bucket(this, 'quotation-attachments', {
      // bucketName: 'my-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      publicReadAccess: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT
          ],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ]
    });

    const svcQuotationService = new quotation_service.QuotationService(this, 'QuotationService', quotationQueue);

    const svcQuotationKeepingService = new quotation_keeping_service.QuotationKeepingService(this,'QuotationKeepingService', quotationQueue, quotationTable)

    const svcQuotationListService = new quotation_list_service.QuotationListService(this,'QuotationListService', quotationTable)

    const svcQuotationAttachmentService = new quotation_attachment_service.QuotationAttachmentService(this,'QuotationAttachmentService', s3Bucket, attachmentTable)

    const svcQuotationDeleteService = new quotation_delete_service.QuotationDeleteService(this,'QuotationDeleteService', quotationTable)
  }
}
