"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationService = void 0;
const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigateway");
class QuotationService extends core.Construct {
    constructor(scope, id, queue) {
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
        operations.addMethod('POST'); // GET /items
        // Allow operation service lambda function to invoke queue
        queue.grantSendMessages(QuotationServiceHandler);
    }
}
exports.QuotationService = QuotationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGF0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdW90YXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFFdEMsOENBQThDO0FBRTlDLHNEQUFzRDtBQUd0RCxNQUFhLGdCQUFpQixTQUFRLElBQUksQ0FBQyxTQUFTO0lBQ2xELFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsS0FBZ0I7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixpQkFBaUI7UUFDakIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUVoQyx5REFBeUQ7UUFDekQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ25GLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDO1lBQ3ZELE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFO2dCQUNYLFNBQVMsRUFBRSxRQUFRO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsMkVBQTJFO1FBQzNFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUNwRixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsYUFBYTtRQUU1QywwREFBMEQ7UUFDMUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBNUJELDRDQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBzcXMgZnJvbSAnQGF3cy1jZGsvYXdzLXNxcyc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcbmltcG9ydCAqIGFzIGFwaUdhdGV3YXkgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcblxuZXhwb3J0IGNsYXNzIFF1b3RhdGlvblNlcnZpY2UgZXh0ZW5kcyBjb3JlLkNvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjb3JlLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcXVldWU6IHNxcy5RdWV1ZSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBRdWV1ZSByZWZyZW5jZVxuICAgIGNvbnN0IHF1ZXVlVXJsID0gcXVldWUucXVldWVVcmw7XG5cbiAgICAvLyBDcmVhdGUgYSBsYW1iZGEgZnVuY3Rpb24gZm9yIG9wZXJhdGlvbiBzZXJ2aWNlIGhhbmRsZXJcbiAgICBjb25zdCBRdW90YXRpb25TZXJ2aWNlSGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ1F1b3RhdGlvblNlcnZpY2VIYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYS9xdW90YXRpb25fc2VydmljZScpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBRVUVVRV9VUkw6IHF1ZXVlVXJsXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgQVBJIGZvciBvcGVyYXRpb24gc2VydmljZSBsYW1iZGEgZnVuY3Rpb24gUXVvdGF0aW9uU2VydmljZUhhbmRsZXJcbiAgICBjb25zdCBRdW90YXRpb25TZXJ2aWNlQXBpID0gbmV3IGFwaUdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLCAnUXVvdGF0aW9uU2VydmljZUFwaScsIHtcbiAgICAgIGhhbmRsZXI6IFF1b3RhdGlvblNlcnZpY2VIYW5kbGVyLFxuICAgICAgcHJveHk6IGZhbHNlXG4gICAgfSk7XG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IFF1b3RhdGlvblNlcnZpY2VBcGkucm9vdC5hZGRSZXNvdXJjZSgncXVvdGF0aW9ucycpO1xuICAgIG9wZXJhdGlvbnMuYWRkTWV0aG9kKCdQT1NUJyk7ICAvLyBHRVQgL2l0ZW1zXG5cbiAgICAvLyBBbGxvdyBvcGVyYXRpb24gc2VydmljZSBsYW1iZGEgZnVuY3Rpb24gdG8gaW52b2tlIHF1ZXVlXG4gICAgcXVldWUuZ3JhbnRTZW5kTWVzc2FnZXMoUXVvdGF0aW9uU2VydmljZUhhbmRsZXIpO1xuICB9XG59Il19