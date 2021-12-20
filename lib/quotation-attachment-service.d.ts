import * as core from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
export declare class QuotationAttachmentService extends core.Construct {
    constructor(scope: core.Construct, id: string, s3: s3.Bucket);
}
