import { useState } from 'react'
import './App.css'

enum PaymentMode {
  Transfer = 0,
  Card = 1,
  Crypto = 2
}

function App() {
  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true);
    if(!amount || isNaN(amount)) {
      setInvalidAmount(true);
      setPaymentConfirm(false);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setPaymentConfirm(true);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <h1>Lyzi payment</h1>
      <div className="card">
        <p>
          <span>Amount: </span>
          <input type="number" onInput={(e) => {
            setInvalidAmount(false);
            setAmount(parseFloat((e.target as HTMLInputElement).value));
          }}></input>€
          {invalidAmount ? <div className="invalid">Invalid amount</div> : <div></div>}
        </p>
      </div>
      <div>
        <h3>Payment options :</h3>
        <div>
          <button onClick={() => setPaymentMode(PaymentMode.Transfer)}>Transfer</button>
          <button onClick={() => setPaymentMode(PaymentMode.Card)}>Card</button>
          <button onClick={() => setPaymentMode(PaymentMode.Crypto)}>Crypto</button>
        </div>
        {paymentMode === PaymentMode.Transfer ? <div>
          <h4>Transfer</h4>
          <div>Send {amount}€ to FR76 1000 1000 1000 1000</div>
        </div> : <div></div>}
        {paymentMode === PaymentMode.Card ? <div>
          <h4>Card</h4>
          <p>Amount : {amount}€</p>
          <label>Card number </label>
          <input type="text"></input>
        </div> : <div></div>}
        {paymentMode === PaymentMode.Crypto ? <div>
          <h4>Crypto</h4>
          <p>Amount : {amount}€</p>
          <div>Send to wallet 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71</div>
        </div> : <div></div>}

        <button onClick={onConfirm}>Confirm</button>
        {isLoading ? <div>Loading...</div> : <div></div>}
        {paymentConfirm ? <div className="valid">Confirm received</div> : <div></div>}
      </div>
    </>
  )
}

export default App
