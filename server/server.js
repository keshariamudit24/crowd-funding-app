const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

 
const razorpay = new Razorpay({
    key_id: 'rzp_test_YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
