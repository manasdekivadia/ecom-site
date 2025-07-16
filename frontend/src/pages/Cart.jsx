import React from 'react';
import {useCart} from '../context/CartContext';
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Rl8aVP8bI4vdIh9lFSGDULgk6uxOJfOOOGLIKpPqAEkQrIpajR2kmgqZGvwe3fxvZzAZRRsHaktCMxWMWQpNFAh00c5U4mJRu");

const Cart = () => {
  const { cartItems, decreaseCartItemQuantity, addToCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-gray-700 text-3xl font-semibold text-center my-72">
        Your Cart is Empty
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity,0);

  const handleCheckout = async ()=>{
    const stripe  = await stripePromise;

    const transformedItems =cartItems.map(item=>({
      name : item.name,
      price :item.price,
      quantity:item.quantity,
      image : item.image
    }));

    try {
      
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stripe/create-checkout-session`,{
        products : transformedItems
      });

      const {error} = await stripe.redirectToCheckout({
        sessionId:response.data.id
      });

      if(error){
        console.error('Error during stripe checkout redirection',error);
      }

    } catch (error) {
      console.error('Checkout process Erorr : ',error);
    }
  }




  return (
    <div className="p-6 mt-16 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
        Shopping Cart
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg mb-5 w-full h-64 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{item.name}</h2>
            <p className="text-lg font-medium text-indigo-600 mb-3">
              Price: ₹{item.price.toFixed(2)}
            </p>
            <div className="flex items-center justify-between mb-4 text-gray-700 font-medium">
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => decreaseCartItemQuantity(item._id)}
                className="text-red-500 hover:text-red-700 font-semibold"
                aria-label={`Remove one ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="mt-auto bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              aria-label={`Add one more ${item.name} to cart`}
            >
              Add One More
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-3xl font-extrabold text-gray-900 mb-6">
          Total Price: ₹{totalPrice.toFixed(2)}
        </p>
        <button onClick= {handleCheckout}className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};


export default Cart
