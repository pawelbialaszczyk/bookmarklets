module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' || browser.name === 'canary') {
      // https://peter.sh/experiments/chromium-command-line-switches/
      launchOptions.args.push('--mute-audio');
    }

    return launchOptions;
  })
}
