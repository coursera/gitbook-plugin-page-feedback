# gitbook-plugin-page-feedback
Plugin for gitbook to add feedback buttons to each page and to track their results in a google spreadsheet and optionally get a real time stream of results in a slack channel.

![Screenshot](page-feedback-screenshot.png)

## Configuration
Set your Slack channel and incoming webhook url.
Set your google scripts web deploy endpoint

```json
"page-feedback": {
    "slack-channel": "feedback",
    "slack-webhook": "https://hooks.slack.com/services/xyz/abc/123"
    "google-scripts-web-deploy-endpoint": "https://hooks.slack.com/services/xyz/abc/123"
}
```
