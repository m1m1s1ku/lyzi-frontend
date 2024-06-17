import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);
  const [paymentConfirm, setPaymentConfirm] = useState(false);

  return (
    <>
      <h1>Lyzi payment</h1>
      <div className="card">
        <p>
          <span>Amount :</span>
          <input type="number" onInput={(e) => {
            setAmount(parseFloat((e.target as HTMLInputElement).value));
          }}></input>€
        </p>
      </div>
      <div>
        <h3>Payment options :</h3>
        <div>
          <button onClick={() => setPaymentMode(0)}>Transfer</button>
          <button onClick={() => setPaymentMode(1)}>Card</button>
          <button onClick={() => setPaymentMode(2)}>Crypto</button>
        </div>
        {paymentMode === 0 ? <div>
          <h4>Transfer</h4>
          <div>Send {amount}€ to FR76 1000 1000 1000 1000</div>
        </div> : <div></div>}
        {paymentMode === 1 ? <div>
          <h4>Card</h4>
          <p>Amount : {amount}€</p>
          <label>Card number </label>
          <input type="text"></input>
        </div> : <div></div>}
        {paymentMode === 2 ? <div>
          <h4>Crypto</h4>
          <p>Amount : {amount}€</p>
          <div>Send to wallet 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71</div>
          <button onClick={() => {
            setTimeout(() => {
              setPaymentConfirm(true);
            }, 1000);
          }}>Confirm</button>
          {paymentConfirm ? <div>Confirm received</div> : <div></div>}
        </div> : <div></div>}
      </div>
    </>
  )
}

export default App
