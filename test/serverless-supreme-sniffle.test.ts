import { Template, Match } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';
import * as Api from '../lib/api-stack';

test('SQS Queue Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new Api.ApiStack(app, 'MyTestStack');
});
