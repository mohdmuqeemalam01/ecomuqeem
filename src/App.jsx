import { useState } from 'react'
import Header from './componets/Header'
import './styles/global.css'
import Footer from './componets/foooter'
import LogIn from './componets/sign_login/loging.jsx';
import SignUp from './componets/sign_login/signup.jsx';
import { Route, Routes } from 'react-router'
import Home from './componets/Home.jsx';
import MyProfile from './componets/myprofile.jsx';
import OneSelect from './componets/OneSelect.jsx';
import ItemDetails from './componets/ItemDetails.jsx';
import  BuyProvider  from './componets/context/store.jsx';
import  Cart  from './componets/Cart.jsx';
import Order from './componets/order/Order.jsx';
import Payment from './componets/order/payment.jsx';





function App(){


  return (

    <BuyProvider>
      <Header />
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<LogIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/select" element={<OneSelect />} />
        <Route path='/buyitem/:id'element= {<ItemDetails/>} />
        <Route path='/cart' target='_blank' element={<Cart/>} />
        <Route path='/Order' element={<Order/>} />
         <Route path='/Payment' element={<Payment/>} />
      </Routes>
    
      <Footer />
    </BuyProvider>


  )
}

export default App;
