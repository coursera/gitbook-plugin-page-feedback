# gitbook-plugin-page-feedback
Plugin for gitbook to add feedback buttons to each page and to track their results in a google spreadsheet and optionally get a real time stream of results in a slack channel.

below is a screenshot of what it looks like:

![Screenshot](page-feedback-screenshot.png)

## Create a Slack webhook

https://api.slack.com/incoming-webhooks

## Create a Google Script Web App Endpoint

copy contents of file `google-script/Code.js` to a [google script and deploy as a web app](https://developers.google.com/apps-script/guides/web)

## Install and Configure

Add this plugin to your book.json to the `plugins` section

```json
  "plugins": ["page-feedback"]
```

then configure the `pluginConfigs` section

```json
"pluginConfigs": {
  "page-feedback": {
    "slack-channel": "feedback",
    "slack-webhook": "https://hooks.slack.com/services/xyz/abc/123",
    "google-scripts-web-deploy-endpoint": "https://script.google.com/xyz/abc/123"
  }
}
```

then run `gitbook install` and `gitbook serve` and all of your pages should have a feedback section at the bottom
