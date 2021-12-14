import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as eventsources from '@aws-cdk/aws-lambda-event-sources';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class QuotationListService extends core.Construct {
  constructor(scope: core.Construct, id: string, table: dynamodb.Table) {
    super(scope, id);

    // Create lambda function for quotation_keep_service handler
    const quotationListServiceHandler = new lambda.Function(this, 'QuotationListServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('lambda/quotation_list_service'),
      environment: {
        QUOTATION_KEEP_SERVICE_TABLE_NAME: table.tableName
      }
    });

    table.grantReadData(quotationListServiceHandler);

    // Create API for operation service lambda function QuotationServiceHandler
    const QuotationListServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationServiceApi', {
      handler: quotationListServiceHandler,
      proxy: false
    });
    const operations = QuotationListServiceApi.root.addResource('quotations');
    operations.addMethod('GET');  // GET /items
  }
}