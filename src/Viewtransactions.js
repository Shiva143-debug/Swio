import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const Viewtransactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    const onBack=()=>{
        navigate('/');
    }

    useEffect(() => {
        fetch('https://invited-sweet-alphabet.glitch.me/getpayment')
            .then(res => res.json())
            .then(data => setTransactions(data)

            )

    }, [])


  return (
    <div>
      <h1 style={{textAlign:"center"}}>View Transaction Details</h1>
      <div className="transactions-container">
      {transactions.map(transaction => (
        <div key={transaction.id} className="transaction-card">
          <div class="d-flex justify-content-between">
          <p>Name:<span style={{fontWeight:"bold"}}>{transaction.name}</span></p>
          <p className="TransactionID">TransactionID:<span style={{fontWeight:"bold"}}>{transaction.transaction}</span></p>
          </div>
          <p className="amount">Amount: <span style={{fontWeight:"bold"}}>${transaction.amount}</span></p>
        </div>
      ))}

</div>

<div style={{ textAlign: "center", marginTop: "20px" }}>


      <button onClick={onBack} class="btn btn-success btn-lg">Back</button>
      </div>
    </div>
  );
};

export default Viewtransactions;
