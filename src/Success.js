import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const Success = () => {

    const navigate = useNavigate();

    const onBack=()=>{
        navigate('/');
    }


  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card text-center" style={{ width: "18rem", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
        <div className="card-body">
          <FaCheckCircle size={50} color="green" />
          <h5 className="card-title mt-3">Payment successfully completed</h5>
        </div>
      </div>

      <button className='btn btn-primary mt-5' onClick={onBack}>back</button>
    </div>
  );
};

export default Success;