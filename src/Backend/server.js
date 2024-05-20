// I have Deployed the backend code in glitch

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PIPpiSD7XYNdwI6gBFFRyDuMtGJsuQ5TCjkc7Q0k1hh0fLutW8h3rwIVLJvRzDbrf6ZtUebX6TirZmgX29HmYas00dNjoI23U');

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

const pool = new Pool({
    user: 'oss_admin',
    host: '148.72.246.179',
    database: 'expense',
    password: 'Latitude77',
    schema: "public",
    port: '5432',
});

app.post('/create-payment', async (req, res) => {
    const { name, amount, transaction } = req.body;

    try {
        // Create a PaymentIntent with the payment method ID
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amount * 100, // amount in cents
        //     currency: 'usd',
        //     payment_method: 'card',
        //     confirmation_method: 'manual',
        //     confirm: true,
        // });

        // If paymentIntent is successful, insert data into the payment table
        const sql = "INSERT INTO payment (name,amount,transaction) VALUES ($1, $2, $3)";
        const values = [name, amount, transaction];
        console.log("Inserting values into payment table:", values);

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data into payment table:", err);
                return res.status(500).json({ error: "Error inserting data into payment table" });
            }
            console.log("Data inserted successfully into payment table");
            return res.json({ success: true, message: "Data inserted successfully" });
        });
    } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        return res.status(500).json({ error: "Error creating PaymentIntent" });
    }
});

app.get('/getpayment', (req, res) => {
    const sql = "SELECT  * FROM payment";
    pool.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data.rows);
    });
});

app.listen(process.env.PORT || 4000, () => console.log("server on " + process.env.PORT));
