import Foundation
import SumUpSDK

@objc(SumUpNTC)
class SumUpNTC: NSObject {

  func generateJSONResponse(params: [String: Any]) -> String {
    if let jsonData = try? JSONSerialization.data(withJSONObject: params, options: []) {
      if let jsonString = String(data: jsonData, encoding: .utf8) {
        return jsonString
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  func getCurrency(currency: String?) -> String {
    let currencyCode: String
    if let currencyValue = currency {
      currencyCode = currencyValue
    } else {
      // print("Warning no currencyValue")
      currencyCode = ""
    }
    switch currencyCode {
    case "AUD": return "AUD"
    case "BGN": return "BGN"
    case "BRL": return "BRL"
    case "CHF": return "CHF"
    case "CZK": return "CZK"
    case "DKK": return "DKK"
    case "EUR": return "EUR"
    case "GBP": return "GBP"
    case "NOK": return "NOK"
    case "PLN": return "PLN"
    case "SEK": return "SEK"
    case "USD": return "USD"
    default:
      guard let merchantCurrencyCode = SumUpSDK.currentMerchant?.currencyCode else {
        return ""
      }
      return merchantCurrencyCode
    }
  }

  func getRootViewController() -> UIViewController? {
    return (UIApplication.shared.connectedScenes.first as? UIWindowScene)?
      .windows.first(where: { $0.isKeyWindow })?.rootViewController
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc func setupAPIKey(
    _ apiKey: String,
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      let setAPIKey = SumUpSDK.setup(withAPIKey: apiKey)
      if setAPIKey {
        resolve(true)
      } else {
        reject(false)
      }
    }
  }

  @objc func testSDKIntegration(
    _ resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let rs = SumUpSDK.testIntegration()
    if rs {
      resolve(true)
    } else {
      reject(false)
    }
  }

  @objc func presentLoginFromViewController(
    _ resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard
        let rootView = getRootViewController()
      else {
        let newError = NSError(
          domain: "", code: 200,
          userInfo: [NSLocalizedDescriptionKey: "Don't found RootViewController"])
        return reject("ERROR_LOGIN", "[SumUpNTC] Don't found RootViewController", newError)
      }
      SumUpSDK.presentLogin(from: rootView, animated: true) { (success: Bool, error: Error?) in
        guard error == nil else {
          let newError = NSError(
            domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: String(describing: error)])
          return reject("ERROR_LOGIN", "[SumUpNTC] " + String(describing: error), newError)
        }
        if success {
          resolve(true)
        } else {
          let error = NSError(
            domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: String(describing: error)])
          reject("ERROR_LOGIN", "[SumUpNTC] " + String(describing: error), error)
        }
      }
    }
  }

