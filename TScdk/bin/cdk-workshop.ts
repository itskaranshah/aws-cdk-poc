#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';
const envUSAE1 = { account: '733985429906', region: 'us-east-1'}

const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkWorkshopStack', {env: envUSAE1});
//new CdkWorkshopStack(app, 'CdkWorkshopStack');
