# gitbook-plugin-page-feedback
Plugin for gitbook to add feedback buttons to each page and to track their results in a google spreadsheet and optionally get a real time stream of results in a slack channel.

below is a screenshot of what it looks like:

![Screenshot](page-feedback-screenshot.png)


## Configuration
Add this plugin to your book.json to the `plugins` section

```json
  "plugins": [
    {
      "name": "page-feedback",
      "version": "git+https://github.com/coursera/gitbook-plugin-page-feedback"
    }
  ]
```

then configure the `pluginConfigs` section

```json
"pluginConfigs": {
  "page-feedback": {
    "slack-channel": "feedback",
    "slack-webhook": "https://hooks.slack.com/services/xyz/abc/123",
    "google-scripts-web-deploy-endpoint": "https://hooks.slack.com/services/xyz/abc/123"
  }
}
```

then run `gitbook install` and `gitbook serve` and all of your pages should have a feedback section at the bottom
