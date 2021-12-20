import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
export declare class QuotationService extends core.Construct {
    constructor(scope: core.Construct, id: string, queue: sqs.Queue);
}
