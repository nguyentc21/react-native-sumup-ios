# react-native-sumup-ios

Support SumUp on iOS
(Bridge to use the SumUp SDK)

- **Support SumUpSDK(iOS) 6.1.1**
- **Min iOS: 15.0**

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
npx pod-install
```

### Android

in progress...

## Usage

```ts
import RNSumupIos from 'react-native-sumup-ios';

const prepareForSumUpCheckout = async (sumUpAffiliateKey: string) => {
  try {
    const _key = RNSumupIos.getKey(); // Check - is already setup Affiliate Key.
    if (!_key) {
      // Set up Affiliate Key, only setup once per app lifecycle.
      const isInitSuccess = await RNSumupIos.init(sumUpAffiliateKey);
      if (!isInitSuccess) {
        throw Error('SumUp initialization failed!');
      }
    }
    // Check is already logged in, and if it is, warm up the connection to Sumup's device.
    const isLogin = await RNSumupIos.prepareForCheckout();
    if (!isLogin) {
      // Login by username and password
      await RNSumupIos.loginWithViewController();
    }
  } catch (error) {
    throw error;
  }
};

const sumupCheckOut = async (params: {
  sumUpAffiliateKey: string;
  title: string;
  totalAmount: number;
  tip?: number;
}) => {
  const { title, totalAmount, tip = 0 } = params;
  try {
    await prepareForSumUpCheckout(sumUpAffiliateKey);
    // Checkout
    await RNSumupIos.checkout(title, totalAmount, 'USD', tip);
  } catch (error) {
    throw error;
  }
};
```

See https://github.com/sumup/sumup-ios-sdk to get more information about SumUpSDK.
