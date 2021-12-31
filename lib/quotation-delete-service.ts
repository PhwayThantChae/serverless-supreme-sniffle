import * as core from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class QuotationDeleteService extends core.Construct {
  constructor(scope: core.Construct, id: string, table: dynamodb.Table) {
    super(scope, id);

    // Create lambda function for quotation_keep_service handler
    const quotationDeleteServiceHandler = new lambda.Function(this, 'QuotationDeleteServiceHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('lambda/quotation_delete_service'),
      environment: {
        QUOTATION_SERVICE_TABLE_NAME: table.tableName
      }
    });

    table.grantWriteData(quotationDeleteServiceHandler);

    const QuotationDeleteServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationDeleteServiceApi', {
      handler: quotationDeleteServiceHandler,
      proxy: false
    });
    const operations = QuotationDeleteServiceApi.root.addResource('quotations');
    const deleteOperation = operations.addResource('{id}'); // DELETE /quotations/:id

    deleteOperation.addMethod('DELETE');  
  }
}