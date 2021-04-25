import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { BlockPublicAccess, BucketEncryption } from '@aws-cdk/aws-s3';
import * as ec2 from "@aws-cdk/aws-ec2";

require('dotenv').config()

const config = {
  env: {
    account: process.env.AWS_ACCOUNT_NUMBER,
    region: process.env.AWS_REGION
  }
}

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, env: config.env });

    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkWorkshopTopic');
    topic.addSubscription(new subs.SqsSubscription(queue));

    const bucket = new s3.Bucket(this, 'cdkbucket', {
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    //EC2 instance launch
    const awsVpc = ec2.Vpc.fromLookup(this, 'VPC', { vpcId:'vpc-8e851bf7' });

    const awsAMI = ec2.MachineImage.lookup({
                name: 'ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*'
    });

    const awsSG = new ec2.SecurityGroup(this, 'SG', {
      vpc: awsVpc,
      securityGroupName: "my-test-sg",
      description: 'Allow ssh access to ec2 instances from anywhere',
      allowAllOutbound: true 
    });
    awsSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow public ssh access');

    const ec2instance = new ec2.Instance(this, 'cdk2instance', {
                        instanceName: 'cdk2instance', keyName: 'Play',
                        instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
                        machineImage: awsAMI, vpc: awsVpc, securityGroup: awsSG, vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
    });

    new cdk.CfnOutput(this, 'cdk2instance', {
      value: ec2instance.instancePublicIp
    })
  }
}