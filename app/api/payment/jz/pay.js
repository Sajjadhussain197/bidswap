// Import the necessary modules
// import JC from '../../path-to/jazzcash'; // Adjust the path to where your Jazzcash module is located

import JC from "./jazzcash";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, token, email } = req.body;

    const paymentData = {
      // Populate with necessary payment data
      pp_Amount: amount,
      pp_Token: token,
      pp_Description: 'Payment description',
      pp_ReturnUrl: 'http://your-return-url.com', // Replace with your actual return URL
      pp_CustomerEmail: email,
      // Add other required parameters as per API documentation
    };

    try {
      // Call the Jazzcash pay method
      await JC.pay(paymentData, (response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      console.error('Payment error:', error);
      res.status(500).json({ error: 'Payment processing failed' });
    }
  } else {
    // Handle unsupported request methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
