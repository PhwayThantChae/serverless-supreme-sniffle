import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
export declare class QuotationKeepingService extends core.Construct {
    constructor(scope: core.Construct, id: string, queue: sqs.Queue, table: dynamodb.Table);
}
