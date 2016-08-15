import { SNS } from 'aws-sdk';

exports.handler = (event, context) => {
    const sns = new SNS();
    const params = {
        Message: 'Hello world (claudia)',
        TopicArn: 'arn:aws:sns:us-east-1:572190396208:facebook-posts'
    };
    sns.publish(params, (err, data) => {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        console.log(data);           // successful response
        context.succeed('hello world');
    });
};
