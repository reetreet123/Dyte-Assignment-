# Dyte-Assignment
# Description
This project is a Log Ingestor and Query Interface designed to efficiently handle vast volumes of log data. The system provides routes & functions for ingesting logs and querying log data using full-text search or specific field filters. The log ingestor is built using Node.js, JavaScript, and Elastic Search database for log storage. Passport.js is used for user authentication and authorization.

# Getting Started
Log Ingestor and Query Interface

Overview This project is a Log Ingestor and Query Interface designed to efficiently handle vast volumes of log data. The system provides a simple interface for querying log data using full-text search or specific field filters. The log ingestor is built using Node.js, JavaScript, and Elastic Search database for log storage. Passport.js is used for user authentication and authorization.

# Getting Started

Clone the repository: git clone https://github.com/dyte-submissions/november-2023-hiring-reetreet123 cd repository-directory

Install dependencies: npm install

Configure Elastic Search: Ensure Elastic Search is installed and running. Update the Elastic Search connection details in the configuration file if needed. Elastic Search will by-default run on the port http://localhost:9200 If Elastic Search is running secure mode by-defualt, change the following parameters to false:

xpack.security.enabled xpack.security.enrollment.enabled

Run the application: node app.js The log ingestor will be running on http://localhost:3000.

# Log Ingestor/Indexing logs
The indexLogs function is responsible for indexing multiple logs into the specified Elasticsearch index. It uses the Elasticsearch bulk API for improved efficiency in handling log data arrays.

# Searching Logs
The searchLogs function performs a search query on the Elasticsearch index based on specified filters such as timestamp, level, message, etc. It constructs a query using the Elasticsearch Query DSL and returns the search results.

User Authentication and Authorization
The user can Register/Login himself.

The user can register himself by accessing this API.

URL:** POST http://localhost:3000/auth/register request payload: { "email": "rajeshwarisahu225@gmail.com", "username": "reet987", "password": "abcdefh" }

This will return an accessToken through which we can authorize a user.

response: { "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YTBmYTRjMTNmOTBkNTRmNDQxNmQxIn0sImlhdCI6MTcwMDQwMTUyNX0.zZmAWQGwKkc14EPSPXdUQAYZPeWzY3Ek8qmql4wrsoc" }

Basic authentication is implemented with a dummy user (username and password). You can use these credentials for authentication. We have used passportJs for authentication.

Example :

URL:** POST http://localhost:3000/auth/login request payload: { "username": "rohan987", "password": "abcdefgh" }

This will return an accessToken through which we can authorize a user.

{ "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YTBmYTRjMTNmOTBkNTRmNDQxNmQxIn0sImlhdCI6MTcwMDQwMTUyNX0.zZmAWQGwKkc14EPSPXdUQAYZPeWzY3Ek8qmql4wrsoc" }

Authorization is based on token authentication. Obtain a token after successful authentication to access protected endpoints.

Logs Routes
The logs routes define the API endpoints for indexing and searching logs. These routes are protected, requiring user authentication and admin privileges.

In all APIs, you have to pass the accessToken in the header of the request you got while logging in for authorization.

Ingest a New Log:

URL: POST http://localhost:3000/logs/index

Description: Add new Logs to the dataset.

Sample Request: POST http://localhost:3000/logs/index

Example :

Sample Input Body { "indexName": "sunday_logs", "logDataArray": [ { "timestamp": "2023-09-15T10:00:00Z", "level": "error", "message": "Failed to complete the function 2", "resourceId": "server-1235", "traceId": "abc-xyz-124", "spanId": "span-987", "commit": "5e5342a", "metadata": { "parentResourceId": "server-0987" } } ] }

Returned Object : { "errors": false, "took": 70, "items": [ { "index": { "_index": "sunday_logs", "_id": "GHHe54sBocmRxC7w9foB", "_version": 1, "result": "created", "_shards": { "total": 2, "successful": 1, "failed": 0 }, "_seq_no": 6, "_primary_term": 2, "status": 201 } } ] }

Search a Record:

URL: GET http://localhost:3000/logs/search

Description: Search a/multiple record from the dataset.

Sample Request:

GET http://localhost:3000/logs/search

Sample Input Body if we only want to search with a field { "indexName": "sunday_logs", "fieldsToSearch": [ { "fieldName": "level", "fieldValue": "error" } ] }

Sample Input Body if we only want to search with the combination of fields and Timestamp { "indexName": "sunday_logs", "fieldsToSearch": [ { "fieldName": "level", "fieldValue": "error" } ] "timestampFilter": { "startTime": "2023-09-15T09:00:00Z", "endTime": "2023-09-15T10:00:00Z" } }

Returned Object : [ { "_index": "sunday_logs", "_id": "L-9P5osB6qYzKbs9Byk-", "_score": 1.2076393, "_source": { "timestamp": "2023-09-15T10:00:00Z", "level": "error", "message": "Failed to complete the function 2", "resourceId": "server-1235", "traceId": "abc-xyz-124", "spanId": "span-987", "commit": "5e5342a", "metadata": { "parentResourceId": "server-0987" } } }, { "_index": "sunday_logs", "_id": "MO9_5osB6qYzKbs9TCmP", "_score": 1.2076393, "_source": { "timestamp": "2023-09-15T10:00:00Z", "level": "error", "message": "Failed to complete the function 2", "resourceId": "server-1235", "traceId": "abc-xyz-124", "spanId": "span-987", "commit": "5e5342a", "metadata": { "parentResourceId": "server-0987" } } }, { "_index": "sunday_logs", "_id": "F3HX54sBocmRxC7wJfor", "_score": 1.2076393, "_source": { "timestamp": "2023-09-15T10:00:00Z", "level": "error", "message": "Failed to complete the function 2", "resourceId": "server-1235", "traceId": "abc-xyz-124", "spanId": "span-987", "commit": "5e5342a", "metadata": { "parentResourceId": "server-0987" } } }, { "_index": "sunday_logs", "_id": "GHHe54sBocmRxC7w9foB", "_score": 1.2076393, "_source": { "timestamp": "2023-09-15T10:00:00Z", "level": "error", "message": "Failed to complete the function 2", "resourceId": "server-1235", "traceId": "abc-xyz-124", "spanId": "span-987", "commit": "5e5342a", "metadata": { "parentResourceId": "server-0987" } } } ]
