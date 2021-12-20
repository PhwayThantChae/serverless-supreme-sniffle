"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
};
exports.success = (body) => {
    return {
        statusCode: 200,
        headers: corsHeaders,
        body,
    };
};
exports.failure = (body, statusCode = 500) => {
    return {
        statusCode,
        headers: corsHeaders,
        body,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFdBQVcsR0FBRztJQUNoQixjQUFjLEVBQUUsa0JBQWtCO0lBQ2xDLDhCQUE4QixFQUFFLEdBQUc7SUFDbkMsNkJBQTZCLEVBQUUsR0FBRztDQUNuQyxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUN0QyxPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsV0FBVztRQUNwQixJQUFJO0tBQ0wsQ0FBQTtBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLFVBQVUsR0FBRyxHQUFHLEVBQUUsRUFBRTtJQUN4RCxPQUFPO1FBQ0wsVUFBVTtRQUNWLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLElBQUk7S0FDTCxDQUFBO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29yc0hlYWRlcnMgPSB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXG4gICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXG4gICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBzdWNjZXNzID0gKGJvZHk6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBoZWFkZXJzOiBjb3JzSGVhZGVycyxcbiAgICAgIGJvZHksXG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGZhaWx1cmUgPSAoYm9keTogc3RyaW5nLCBzdGF0dXNDb2RlID0gNTAwKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGUsXG4gICAgICBoZWFkZXJzOiBjb3JzSGVhZGVycyxcbiAgICAgIGJvZHksXG4gICAgfVxuICB9OyJdfQ==