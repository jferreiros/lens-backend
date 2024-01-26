import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class LensBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lensTable = new dynamodb.Table(this, "LensTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lensLambda = new lambda.Function(this, "LensHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "lensHandler.handler",
      environment: {
        LENS_TABLE_NAME: lensTable.tableName,
      },
    });

    lensLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["dynamodb:*"],
        resources: [lensTable.tableArn],
      })
    );

    const api = new apigateway.RestApi(this, "LensApi", {
      restApiName: "Lens Service",
      description: "This service serves lens configurations.",
    });

    const lensResource = api.root.addResource("lenses");
    lensResource.addMethod("GET", new apigateway.LambdaIntegration(lensLambda));
    lensResource.addMethod("POST", new apigateway.LambdaIntegration(lensLambda));
    lensResource.addMethod("PUT", new apigateway.LambdaIntegration(lensLambda));

    const lensWithIdResource = lensResource.addResource("{id}");
    lensWithIdResource.addMethod("DELETE", new apigateway.LambdaIntegration(lensLambda));
  }
}
