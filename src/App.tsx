import { useState } from 'react'
import './App.css'

enum PaymentMode {
  Transfer = 0,
  Card = 1,
  Crypto = 2
}

function paymentNameByMode(mode: PaymentMode) {
  switch(mode) {
    case PaymentMode.Transfer:
      return "Transfer";
    case PaymentMode.Card:
      return "Card";
    case PaymentMode.Crypto:
      return "Crypto";
  }
}

function App() {
  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [finalPaymentMode, setFinalPaymentMode] = useState(0);

  const onConfirm = (amount: number, mode: PaymentMode) => {
    setPaymentConfirm(false);
    setIsLoading(true);
    if(!amount || isNaN(amount)) {
      setInvalidAmount(true);
      setPaymentConfirm(false);
      setIsLoading(false);
      return;
    }

    onConfirmReceived(amount, mode);
  }

  const onChangeMode = (mode: PaymentMode) => {
    setPaymentConfirm(false);
    setPaymentMode(mode);
  }

  const onConfirmReceived = (amount: number, mode: PaymentMode) => {
    setFinalPaymentMode(mode);
    setFinalAmount(amount);

    // Simulate an API Call
    setTimeout(() => {
      setIsLoading(false);
      setPaymentConfirm(true);
    }, 1000);
  }

  return (
    <>
      <h1>Lyzi payment</h1>
      <div className="payment-form">
        <p>
          <span>Amount: </span>
          <input type="number" onInput={(e) => {
            setInvalidAmount(false);
            const amount = parseFloat((e.target as HTMLInputElement).value);
            if(!amount || isNaN(amount)) {
              setInvalidAmount(true);
              return;
            }
            setAmount(amount);
          }}></input>€
          {invalidAmount ? <div className="invalid">Invalid amount</div> : <div></div>}
        </p>
      </div>
      <div>
        <h3>Payment options :</h3>
        <div>
          <button onClick={() => onChangeMode(PaymentMode.Transfer)}>Transfer</button>
          <button onClick={() => onChangeMode(PaymentMode.Card)}>Card</button>
          <button onClick={() => onChangeMode(PaymentMode.Crypto)}>Crypto</button>
        </div>
        {paymentMode === PaymentMode.Transfer ? <div>
          <h4>Transfer</h4>
          <div>Send {amount}€ to FR76 1000 1000 1000 1000</div>
        </div> : <div></div>}
        {paymentMode === PaymentMode.Card ? <div>
          <h4>Card</h4>
          <p>Amount : {amount}€</p>
        </div> : <div></div>}
        {paymentMode === PaymentMode.Crypto ? <div>
          <h4>Crypto</h4>
          <p>Amount : {amount}€</p>
          <div>Send to wallet 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71</div>
        </div> : <div></div>}

        <button onClick={() => onConfirm(amount, paymentMode)}>Confirm payment</button>
        {isLoading ? <div>Loading...</div> : <div></div>}
        {paymentConfirm ? <div className="valid">Confirm received : {finalAmount}€ by {paymentNameByMode(finalPaymentMode)}</div> : <div></div>}
      </div>
    </>
  )
}

export default App
