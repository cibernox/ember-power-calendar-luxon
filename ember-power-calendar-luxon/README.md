# ember-power-calendar-luxon

Date manipulation, formatting and parsing is too complex for ember-power-calendar to reinvent, so it
has to rely on other well tested libraries for that.

This is the addon that exposes the utils used internally by [ember-power-calendar](https://www.ember-power-calendar.com),
using [Luxon.js](https://moment.github.io/luxon/) underneath, a lighter (and arguably with a nicer API) alternative
to moment.js that leverages the browser's [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) for localization.

You will want to install this addon if you already use luxon in your application already, or if
luxon is your preferred date manipulation library.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above


## Installation

```
ember install ember-power-calendar-luxon
```

Add the following lines into you `app/app.js` to register this meta addon to `ember-power-calendar`
```
import { registerDateLibrary } from 'ember-power-calendar';
import DateUtils from 'ember-power-calendar-luxon';

registerDateLibrary(DateUtils);
```


## Setup for Embroider

The luxon package has conditional exports, which will not correctly handled in app.
Cause of this issue, there are two different instance of luxon inside the app. The app imports CommonJs package but embroider force the import of ESModule.
This means that luxon settings which you are setting inside your app are not synced with addon.

To fix this issue, you need to add this lines in embroider options. This force the import always to ESModule and so you have only one luxon instance inside your app.

```js
return require('@embroider/compat').compatBuild(app, Webpack, {
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
```

## Usage

**Don't use it.**

This library is meant to be used internally by `ember-power-calendar` only.

The API can change in breaking ways based on the needs of Ember Power Calendar.


## Contributing

### Installation

* `git clone <repository-url>`
* `cd ember-power-calendar-luxon`
* `pnpm install`

### Linting

* `pnpm lint`
* `pnpm lint:fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).


## License

This project is licensed under the [MIT License](LICENSE.md).
