import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardElement, Elements, useElements,useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PIPpiSD7XYNdwI6GQaTFOODrlTSMvDN9vYjg2lWbonrQvo4RRJoZLOb1slYJjOEY0sPzDFVTJVVswGJZHhUXoys00231GML0t');

const TransactionDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { name, amount, transaction } = location.state || {};

    const [paymentError, setPaymentError] = useState(null);

    const handlePayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded properly.");
            return;
        }
    
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        // });
    
        // if (error) {
        //     setPaymentError(error.message);
        //     return;
        // }


        const values = { name, amount, transaction };

        axios.post("https://invited-sweet-alphabet.glitch.me/create-payment", values)
            .then(res => {
                console.log(res);
                alert("Payment successfully completed");
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setPaymentError("Error processing payment");
            });
    }

    const onBack = () => {
        navigate('/');
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1 className="mt-5">Make Payment Here</h1>

            <form onSubmit={handlePayment} className="mt-5" style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: "8px", height: "60vh", width: "60vw", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
            {/* <div className="mt-5" style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: "8px", height: "60vh", width: "60vw", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}> */}
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Card Holder Name:</label>
                    <input className="form-control" type="text" name="name" value={name} disabled />
                </div>
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Amount:</label>
                    <input className="form-control" type="text" name="name" value={amount} disabled />
                </div>
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>PaymentMethod:</label>
                    <select className="form-control">
                        <option value="card">Credit Card</option>
                        {/* <option value="upi">UPI Pay</option> */}
                    </select>
                </div>
                <div className="mt-3 mb-2">
                    <CardElement />
                </div>
                <div style={{ display: "flex" }} className="mb-5">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Transaction ID:</label>
                    <input className="form-control" type="text" name="name" value={transaction} disabled />
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={onBack} className="btn btn-primary">Back</button>
                    <button type="submit" disabled={!stripe} className="btn btn-success">Proceed to Payment</button>
                </div>
                {paymentError && <div className="text-danger mt-3">{paymentError}</div>}
                </form>
        </div>
    );
};

const TransactionDetailsWithElements = () => (
    <Elements stripe={stripePromise}>
        <TransactionDetails />
    </Elements>
);

export default TransactionDetailsWithElements;
