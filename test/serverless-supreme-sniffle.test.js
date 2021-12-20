"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const Api = require("../lib/api-stack");
test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Api.ApiStack(app, 'MyTestStack');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVybGVzcy1zdXByZW1lLXNuaWZmbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlcmxlc3Mtc3VwcmVtZS1zbmlmZmxlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxQ0FBcUM7QUFDckMsd0NBQXdDO0FBRXhDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEIsT0FBTztJQUNULE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZSwgTWF0Y2ggfSBmcm9tICdAYXdzLWNkay9hc3NlcnRpb25zJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIEFwaSBmcm9tICcuLi9saWIvYXBpLXN0YWNrJztcblxudGVzdCgnU1FTIFF1ZXVlIENyZWF0ZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICBjb25zdCBzdGFjayA9IG5ldyBBcGkuQXBpU3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbn0pO1xuIl19