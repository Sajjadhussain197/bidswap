import { NextResponse } from "next/server";
import crypto from 'crypto';
import axios from 'axios';

export async function POST(request) {
  const { amount, description } = await request.json();

  try {
    const dateTime = new Date().toISOString().replace(/-|:|\.\d+/g, '');
    const transactionRefNumber = `T${dateTime}${Math.floor(Math.random() * 1000000)}`;

    const merchantId = process.env.JAZZCASH_MERCHANT_ID;
    const password = process.env.JAZZCASH_PASSWORD;
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;
    const returnUrl = process.env.JAZZCASH_RETURN_URL;

    const postData = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: merchantId,
      pp_SubMerchantID: '',
      pp_Password: password,
      pp_BankID: 'TBANK',
      pp_ProductID: 'RETL',
      pp_TxnRefNo: transactionRefNumber,
      pp_Amount: (amount * 100).toString(), // Amount in paisa
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: dateTime,
      pp_BillReference: 'billRef',
      pp_Description: description,
      pp_TxnExpiryDateTime: new Date(Date.now() + 15 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, ''),
      pp_ReturnURL: returnUrl,
      pp_SecureHash: '',
      ppmpf_1: '1',
      ppmpf_2: '2',
      ppmpf_3: '3',
      ppmpf_4: '4',
      ppmpf_5: '5'
    };

    // Create a secure hash
    const sortedKeys = Object.keys(postData).sort();
    const hashString = integritySalt + '&' + sortedKeys.map(key => `${postData[key]}`).join('&');
    const secureHash = crypto.createHash('sha256').update(hashString).digest('hex');

    postData.pp_SecureHash = secureHash;

    // Send the request to JazzCash server directly from the backend
    const endpoint = "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction"

    const formData = new URLSearchParams(postData);

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Handle JazzCash response
    if (response.status === 200) {
      return NextResponse.json({ message: 'Payment initiated successfully', data: response.data });
    } else {
      return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating JazzCash payment request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
