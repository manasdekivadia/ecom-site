import React,{useEffect}from 'react'
import { useCart } from '../context/CartContext'
import { CheckCircle } from 'lucide-react';

const Success = () => {

  const {clearCart} = useCart();

  useEffect(()=>{
    console.log('Payment was Succesfull, Clearing Cart');
    clearCart();
  
  },[clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
      <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
      <p className="text-lg text-green-700 text-center max-w-md">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
    </div>
  );
};

export default Success
