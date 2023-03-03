# react-native-sumup-ios

Support SumUp on iOS

## Installation

```sh
npm install react-native-sumup-ios
```
or
```sh
yarn add react-native-sumup-ios
```

### iOS
```sh
cd ios && pod install
```
### Android
in progress...

## Usage

```js
import SumUpModule from 'react-native-sumup-ios';
```

// ...

Set up Affiliate Key
```js
await SumUpModule.init(affiliateKey);
```

```js
const isSDKIntegrated = await SumUpModule.testSDKIntegration();
```

Check login
```js
const isLogin = await SumUpModule.checkLogin();
```

Prepare for checkout; wake up device, connection
```js
const isLogin = await SumUpModule.prepareForCheckout();
```

Login with View Controller
```js
await SumUpModule.loginWithViewController();
```

Login with access token
```js
await SumUpModule.loginWithToken(accessToken);
```

```js
await SumUpModule.checkout(checkoutRequest);
```

See https://github.com/sumup/sumup-ios-sdk to get more information about SumUpSDK.

