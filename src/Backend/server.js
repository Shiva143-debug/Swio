// I have Deployed the backend code in glitch


const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PIPpiSD7XYNdwI6gBFFRyDuMtGJsuQ5TCjkc7Q0k1hh0fLutW8h3rwIVLJvRzDbrf6ZtUebX6TirZmgX29HmYas00dNjoI23U');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'oss_admin',
    host: '148.72.246.179',
    database: 'expense',
    password: 'Latitude77',
    schema: 'public',
    port: '5432',
});

app.post('/create-payment', async (req, res) => {
    const { name, amount, transaction } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Payment for transaction ' + transaction,
                    },
                    unit_amount: amount * 100, 
                  
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://swio-app.vercel.app//success',
            cancel_url: 'https://swio-app.vercel.app//cancel',
        });

        const sql = "INSERT INTO payment (name, amount, transaction) VALUES ($1, $2, $3)";
        const values = [name, amount, transaction];
        console.log("Inserting values into payment table:", values);

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data into payment table:", err);
                return res.status(500).json({ error: "Error inserting data into payment table" });
            }
            console.log("Data inserted successfully into payment table");
            return res.json({ id: session.id });
        });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        return res.status(500).json({ error: "Error creating Stripe session" });
    }
});

app.get('/getpayment', (req, res) => {
    const sql = "SELECT * FROM payment";
    pool.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data.rows);
    });
});

app.listen(process.env.PORT || 4000, () => console.log("Server running on port " + (process.env.PORT || 4000)));
