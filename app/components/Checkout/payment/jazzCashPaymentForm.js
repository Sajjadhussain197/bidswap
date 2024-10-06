import { useState } from 'react';

export default function JazzCashPaymentForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
    console.log("helo")
  const handlePayment = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/jazzcash/initiatePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, description }),
    });

    if (!res.ok) {
      console.error('Failed to initiate payment');
      return;
    }

    const paymentData = await res.json();
    const form = document.createElement('form');
    form.action = paymentData.endpoint;
    form.method = 'POST';

    for (const key in paymentData) {
      if (key !== 'endpoint') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <form onSubmit={handlePayment}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Pay with JazzCash</button>
    </form>
  );
}
