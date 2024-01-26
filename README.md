# MeetOptics Lens Backend

This project provides a serverless backend solution for the MeetOptics Lens application. It leverages AWS services such as Lambda, API Gateway, and DynamoDB. The infrastructure is defined and deployed using AWS Cloud Development Kit (CDK) with TypeScript. The backend handles CRUD operations for lens configurations.

## Features

- **Serverless Architecture**: Utilizes AWS Lambda for business logic.
- **RESTful API**: Exposes a REST API using AWS API Gateway.
- **Data Persistence**: Stores and retrieves lens configurations from AWS DynamoDB.
- **Infrastructure as Code**: AWS infrastructure defined and provisioned using AWS CDK in TypeScript.

## Prerequisites

- AWS Account
- AWS CLI configured with appropriate access rights
- Node.js (v14.x or later)
- AWS CDK Toolkit

## Setup and Deployment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/meetoptics-lens-backend.git
   cd meetoptics-lens-backend
   ```

2. **Install Dependencies**

    ```bash
    npm install
    Bootstrap AWS CDK
    ```

If this is the first time using AWS CDK in your AWS account, bootstrap AWS CDK:

    ```bash
    cdk bootstrap
    ```

3. **Deploy the Stack**
Deploy the CDK stack to your AWS account:

    ```bash
    cdk deploy
    ```

This command will output the API endpoint URL upon successful deployment.

## API Reference
The API endpoints include:

- GET /lenses: Fetch all lens configurations.
- POST /lenses: Create a new lens configuration.
- PUT /lenses: Update an existing lens configuration.
- DELETE /lenses/{id}: Delete a lens configuration by ID.

## Local Development
### For local development and testing:

Run Local DynamoDB (Optional)

If you need to work with DynamoDB locally, you can use AWS DynamoDB Local.

### Environment Variables

Set up your environment variables in a .env file or within your IDE.

### Run Locally

Use tools like AWS SAM or serverless framework for local testing of Lambda functions.

## Testing
The project uses Jest for testing. Run the tests using:

    ```bash
    npm test
    ```
