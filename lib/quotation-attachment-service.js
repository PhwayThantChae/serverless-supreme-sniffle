"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationAttachmentService = void 0;
const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
// import * as cognito from '@aws-cdk/aws-cognito';
const apiGateway = require("@aws-cdk/aws-apigateway");
// import * as dynamodb from '@aws-cdk/aws-dynamodb';
class QuotationAttachmentService extends core.Construct {
    constructor(scope, id, s3) {
        super(scope, id);
        // Create a lambda function for operation service handler
        const QuotationAttachmentServiceHandler = new lambda.Function(this, 'QuotationAttachmentServiceHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda/quotation_attachment_service'),
            handler: 'get_signed_url.handler',
            environment: {
                S3_BUCKET: s3.bucketName
            }
        });
        // Create API for operation service lambda function QuotationAttachmentServiceHandler
        const QuotationAttachmentServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationAttachmentServiceApi', {
            handler: QuotationAttachmentServiceHandler,
            proxy: false
        });
        const operations = QuotationAttachmentServiceApi.root.addResource('get_attachment_signed_url');
        operations.addMethod('GET'); // GET /items
        // const lambdaFunction = new lambda.Function(this, 'Function', {
        //   code: lambda.Code.fromAsset('src'),
        //   handler: 'index.handler',
        //   functionName: 'BucketPutHandler',
        //   runtime: lambda.Runtime.NODEJS_12_X,
        // });
        // const s3PutEventSource = new lambdaEventSources.S3EventSource(bucket, {
        //   events: [
        //     s3.EventType.OBJECT_CREATED_PUT
        //   ]
        // });
        // lambdaFunction.addEventSource(s3PutEventSource);
    }
}
exports.QuotationAttachmentService = QuotationAttachmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGF0aW9uLWF0dGFjaG1lbnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1b3RhdGlvbi1hdHRhY2htZW50LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXNDO0FBRXRDLDhDQUE4QztBQUU5QyxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBRXRELHFEQUFxRDtBQUVyRCxNQUFhLDBCQUEyQixTQUFRLElBQUksQ0FBQyxTQUFTO0lBQzVELFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsRUFBYTtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR2pCLHlEQUF5RDtRQUN6RCxNQUFNLGlDQUFpQyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUNBQW1DLEVBQUU7WUFDdkcsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUNBQXFDLENBQUM7WUFDbEUsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgscUZBQXFGO1FBQ3JGLE1BQU0sNkJBQTZCLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRTtZQUN4RyxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQy9GLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxhQUFhO1FBRzNDLGlFQUFpRTtRQUNqRSx3Q0FBd0M7UUFDeEMsOEJBQThCO1FBQzlCLHNDQUFzQztRQUN0Qyx5Q0FBeUM7UUFDekMsTUFBTTtRQUVOLDBFQUEwRTtRQUMxRSxjQUFjO1FBQ2Qsc0NBQXNDO1FBQ3RDLE1BQU07UUFDTixNQUFNO1FBRU4sbURBQW1EO0lBRXJELENBQUM7Q0FDRjtBQXhDRCxnRUF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zcXMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbi8vIGltcG9ydCAqIGFzIGNvZ25pdG8gZnJvbSAnQGF3cy1jZGsvYXdzLWNvZ25pdG8nO1xuaW1wb3J0ICogYXMgYXBpR2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBsYW1iZGFFdmVudFNvdXJjZXMgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzJztcbi8vIGltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5cbmV4cG9ydCBjbGFzcyBRdW90YXRpb25BdHRhY2htZW50U2VydmljZSBleHRlbmRzIGNvcmUuQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNvcmUuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBzMzogczMuQnVja2V0KSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuXG4gICAgLy8gQ3JlYXRlIGEgbGFtYmRhIGZ1bmN0aW9uIGZvciBvcGVyYXRpb24gc2VydmljZSBoYW5kbGVyXG4gICAgY29uc3QgUXVvdGF0aW9uQXR0YWNobWVudFNlcnZpY2VIYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnUXVvdGF0aW9uQXR0YWNobWVudFNlcnZpY2VIYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYS9xdW90YXRpb25fYXR0YWNobWVudF9zZXJ2aWNlJyksXG4gICAgICBoYW5kbGVyOiAnZ2V0X3NpZ25lZF91cmwuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBTM19CVUNLRVQ6IHMzLmJ1Y2tldE5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBBUEkgZm9yIG9wZXJhdGlvbiBzZXJ2aWNlIGxhbWJkYSBmdW5jdGlvbiBRdW90YXRpb25BdHRhY2htZW50U2VydmljZUhhbmRsZXJcbiAgICBjb25zdCBRdW90YXRpb25BdHRhY2htZW50U2VydmljZUFwaSA9IG5ldyBhcGlHYXRld2F5LkxhbWJkYVJlc3RBcGkodGhpcywgJ1F1b3RhdGlvbkF0dGFjaG1lbnRTZXJ2aWNlQXBpJywge1xuICAgICAgaGFuZGxlcjogUXVvdGF0aW9uQXR0YWNobWVudFNlcnZpY2VIYW5kbGVyLFxuICAgICAgcHJveHk6IGZhbHNlXG4gICAgfSk7XG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IFF1b3RhdGlvbkF0dGFjaG1lbnRTZXJ2aWNlQXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2dldF9hdHRhY2htZW50X3NpZ25lZF91cmwnKTtcbiAgICBvcGVyYXRpb25zLmFkZE1ldGhvZCgnR0VUJyk7ICAvLyBHRVQgL2l0ZW1zXG5cblxuICAgIC8vIGNvbnN0IGxhbWJkYUZ1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRnVuY3Rpb24nLCB7XG4gICAgLy8gICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ3NyYycpLFxuICAgIC8vICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgIC8vICAgZnVuY3Rpb25OYW1lOiAnQnVja2V0UHV0SGFuZGxlcicsXG4gICAgLy8gICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IHMzUHV0RXZlbnRTb3VyY2UgPSBuZXcgbGFtYmRhRXZlbnRTb3VyY2VzLlMzRXZlbnRTb3VyY2UoYnVja2V0LCB7XG4gICAgLy8gICBldmVudHM6IFtcbiAgICAvLyAgICAgczMuRXZlbnRUeXBlLk9CSkVDVF9DUkVBVEVEX1BVVFxuICAgIC8vICAgXVxuICAgIC8vIH0pO1xuXG4gICAgLy8gbGFtYmRhRnVuY3Rpb24uYWRkRXZlbnRTb3VyY2UoczNQdXRFdmVudFNvdXJjZSk7XG5cbiAgfVxufSJdfQ==