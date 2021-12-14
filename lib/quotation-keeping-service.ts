import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as eventsources from '@aws-cdk/aws-lambda-event-sources';

export class QuotationKeepingService extends core.Construct {
  constructor(scope: core.Construct, id: string, queue: sqs.Queue, table: dynamodb.Table) {
    super(scope, id);

    // Create lambda function for quotation_keep_service handler
    const quotationKeepingServiceHandler = new lambda.Function(this, 'QuotationKeepingServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('lambda/quotation_keeping_service'),
      // Add SQS Event Source
      events: [
        new eventsources.SqsEventSource(queue)
      ],
      environment: {
        QUOTATION_KEEP_SERVICE_TABLE_NAME: table.tableName,
        QUOTATION_KEEP_SERVICE_QUEUE: queue.queueUrl
      }
    });

    queue.grantConsumeMessages(quotationKeepingServiceHandler);

    table.grantWriteData(quotationKeepingServiceHandler);
  }
}