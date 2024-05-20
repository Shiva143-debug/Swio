import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PIPpiSD7XYNdwI6GQaTFOODrlTSMvDN9vYjg2lWbonrQvo4RRJoZLOb1slYJjOEY0sPzDFVTJVVswGJZHhUXoys00231GML0t');

const TransactionDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, amount, transaction } = location.state || {};
    const [paymentError, setPaymentError] = useState(null);

    const handlePayment = async (event) => {
        event.preventDefault();
        const stripe = await stripePromise;
        const values = { name, amount, transaction };
        const headers = { "Content-Type": "application/json" };

        try {
            const response = await fetch('https://invited-sweet-alphabet.glitch.me/create-payment', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(values)
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
                setPaymentError(result.error.message);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setPaymentError("Error processing payment");
        }
    }

    const onBack = () => {
        navigate('/');
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1 className="mt-5">Make Payment Here</h1>
            <form onSubmit={handlePayment} className="mt-5" style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: "8px", height: "60vh", width: "60vw", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Card Holder Name:</label>
                    <input className="form-control" type="text" name="name" value={name} disabled />
                </div>
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Amount:</label>
                    <input className="form-control" type="text" name="amount" value={amount} disabled />
                </div>
                <div style={{ display: "flex" }} className="mb-3">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Payment Method:</label>
                    <select className="form-control">
                        <option value="card">Credit Card</option>
                    </select>
                </div>
                <div style={{ display: "flex" }} className="mb-5">
                    <label className="col-4" style={{ color: "navy", fontWeight: "bold" }}>Transaction ID:</label>
                    <input className="form-control" type="text" name="transaction" value={transaction} disabled />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" onClick={onBack} className="btn btn-primary">Back</button>
                    <button type="submit" className="btn btn-success">Proceed to Payment</button>
                </div>
                {paymentError && <div className="text-danger mt-3">{paymentError}</div>}
            </form>
        </div>
    );
};

export default TransactionDetails;
