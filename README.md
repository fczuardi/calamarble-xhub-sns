# calamarble-xhub-sns
## Auto-publish to an Amazon SNS topic after a X-Hub-Signature check

Checks the signature of a http request and if valid post the body of the request
to a configurable existing AWS SNS topic.

## Usage

### With express.js

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import { apiEndpoint } from 'calamarble-xhub-sns';

const expressConfig = {
    port: 8088,
    postPath: '/mywebhook',
    messages: {
        serverRunning: port => `Server running on port ${port}`
    }
};
const xHubSnsConfig = {
    algo: 'sha1',
    secret: 'MY_APP_SECRET',
    topicArn: 'arn:aws:sns:us-east-1:XXXXX:yyyyy',
    awsConfig: {
        region: 'us-east-1'
    }
    messages: {
        wrongSignature: 'Content signature don\'t match'
    }
};
const app = express();
const postEndPoint = apiEndpoint(xHubConfig);
app.use(bodyParser.raw({ type: 'application/json' }));
app.post(expressConfig.postPath, postEndPoint);
app.listen(expressConfig.port, () => console.log(`Server running on port ${expressConfig.port}`));

```

### With claudia-api-builder

```javascript
import ApiBuilder from 'claudia-api-builder';
import { apiEndpoint as webhookPost} from 'calamarble-xhub-sns';

const api = new ApiBuilder();
const xHubConfig = {
    algo: 'sha1',
    secret: 'MY_APP_SECRET',
    topicArn: 'arn:aws:sns:us-east-1:XXXXX:yyyyy',
    messages: {
        wrongSignature: 'Content signature don\'t match'
    }
}

api.post('/fbwebhook', webhookPost(xHubConfig));

export { api as default };
```

Remember to copy the file ```policies/sns-publish.json``` and include it in your
claudia create ```--policies``` command line argument when creating your lambdas.
