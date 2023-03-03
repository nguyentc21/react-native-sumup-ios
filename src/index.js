import { NativeModules, Platform } from 'react-native';

export const CURRENCY_CODES = {
  BGN: 'BGN',
  BRL: 'BRL',
  CHF: 'CHF',
  CLP: 'CLP',
  CZK: 'CZK',
  DKK: 'DKK',
  EUR: 'EUR',
  GBP: 'GBP',
  HUF: 'HUF',
  NOK: 'NOK',
  PLN: 'PLN',
  RON: 'RON',
  SEK: 'SEK',
  USD: 'USD',
};

const processResult = (result) => {
  try {
    return typeof result === 'string' ? JSON.parse(result) : result;
  } catch (error) {
    return result;
  }
};

class SumUpModule {
  static apiKey = '';

  static async init(key) {
    try {
      if (!key) throw Error('Empty key!');
      if (Platform.OS === 'ios') {
        const result = await NativeModules.SumUpNTC.setupAPIKey(key);
        SumUpModule.apiKey = key;
        return result;
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  static testSDKIntegration() {
    return NativeModules.SumUpNTC.testSDKIntegration();
  }

  static getKey() {
    return SumUpModule.apiKey;
  }

  static checkLogin() {
    return NativeModules.SumUpNTC.checkLogin();
  }

  static loginWithViewController() {
    return NativeModules.SumUpNTC.presentLoginFromViewController();
  }

  static loginWithToken(token) {
    if (Platform.OS === 'ios') {
      return NativeModules.SumUpNTC.loginToSumUpWithToken(token);
    } else {
      return NativeModules.SumUpNTC.loginToSumUpWithToken(
        SumUpModule.apiKey,
        token,
      );
    }
  }

  static logout() {
    return NativeModules.SumUpNTC.logout();
  }

  static prepareForCheckout() {
    return NativeModules.SumUpNTC.preparePaymentCheckout();
  }

  static async checkout(
    title,
    totalAmount,
    currencyCode = CURRENCY_CODES.USD,
    tipAmount,
    foreignTransactionId = '',
    skipScreenOptions = false,
    token = undefined,
  ) {
    const request = {
      title,
      totalAmount: totalAmount.toString(),
      currencyCode,
      tipAmount: tipAmount ? tipAmount.toString() : undefined,
      foreignTransactionId,
      skipScreenOptions: skipScreenOptions.toString(),
    };
    try {
      const isLogin = await SumUpModule.checkLogin();
      if (!isLogin) {
        if (!token) throw new Error('Required login or token.');
        await SumUpModule.loginWithToken(token);
      }
      const result = await NativeModules.SumUpNTC.paymentCheckout(request);
      const _result = processResult(result);
      return _result;
    } catch (error) {
      throw new Error(`Error while authenticating: ${error}`);
    }
  }
}

export default SumUpModule;
