import { createContext } from "react";
import {useState} from 'react'
export const BuyItem = createContext(null);

export default function BuyProvider({ children }) {
  const Buy = "123";
 
  const DetailsItem = {};
  // const [data,setData]=useState([]);
   const [data, setData] = useState([]);
   const [user ,setUser]=useState({
    name:"Mohd Muqeem Alam",
    number:"1234567890",
    password:"Muqeem123",
    email:'',
    orderStatus:'true',
    priceTotal:'',
    PaymentDetails:''
    
   });

   const [showAlert, setShowAlert] = useState(false);
   const [loginStatus ,setLoginStatus]=useState(false);
  return (
    <BuyItem.Provider value={{ data ,setData ,user ,setUser,loginStatus ,setLoginStatus}}>
      {children}
    </BuyItem.Provider>
  );
}
