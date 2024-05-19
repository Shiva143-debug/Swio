const express = require('express');
// const Stripe = require('stripe');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const stripe = new Stripe('your-secret-key-here');

app.use(bodyParser.json());
app.use(cors());

const db= mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:'test'
})

app.post('/create-payment', async (req, res) => {
    const { name, amount, transactionId } = req.body;
    const sql = "INSERT INTO payment (name,amount,transactionId) VALUES (?,?,?)";
    const values = [name, amount, transactionId];
    console.log("Inserting values into payment table:", values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data into payment table:", err);
            return res.status(500).json({ error: "Error inserting data into payment table" });
        }
        console.log("Data inserted successfully into payment table");
        return res.json({ success: true, message: "Data inserted successfully" });
    });
});

app.get('/getpayment',(req,res)=>{
    const sql="SELECT  * FROM payment";
    db.query(sql,(err,data)=>{
        // console.log(err);
        // console.log(data);
        if(err) return res.json(err);
        return res.json(data)
    })
    
})

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});


