from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_s3 as s3,
    aws_sns_subscriptions as subs,
    core
)


class PycdkStack(core.Stack):

    def __init__(self, scope: core.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        queue = sqs.Queue(
            self, "PycdkQueue",
            visibility_timeout=core.Duration.seconds(300),
        )

        topic = sns.Topic(
            self, "PycdkTopic"
        )

        mybucket = s3.Bucket(self, 'cdkbucket', enforce_ssl=True, versioned=True,
                        encryption=s3.BucketEncryption.S3_MANAGED,
                        block_public_access=s3.BlockPublicAccess.BLOCK_ALL)
    

        topic.add_subscription(subs.SqsSubscription(queue))
