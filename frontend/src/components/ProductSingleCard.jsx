import React from 'react';
import { useCart } from '../context/CartContext';

const ProductSingleCard = ({ product }) => {

  const { addToCart, removeFromCart, cartItems } = useCart();

  const itemInCart = cartItems.find(item => item._id === product._id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => addToCart(product);
  const handleRemoveFromCart = () => removeFromCart(product._id);

  return (
    <div className="card w-full relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
      <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-2 rounded-full text-md font-bold shadow-lg">
        ₹{product.price}
      </div>

      <figure className="overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-[220px] object-cover object-top hover:scale-105 transition-transform duration-300" 
        />
      </figure>

      <div className="card-body flex flex-col gap-4 p-5 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{product.name}</h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {product.description || 'No description available.'}
        </p>

        <div className="mt-auto flex justify-end">
          {quantity > 0 ? (
            <button 
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          ) : (
            <button 
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductSingleCard;
