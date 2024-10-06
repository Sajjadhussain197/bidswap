import Jazzcash from 'jazzcash-checkout';

// Initialize JazzCash with your credentials
Jazzcash.credentials({
  config: {
    merchantId: 'YOUR_MERCHANT_ID', // Replace with your Merchant ID
    password: 'YOUR_PASSWORD', // Replace with your Password
    hashKey: 'YOUR_HASH_KEY', // Replace with your Hash Key
  },
  environment: 'sandbox', // Use 'live' for production
});

const JC = {
  wallet: async (data, callback) => {
    try {
      Jazzcash.setData(data);
      const res = await Jazzcash.createRequest('WALLET');
      const parsedRes = JSON.parse(res);
      console.log(parsedRes);
      callback(parsedRes);
    } catch (error) {
      console.error('Error in wallet request:', error);
    }
  },
  pay: async (data, callback) => {
    try {
      Jazzcash.setData(data);
      const res = await Jazzcash.createRequest('PAY');
      console.log(res);
      callback(res);
    } catch (error) {
      console.error('Error in pay request:', error);
    }
  },
  refund: async (data, callback) => {
    try {
      Jazzcash.setData(data);
      const res = await Jazzcash.createRequest('REFUND');
      const parsedRes = JSON.parse(res);
      console.log(parsedRes);
      callback(parsedRes);
    } catch (error) {
      console.error('Error in refund request:', error);
    }
  },
  inquiry: async (data, callback) => {
    try {
      Jazzcash.setData(data);
      const res = await Jazzcash.createRequest('INQUIRY');
      const parsedRes = JSON.parse(res);
      console.log(parsedRes);
      callback(parsedRes);
    } catch (error) {
      console.error('Error in inquiry request:', error);
    }
  },
};

// Export the JC object for use in your Next.js project
export default JC;