  @objc func logout(
    _ resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    SumUpSDK.logout { (success: Bool, error: Error?) in
      if success {
        resolve(true)
      } else {
        let newError = NSError(
          domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: String(describing: error)])
        reject("ERROR_LOGOUT", "[SumUpNTC] " + String(describing: error), newError)
      }
    }
  }

  // @objc func loginToSumUpWithToken(
  //   _ token: String, resolve: @escaping RCTPromiseResolveBlock,
  //   reject: @escaping RCTPromiseRejectBlock
  // ) {
  //   let checkIsLoggedIn = SumUpSDK.isLoggedIn
  //   if checkIsLoggedIn {
  //     resolve(false)
  //   } else {
  //     SumUpSDK.login(withToken: token) { (success: Bool, error: Error?) in
  //       if success {
  //         resolve(true)
  //       } else {
  //         let newError = NSError(
  //           domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: String(describing: error)])
  //         reject("ERROR_LOGIN_TOKEN", String(describing: error), newError)
  //       }
  //     }
  //   }
  // }

  @objc func checkLogin(
    _ resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let checkIsLoggedIn = SumUpSDK.isLoggedIn
    if checkIsLoggedIn {
      resolve(true)
    } else {
      resolve(false)
    }
  }

  @objc func preparePaymentCheckout(
    _ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock
  ) {
    let checkIsLoggedIn = SumUpSDK.isLoggedIn
    if checkIsLoggedIn {
      SumUpSDK.prepareForCheckout()
      resolve(true)
    } else {
      resolve(false)
    }
  }

  @objc func paymentCheckout(
    _ request: [String: String], resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {

    guard let title = request["title"], !title.isEmpty else {
      let error = NSError(
        domain: "", code: 400, userInfo: [NSLocalizedDescriptionKey: "Missing or empty 'title'"])
      reject("ERROR_CHECKOUT", "[SumUpNTC] Missing or empty 'title'", error)
      return
    }
    guard let totalAmount = request["totalAmount"], !totalAmount.isEmpty else {
      let error = NSError(
        domain: "", code: 400,
        userInfo: [NSLocalizedDescriptionKey: "Missing or empty 'totalAmount'"])
      reject("ERROR_CHECKOUT", "[SumUpNTC] Missing or empty 'totalAmount'", error)
      return
    }
    let total = NSDecimalNumber(string: totalAmount)
    let checkoutCurrency = self.getCurrency(currency: request["currencyCode"])

    let foreignTransactionID = request["foreignTransactionID"] ?? ""
    let tip = NSDecimalNumber(string: request["tipAmount"] ?? "0")
    let skip = request["skipScreenOptions"]

    let checkOutRequest = CheckoutRequest(
      total: total, title: title, currencyCode: checkoutCurrency,
      paymentOptions: [.cardReader, .mobilePayment])
    if skip == "true" {
      checkOutRequest.skipScreenOptions = .success
    }
    if !foreignTransactionID.isEmpty {
      checkOutRequest.foreignTransactionID = foreignTransactionID
    }
    if tip != 0 {
      checkOutRequest.tipAmount = tip
    }
    DispatchQueue.main.async {
      guard
        let rootView = getRootViewController()
      else {
        let newError = NSError(
          domain: "", code: 200,
          userInfo: [NSLocalizedDescriptionKey: "Don't found RootViewController"])
        return reject("ERROR_CHECKOUT", "[SumUpNTC] Don't found RootViewController", newError)
      }
      SumUpSDK.checkout(with: checkOutRequest, from: rootView) {
        (result: CheckoutResult?, error: Error?) in
        if let safeError = error as NSError? {
          // print("Error by PaymentCheckout: \(safeError)")
          var errorMessage = "[SumUpNTC] checkout error: \(safeError)"
          if (safeError.domain == SumUpSDKErrorDomain)
            && (safeError.code == SumUpSDKError.accountNotLoggedIn.rawValue)
          {
            errorMessage = "[SumUpNTC] checkout error - not logged in: \(safeError)"
          }
          let rejectError = NSError(domain: "", code: 200, userInfo: nil)
          reject("E_COUNT", errorMessage, rejectError)
          return
        }

        guard let safeResult = result else {
          let safeError = NSError(domain: "", code: 200, userInfo: nil)
          reject("E_COUNT", "[SumUpNTC] no error and no result should not happen: ", safeError)
          // print("no error and no result should not happen")
          return
        }
        // print("transactionCode==\(String(describing: safeResult.transactionCode))")

        var resultObject = [String: Any]()
        if safeResult.success {
          // print("success")
          resultObject["success"] = true
          resultObject["transactionCode"] = safeResult.transactionCode
          if let info = safeResult.additionalInfo,
            let foreignTransId = info["foreign_transaction_id"] as? String,
            let amount = info["amount"] as? NSDecimalNumber
          {
            resultObject["foreignTransactionID"] = foreignTransId
            resultObject["amount"] = amount
          }
          resolve(self.generateJSONResponse(params: resultObject))
        } else {
          let error = NSError(
            domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: "Error by PaymentCheckout"]
          )
          reject("ERROR_CHECKOUT", "[SumUpNTC] Transaction aborted", error)
        }
      }
    }
  }
}
