import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cognito from '@aws-cdk/aws-cognito';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class QuotationService extends core.Construct {
  constructor(scope: core.Construct, id: string, queue: sqs.Queue) {
    super(scope, id);

    // Queue refrence
    const queueUrl = queue.queueUrl;

    // Create a lambda function for operation service handler
    const QuotationServiceHandler = new lambda.Function(this, 'QuotationServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/quotation_service'),
      handler: 'handler.handler',
      environment: {
        QUEUE_URL: queueUrl
      }
    });

    // Create API for operation service lambda function QuotationServiceHandler
    const QuotationServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationServiceApi', {
      handler: QuotationServiceHandler,
      proxy: false
    });
    const operations = QuotationServiceApi.root.addResource('quotations');
    operations.addMethod('POST');  // GET /items

    // Allow operation service lambda function to invoke queue
    queue.grantSendMessages(QuotationServiceHandler);
  }
}