import { useState } from 'react'
import './App.css'
import { PaymentMode, paymentNameByMode } from './utils/paymentMode';

function AmountForm({invalidAmount, onInput}: {invalidAmount: boolean, onInput: (amount: number) => void}) {
  return <div className="payment-form">
  <p>
    <span>Amount: </span>
    <input type="number" onInput={(e) => {
      const amount = parseFloat((e.target as HTMLInputElement).value);
      onInput(amount);
    }}></input>€
    {invalidAmount ? <div className="invalid">Invalid amount</div> : <div></div>}
  </p>
</div>
}

function OptionsForm({amount, paymentMode, onChangeMode}: {amount: number, paymentMode: PaymentMode, onChangeMode: (mode: PaymentMode) => void}) {
  return <div>
  <h3>Options :</h3>
  <div>
    <button onClick={() => onChangeMode(PaymentMode.Transfer)}>Transfer</button>
    <button onClick={() => onChangeMode(PaymentMode.Card)}>Card</button>
    <button onClick={() => onChangeMode(PaymentMode.Crypto)}>Crypto</button>
  </div>
  {paymentMode === PaymentMode.Transfer ? <div>
    <h4>Transfer</h4>
    <div>Send {amount}€ to FR76 1000 1000 1000 1000</div>
  </div> : <></>}
  {paymentMode === PaymentMode.Card ? <div>
    <h4>Card</h4>
    <p>Amount : {amount}€</p>
  </div> : <></>}
  {paymentMode === PaymentMode.Crypto ? <div>
    <h4>Crypto</h4>
    <p>Amount : {amount}€</p>
    <div>Send to wallet 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71</div>
  </div> : <></>}
</div>
}


function App() {
  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(PaymentMode.Transfer);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [finalPaymentMode, setFinalPaymentMode] = useState(PaymentMode.Transfer);

  const onInputAmount = (amount: number) => {
    if(!amount || isNaN(amount)) {
      setInvalidAmount(true);
      return;
    }
    setAmount(amount);
  }

  const onChangeMode = (mode: PaymentMode) => {
    setPaymentConfirm(false);
    setPaymentMode(mode);
  }

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
      <AmountForm invalidAmount={invalidAmount} onInput={(amount: number) => {
        setInvalidAmount(false);
        setAmount(amount);
        onInputAmount(amount);
      }} />
      <OptionsForm amount={amount} paymentMode={paymentMode} onChangeMode={(mode: PaymentMode) => {
        onChangeMode(mode);
      }} />
      <div>
        <button onClick={() => onConfirm(amount, paymentMode)}>Confirm payment</button>
        {isLoading ? <div>Loading...</div> : <div></div>}
        {paymentConfirm ? <div className="valid">Confirm received : {finalAmount}€ by {paymentNameByMode(finalPaymentMode)}</div> : <div></div>}
      </div>
    </>
  )
}

export default App
