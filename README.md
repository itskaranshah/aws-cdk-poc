# Welcome to your CDK project!
# CDK TS API Doc - https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html
You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an S3, SQS queue that is subscribed to an SNS topic.
The `cdk.json` file tells the CDK Toolkit how to execute your app.

TS CDK examples: https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript
Pyhton CDK examples: https://github.com/aws-samples/aws-cdk-examples/tree/master/python

## Install SDK
* `npm install -g aws-cdk`   install node cdk package for TS
* `pip install aws-cdk`   install node cdk package for TS
 ## One time
 * `cdk init --language typescript` (npm run watch)
 * `cdk init app --language python`
    source .venv/bin/activate
    python -m pip install -r requirements.txt
 * `cdk bootstrap`   create CDKToolket aws bucket (one time)
## Include package from the construct example
* `import * as s3 from '@aws-cdk/aws-s3'`
* `from aws_cdk import aws_s3 as s3`
## Useful commands
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
