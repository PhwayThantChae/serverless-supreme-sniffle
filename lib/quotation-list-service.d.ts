import * as core from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
export declare class QuotationListService extends core.Construct {
    constructor(scope: core.Construct, id: string, table: dynamodb.Table);
}
