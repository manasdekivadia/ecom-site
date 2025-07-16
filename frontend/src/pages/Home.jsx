import React,{useEffect , useState} from 'react'
import axios from "axios";
import ProductCard from '../components/ProductCard';


const Home = () => {

    const [product ,setProduct] = useState([]);

    useEffect(()=>{

        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
            .then((response)=>{
                setProduct(response.data.data);
            })
            .catch((error)=>{
                console.log(error);
            });

    },[]);

  return (
<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-teal-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6 space-y-20">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl text-center space-y-6 animate-fadeIn">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          Welcome to <span className="text-teal-600 dark:text-teal-400 drop-shadow-md">Codemy</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 px-4 leading-relaxed">
          We offer high-quality <span className="text-teal-500 dark:text-teal-400 font-semibold">online programming courses</span> and beautifully designed <span className="text-teal-500 dark:text-teal-400 font-semibold">website templates</span> you can purchase.
        </p>
        <a href='/shop'>
        <button className="mt-8 px-10 py-4 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-500 dark:to-teal-600 text-white font-bold text-xl rounded-full shadow-md hover:scale-105 transition duration-300">
          Shop Now
        </button></a>
      </div>
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <ProductCard product={product} />
      </div>
      </div>
</div>
  )
}

export default Home
