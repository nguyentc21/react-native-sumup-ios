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
        if (!result) {
          throw new Error('ERROR or SDK has been set up before!');
        }
        SumUpModule.apiKey = key;
        return result;
      }
      return false;
    } catch (error) {
      throw new Error(`[RN-sumup-ios]: Setup API key Failed: ${error}`);
    }
  }

  static async testSDKIntegration() {
    return NativeModules.SumUpNTC.testSDKIntegration();
  }

  static getKey() {
    return SumUpModule.apiKey;
  }

  static async checkLogin() {
    return NativeModules.SumUpNTC.checkLogin();
  }

  static async loginWithViewController() {
    return NativeModules.SumUpNTC.presentLoginFromViewController();
  }

  static async logout() {
    return NativeModules.SumUpNTC.logout();
  }

  static async prepareForCheckout() {
    return NativeModules.SumUpNTC.preparePaymentCheckout();
  }

  static async checkout(
    title,
    totalAmount,
    currencyCode = CURRENCY_CODES.USD,

    tipAmount = 0,
    foreignTransactionID = '',
    skipScreenOptions = false
  ) {
    const request = {
      title,
      totalAmount: totalAmount.toString(),
      currencyCode,
      tipAmount: tipAmount ? tipAmount.toString() : undefined,
      foreignTransactionID,
      skipScreenOptions: skipScreenOptions.toString(),
    };
    try {
      const isLogin = await SumUpModule.checkLogin();
      if (!isLogin) {
        throw new Error('Required login.');
      }
      const result = await NativeModules.SumUpNTC.paymentCheckout(request);
      const _result = processResult(result);
      return _result;
    } catch (error) {
      throw new Error(`[RN-sumup-ios]: Error while authenticating: ${error}`);
    }
  }
}

export default SumUpModule;
