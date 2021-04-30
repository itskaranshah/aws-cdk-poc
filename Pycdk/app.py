#!/usr/bin/env python3

from aws_cdk import core

from pycdk.pycdk_stack import PycdkStack


app = core.App()
PycdkStack(app, "pycdk", env={'region': 'us-east-1'})

app.synth()
