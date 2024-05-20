import Home from "./Home"

import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Payment from "./Payment"
import TransactionDetails from "./TransactionDetails"
import Viewtransactions from "./Viewtransactions"
import Success from "./Success"
import Failure from "./Failure"

const App=()=>{
  return(
    
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/payment" element={<Payment/>}></Route> */}
        <Route path="/transaction-details" element={<TransactionDetails/>}></Route>
        <Route path="/viewTransacations" element={<Viewtransactions/>}></Route>
        <Route path="/success" element={<Success/>}></Route>
        <Route path="/cancel" element={<Failure/>}></Route>
      
      </Routes>
    </BrowserRouter>
  )

}
export default App