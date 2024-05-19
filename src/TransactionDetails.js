import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

const TransactionDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, amount, transactionId } = location.state || {};

    const handlePayment = (event) => {
        event.preventDefault()
    
        const values ={name, amount, transactionId }
        

        axios.post("http://localhost:8001/create-payment", values)
        // axios.post("https://ablaze-brassy-umbrella.glitch.me/create-payment", values)
        .then(res => {
            console.log(res);
            // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Customer added successfully' });
           alert("Payment successfull completed")
           navigate('/');
           
        })
        .catch(err => { 
            console.log(err)
    });
    }

    const onBack=()=>{
        navigate('/');
    }


    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height: "100vh"}}>
          
            <h1 class="mt-5">Make Payment Here</h1>
            <div class="mt-5" style={{display:"flex",flexDirection:"column",padding:"20px",borderRadius:"8px",height:"60vh",width:"60vw",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
            <div style={{display:"flex"}} class="mb-3">
            <label class="col-4" style={{color:"navy",fontWeight:"bold"}}>Card Holder Name:  </label>
            <input  class="form-control" type="text" name="name" value={name}  disabled />

            </div>
            <div style={{display:"flex"}} class="mb-3">
            <label class="col-4" style={{color:"navy",fontWeight:"bold"}}>Amount:  </label>
            <input  class=" form-control" type="text" name="name" value={amount}  disabled />
            </div>

            <div style={{display:"flex"}} class="mb-3">
            <label class="col-4" style={{color:"navy",fontWeight:"bold"}}>PaymentMethod:  </label>
            <select class=" form-control">
                <option value="card"> credit Card</option>
                <option value="upi"> upi pay</option>
            </select>
            </div>
            <div style={{display:"flex"}} class="mb-5">
            <label class="col-4" style={{color:"navy",fontWeight:"bold"}}>Transaction ID:  </label>
            <input  class="form-control" type="text" name="name" value={transactionId}  disabled />
            </div>
            
            <div class="d-flex justify-content-between">
            <button onClick={handlePayment} class="btn btn-success" style={{ alignSelf: "center",float:"left"}}>Proceed to Payment</button>
            <button onClick={onBack} class="btn btn-primary">Back</button>
            </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
