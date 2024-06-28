'use strict';

const path = require('path');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-power-calendar-luxon'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        resolve: {
          alias: {
            luxon: path.resolve(__dirname, 'node_modules/luxon/build/node/luxon.js'),
          },
        },
      },
    },
  });
};
