import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('your_stripe_publishable_key');

const Payment = ({onCancel}) => {
    // const stripe = useStripe();
    // const elements = useElements();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {

        const transaction = Date.now();
        event.preventDefault();

        // Navigate to the TransactionDetails component with the necessary state
        navigate('/transaction-details', { state: { name, amount, transaction } });

    }

  


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "500px", border: "1px solid gray", borderRadius: "8px", padding: "20px", backgroundColor: "white" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "500px", borderRadius: "8px", padding: "20px", backgroundColor: "white" }}>

                <div style={{ display: "flex" }} class="mb-5">
                    <label class="col-6 " style={{ color: "navy", fontWeight: "bold" }}> Enter Name: </label>
                    <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                </div>

                <div style={{ display: "flex" }} class="mb-5">
                    <label class="col-6" style={{ color: "navy", fontWeight: "bold" }}>Enter Amount: </label>
                    <input
                        type="number"
                        placeholder="Amount"
                        class="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                {/* <CardElement /> */}
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary mx-5">
                        Submit Payment
                    </button>

                </div>

            </form>
            <button onClick={onCancel} class="btn btn-success">
                cancel
            </button>
        </div>
    );
};



export default Payment;
