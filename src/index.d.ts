export type CurrencyCodeType = 'BGN' | 'BRL' | 'CHF' | 'CLP' | 'CZK' | 'DKK' | 'EUR' | 'GBP' | 'HUF' | 'NOK' | 'PLN' | 'RON' | 'SEK' | 'USD'

interface SumUpResult {
  success: boolean;
}
export interface CheckoutResult extends SumUpResult {
  transactionCode: string;
  foreignTransactionID?: string;
  amount?: number;
}
declare class SumUpSDK {
  private static _apiKey;
  static async init(key: string): Promise<boolean>;
  static async testSDKIntegration(): Promise<boolean>;
  static getKey(): string;
  static async checkLogin(): Promise<boolean>;
  static async loginWithViewController(): Promise<boolean>;
  static async loginWithToken(token: string): Promise<boolean>;
  static async logout(): Promise<boolean>;
  static async prepareForCheckout(): Promise<boolean>;
  static async checkout(
    title: string,
    totalAmount: number,
    currencyCode?: CurrencyCodeType = 'USD',
    tipAmount?: number,
    foreignTransactionId?: string,
    skipScreenOptions?: boolean,
    token?: string,
  ): Promise<CheckoutResult>;
}
export default SumUpSDK;
