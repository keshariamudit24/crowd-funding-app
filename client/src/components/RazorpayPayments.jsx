import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RazorpayPayments = () => {
    const [amount, setAmount] = useState(100);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await initializeRazorpay();
        if (!res) {
            toast.error('Razorpay SDK failed to load');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            const options = {
                key: 'rzp_test_YOUR_KEY_ID',
                amount: data.amount,
                currency: data.currency,
                order_id: data.id,
                name: 'NGO Crowdfunding',
                description: 'Thank you for your donation',
                handler: function (response) {
                    toast.success('Payment Successful!');
                },
                prefill: {
                    email: 'donor@example.com',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="font-bold text-4xl mb-4">
                        Donate with Razorpay
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your donation through Razorpay directly funds our mission. Make a secure payment and make a difference today.
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-medium mb-3">
                        Donation Amount (INR)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="100"
                            min="1"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                            INR
                        </span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 rounded-xl transition-colors duration-300"
                >
                    Donate with Razorpay
                </button>

                <p className="text-gray-500 text-center mt-6">
                    Your donation will be processed securely. Thank you for your generosity!
                </p>
            </div>
        </div>
    );
};

export default RazorpayPayments;