export enum PaymentMode {
    Transfer = 0,
    Card = 1,
    Crypto = 2
  }
  
export function paymentNameByMode(mode: PaymentMode) {
    switch(mode) {
      case PaymentMode.Transfer:
        return "Transfer";
      case PaymentMode.Card:
        return "Card";
      case PaymentMode.Crypto:
        return "Crypto";
    }
}
  