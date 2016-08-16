import { SNS, config as awsConfig } from 'aws-sdk';
import { apiEndpoint as xhubEndpoint } from 'calamarble-xhub';

const snsPublishPromise = (sns, topic, msg) => new Promise((resolve, reject) => {
    const params = {
        TopicArn: topic,
        Message: msg
    };
    sns.publish(params, (err, data) => {
        if (err) {
            console.error('Error', err, err.stack);
            reject(err);
        }
        resolve(data);
    });
});

const xhubCallBack = config => async (req, res) => {
    if (config.awsConfig) { awsConfig.update(config.awsConfig); }
    const sns = new SNS();
    console.log('[xhub-sns] req.body:', JSON.stringify(req.body));
    const publishResponse = await snsPublishPromise(
        sns, config.topicArn, JSON.stringify(req.body)
    );
    console.log('[xhub-sns] publishResponse:', publishResponse);
    const result = { success: true };
    return res ? res.send(result) : result;
};

const apiEndpoint = userConfig => {
    const next = xhubCallBack(userConfig);
    return xhubEndpoint({
        ...userConfig,
        next
    });
};

export {
    apiEndpoint,
    xhubCallBack,
    snsPublishPromise
};
