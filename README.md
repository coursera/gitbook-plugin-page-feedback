# gitbook-plugin-page-feedback
Plugin for gitbook to add feedback to all your pages. Feedback clicks get routed to Slack.

[![npm version](https://badge.fury.io/js/gitbook-plugin-page-feedback.svg)](https://badge.fury.io/js/gitbook-plugin-page-feedback)

![Screenshot](page-feedback-screenshot.png)

## Configuration
Set your Slack channel and incoming webhook url.

```json
"page-feedback": {
    "slack-channel": "feedback",
    "slack-webhook": "https://hooks.slack.com/services/xyz/abc/123"
}
```
