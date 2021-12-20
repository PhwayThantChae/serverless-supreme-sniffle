"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const dynamodb = require("@aws-cdk/aws-dynamodb");
const sqs = require("@aws-cdk/aws-sqs");
const s3 = require("@aws-cdk/aws-s3");
const cdk = require("@aws-cdk/core");
const quotation_service = require("../lib/quotation-service");
const quotation_keeping_service = require("../lib/quotation-keeping-service");
const quotation_list_service = require("../lib/quotation-list-service");
const quotation_attachment_service = require("../lib/quotation-attachment-service");
// import { Duration } from '@aws-cdk/core';
class ApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create new SQS Queue
        const quotationQueue = new sqs.Queue(this, 'QuotationQueue', {
            // visibilityTimeout: cdk.Duration.seconds(300),
            // retentionPeriod: cdk.Duration.days(7),
            queueName: 'QuotationQueue'
        });
        // Creat a new dynamodb table called Quotation
        const quotationTable = new dynamodb.Table(this, 'Quotation', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'Quotation',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        // Create a new dynamodb table called Attachment
        const attachmentTable = new dynamodb.Table(this, 'Attachment', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'Attachment',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        // create bucket to store for attachments
        const s3Bucket = new s3.Bucket(this, 'quotation-attachments', {
            // bucketName: 'my-bucket',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            versioned: false,
            publicReadAccess: false,
            encryption: s3.BucketEncryption.S3_MANAGED,
            cors: [
                {
                    allowedMethods: [
                        s3.HttpMethods.GET,
                        s3.HttpMethods.POST,
                        s3.HttpMethods.PUT
                    ],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                },
            ]
        });
        const svcQuotationService = new quotation_service.QuotationService(this, 'QuotationService', quotationQueue);
        const svcQuotationKeepingService = new quotation_keeping_service.QuotationKeepingService(this, 'QuotationKeepingService', quotationQueue, quotationTable);
        const svcQuotationListService = new quotation_list_service.QuotationListService(this, 'QuotationListService', quotationTable);
        const svcQuotationAttachmentService = new quotation_attachment_service.QuotationAttachmentService(this, 'QuotationAttachmentService', s3Bucket);
    }
}
exports.ApiStack = ApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGtEQUFrRDtBQUNsRCx3Q0FBd0M7QUFDeEMsc0NBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQyw4REFBOEQ7QUFDOUQsOEVBQThFO0FBQzlFLHdFQUF3RTtBQUN4RSxvRkFBb0Y7QUFDcEYsNENBQTRDO0FBRTVDLE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3JDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix1QkFBdUI7UUFDdkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUMzRCxnREFBZ0Q7WUFDaEQseUNBQXlDO1lBQ3pDLFNBQVMsRUFBRSxnQkFBZ0I7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsOENBQThDO1FBQzlDLE1BQU0sY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQzNELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ2pFLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87U0FDekMsQ0FBQyxDQUFDO1FBRUgsZ0RBQWdEO1FBQ2hELE1BQU0sZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzdELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ2pFLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87U0FDekMsQ0FBQyxDQUFDO1FBRUgseUNBQXlDO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDNUQsMkJBQTJCO1lBQzNCLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDeEMsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixTQUFTLEVBQUUsS0FBSztZQUNoQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLFVBQVUsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtZQUMxQyxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRzt3QkFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJO3dCQUNuQixFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUc7cUJBQ25CO29CQUNELGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDckIsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUU3RyxNQUFNLDBCQUEwQixHQUFHLElBQUkseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFDLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUV4SixNQUFNLHVCQUF1QixHQUFHLElBQUksc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBRTVILE1BQU0sNkJBQTZCLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUMsNEJBQTRCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDaEosQ0FBQztDQUNGO0FBdERELDRCQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNucyBmcm9tICdAYXdzLWNkay9hd3Mtc25zJztcbmltcG9ydCAqIGFzIHN1YnMgZnJvbSAnQGF3cy1jZGsvYXdzLXNucy1zdWJzY3JpcHRpb25zJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBzcXMgZnJvbSAnQGF3cy1jZGsvYXdzLXNxcyc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgcXVvdGF0aW9uX3NlcnZpY2UgZnJvbSAnLi4vbGliL3F1b3RhdGlvbi1zZXJ2aWNlJztcbmltcG9ydCAqIGFzIHF1b3RhdGlvbl9rZWVwaW5nX3NlcnZpY2UgZnJvbSAnLi4vbGliL3F1b3RhdGlvbi1rZWVwaW5nLXNlcnZpY2UnO1xuaW1wb3J0ICogYXMgcXVvdGF0aW9uX2xpc3Rfc2VydmljZSBmcm9tICcuLi9saWIvcXVvdGF0aW9uLWxpc3Qtc2VydmljZSc7XG5pbXBvcnQgKiBhcyBxdW90YXRpb25fYXR0YWNobWVudF9zZXJ2aWNlIGZyb20gJy4uL2xpYi9xdW90YXRpb24tYXR0YWNobWVudC1zZXJ2aWNlJztcbi8vIGltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBBcGlTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBDcmVhdGUgbmV3IFNRUyBRdWV1ZVxuICAgIGNvbnN0IHF1b3RhdGlvblF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnUXVvdGF0aW9uUXVldWUnLCB7XG4gICAgICAvLyB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKSxcbiAgICAgIC8vIHJldGVudGlvblBlcmlvZDogY2RrLkR1cmF0aW9uLmRheXMoNyksXG4gICAgICBxdWV1ZU5hbWU6ICdRdW90YXRpb25RdWV1ZSdcbiAgICB9KTtcblxuICAgIC8vIENyZWF0IGEgbmV3IGR5bmFtb2RiIHRhYmxlIGNhbGxlZCBRdW90YXRpb25cbiAgICBjb25zdCBxdW90YXRpb25UYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnUXVvdGF0aW9uJywge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6ICdRdW90YXRpb24nLFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWVxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGR5bmFtb2RiIHRhYmxlIGNhbGxlZCBBdHRhY2htZW50XG4gICAgY29uc3QgYXR0YWNobWVudFRhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdBdHRhY2htZW50Jywge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6ICdBdHRhY2htZW50JyxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1lcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSBidWNrZXQgdG8gc3RvcmUgZm9yIGF0dGFjaG1lbnRzXG4gICAgY29uc3QgczNCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdxdW90YXRpb24tYXR0YWNobWVudHMnLCB7XG4gICAgICAvLyBidWNrZXROYW1lOiAnbXktYnVja2V0JyxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICAgIHZlcnNpb25lZDogZmFsc2UsXG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcbiAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcbiAgICAgIGNvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFsbG93ZWRNZXRob2RzOiBbXG4gICAgICAgICAgICBzMy5IdHRwTWV0aG9kcy5HRVQsXG4gICAgICAgICAgICBzMy5IdHRwTWV0aG9kcy5QT1NULFxuICAgICAgICAgICAgczMuSHR0cE1ldGhvZHMuUFVUXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhbGxvd2VkT3JpZ2luczogWycqJ10sXG4gICAgICAgICAgYWxsb3dlZEhlYWRlcnM6IFsnKiddLFxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3ZjUXVvdGF0aW9uU2VydmljZSA9IG5ldyBxdW90YXRpb25fc2VydmljZS5RdW90YXRpb25TZXJ2aWNlKHRoaXMsICdRdW90YXRpb25TZXJ2aWNlJywgcXVvdGF0aW9uUXVldWUpO1xuXG4gICAgY29uc3Qgc3ZjUXVvdGF0aW9uS2VlcGluZ1NlcnZpY2UgPSBuZXcgcXVvdGF0aW9uX2tlZXBpbmdfc2VydmljZS5RdW90YXRpb25LZWVwaW5nU2VydmljZSh0aGlzLCdRdW90YXRpb25LZWVwaW5nU2VydmljZScsIHF1b3RhdGlvblF1ZXVlLCBxdW90YXRpb25UYWJsZSlcblxuICAgIGNvbnN0IHN2Y1F1b3RhdGlvbkxpc3RTZXJ2aWNlID0gbmV3IHF1b3RhdGlvbl9saXN0X3NlcnZpY2UuUXVvdGF0aW9uTGlzdFNlcnZpY2UodGhpcywnUXVvdGF0aW9uTGlzdFNlcnZpY2UnLCBxdW90YXRpb25UYWJsZSlcblxuICAgIGNvbnN0IHN2Y1F1b3RhdGlvbkF0dGFjaG1lbnRTZXJ2aWNlID0gbmV3IHF1b3RhdGlvbl9hdHRhY2htZW50X3NlcnZpY2UuUXVvdGF0aW9uQXR0YWNobWVudFNlcnZpY2UodGhpcywnUXVvdGF0aW9uQXR0YWNobWVudFNlcnZpY2UnLCBzM0J1Y2tldClcbiAgfVxufVxuIl19