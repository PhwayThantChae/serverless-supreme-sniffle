"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationKeepingService = void 0;
const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const eventsources = require("@aws-cdk/aws-lambda-event-sources");
class QuotationKeepingService extends core.Construct {
    constructor(scope, id, queue, table) {
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
exports.QuotationKeepingService = QuotationKeepingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGF0aW9uLWtlZXBpbmctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1b3RhdGlvbi1rZWVwaW5nLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXNDO0FBR3RDLDhDQUE4QztBQUM5QyxrRUFBa0U7QUFFbEUsTUFBYSx1QkFBd0IsU0FBUSxJQUFJLENBQUMsU0FBUztJQUN6RCxZQUFZLEtBQXFCLEVBQUUsRUFBVSxFQUFFLEtBQWdCLEVBQUUsS0FBcUI7UUFDcEYsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQiw0REFBNEQ7UUFDNUQsTUFBTSw4QkFBOEIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdDQUFnQyxFQUFFO1lBQ2pHLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUM7WUFDL0QsdUJBQXVCO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDTixJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO2FBQ3ZDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUNsRCw0QkFBNEIsRUFBRSxLQUFLLENBQUMsUUFBUTthQUM3QztTQUNGLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTNELEtBQUssQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUF2QkQsMERBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIHNxcyBmcm9tICdAYXdzLWNkay9hd3Mtc3FzJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBldmVudHNvdXJjZXMgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzJztcblxuZXhwb3J0IGNsYXNzIFF1b3RhdGlvbktlZXBpbmdTZXJ2aWNlIGV4dGVuZHMgY29yZS5Db25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY29yZS5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHF1ZXVlOiBzcXMuUXVldWUsIHRhYmxlOiBkeW5hbW9kYi5UYWJsZSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBDcmVhdGUgbGFtYmRhIGZ1bmN0aW9uIGZvciBxdW90YXRpb25fa2VlcF9zZXJ2aWNlIGhhbmRsZXJcbiAgICBjb25zdCBxdW90YXRpb25LZWVwaW5nU2VydmljZUhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdRdW90YXRpb25LZWVwaW5nU2VydmljZUhhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEvcXVvdGF0aW9uX2tlZXBpbmdfc2VydmljZScpLFxuICAgICAgLy8gQWRkIFNRUyBFdmVudCBTb3VyY2VcbiAgICAgIGV2ZW50czogW1xuICAgICAgICBuZXcgZXZlbnRzb3VyY2VzLlNxc0V2ZW50U291cmNlKHF1ZXVlKVxuICAgICAgXSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFFVT1RBVElPTl9LRUVQX1NFUlZJQ0VfVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lLFxuICAgICAgICBRVU9UQVRJT05fS0VFUF9TRVJWSUNFX1FVRVVFOiBxdWV1ZS5xdWV1ZVVybFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcXVldWUuZ3JhbnRDb25zdW1lTWVzc2FnZXMocXVvdGF0aW9uS2VlcGluZ1NlcnZpY2VIYW5kbGVyKTtcblxuICAgIHRhYmxlLmdyYW50V3JpdGVEYXRhKHF1b3RhdGlvbktlZXBpbmdTZXJ2aWNlSGFuZGxlcik7XG4gIH1cbn0iXX0=