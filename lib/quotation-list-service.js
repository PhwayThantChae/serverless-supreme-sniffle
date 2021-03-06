"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationListService = void 0;
const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigateway");
class QuotationListService extends core.Construct {
    constructor(scope, id, table) {
        super(scope, id);
        // Create lambda function for quotation_keep_service handler
        const quotationListServiceHandler = new lambda.Function(this, 'QuotationListServiceHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'handler.handler',
            code: lambda.Code.fromAsset('lambda/quotation_list_service'),
            environment: {
                QUOTATION_KEEP_SERVICE_TABLE_NAME: table.tableName
            }
        });
        table.grantReadData(quotationListServiceHandler);
        // Create API for operation service lambda function QuotationServiceHandler
        const QuotationListServiceApi = new apiGateway.LambdaRestApi(this, 'QuotationServiceApi', {
            handler: quotationListServiceHandler,
            proxy: false
        });
        const operations = QuotationListServiceApi.root.addResource('quotations');
        operations.addMethod('GET'); // GET /items
    }
}
exports.QuotationListService = QuotationListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGF0aW9uLWxpc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1b3RhdGlvbi1saXN0LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXNDO0FBR3RDLDhDQUE4QztBQUU5QyxzREFBc0Q7QUFFdEQsTUFBYSxvQkFBcUIsU0FBUSxJQUFJLENBQUMsU0FBUztJQUN0RCxZQUFZLEtBQXFCLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsNERBQTREO1FBQzVELE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRTtZQUMzRixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLCtCQUErQixDQUFDO1lBQzVELFdBQVcsRUFBRTtnQkFDWCxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNuRDtTQUNGLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUVqRCwyRUFBMkU7UUFDM0UsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ3hGLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxhQUFhO0lBQzdDLENBQUM7Q0FDRjtBQXhCRCxvREF3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zcXMnO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGV2ZW50c291cmNlcyBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLWV2ZW50LXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgYXBpR2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5cbmV4cG9ydCBjbGFzcyBRdW90YXRpb25MaXN0U2VydmljZSBleHRlbmRzIGNvcmUuQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNvcmUuQ29uc3RydWN0LCBpZDogc3RyaW5nLCB0YWJsZTogZHluYW1vZGIuVGFibGUpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gQ3JlYXRlIGxhbWJkYSBmdW5jdGlvbiBmb3IgcXVvdGF0aW9uX2tlZXBfc2VydmljZSBoYW5kbGVyXG4gICAgY29uc3QgcXVvdGF0aW9uTGlzdFNlcnZpY2VIYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnUXVvdGF0aW9uTGlzdFNlcnZpY2VIYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhL3F1b3RhdGlvbl9saXN0X3NlcnZpY2UnKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFFVT1RBVElPTl9LRUVQX1NFUlZJQ0VfVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0YWJsZS5ncmFudFJlYWREYXRhKHF1b3RhdGlvbkxpc3RTZXJ2aWNlSGFuZGxlcik7XG5cbiAgICAvLyBDcmVhdGUgQVBJIGZvciBvcGVyYXRpb24gc2VydmljZSBsYW1iZGEgZnVuY3Rpb24gUXVvdGF0aW9uU2VydmljZUhhbmRsZXJcbiAgICBjb25zdCBRdW90YXRpb25MaXN0U2VydmljZUFwaSA9IG5ldyBhcGlHYXRld2F5LkxhbWJkYVJlc3RBcGkodGhpcywgJ1F1b3RhdGlvblNlcnZpY2VBcGknLCB7XG4gICAgICBoYW5kbGVyOiBxdW90YXRpb25MaXN0U2VydmljZUhhbmRsZXIsXG4gICAgICBwcm94eTogZmFsc2VcbiAgICB9KTtcbiAgICBjb25zdCBvcGVyYXRpb25zID0gUXVvdGF0aW9uTGlzdFNlcnZpY2VBcGkucm9vdC5hZGRSZXNvdXJjZSgncXVvdGF0aW9ucycpO1xuICAgIG9wZXJhdGlvbnMuYWRkTWV0aG9kKCdHRVQnKTsgIC8vIEdFVCAvaXRlbXNcbiAgfVxufSJdfQ==