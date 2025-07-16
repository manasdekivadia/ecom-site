import React, { useEffect, useState } from 'react'
import axios from "axios";
import ProductSingleCard from "../components/ProductSingleCard";    

const Shop = () => {

    const [filteredProducts,setFilteredProducts]= useState([]);
    const [category ,setCategory] = useState('');
    const [product , setProduct] = useState([]);
    const [animate, setAnimate] = useState(false);


    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
            .then((response)=>{
                //console.log("Fetched products:", response.data.data);
                setProduct(response.data.data);
                //console.log("Product Categories:", response.data.data);
                setFilteredProducts(response.data.data);

            })
            .catch((error)=>{
                console.log(error);
            })
    },[]);

    const filterProducts = ()=>{
        if(!Array.isArray(product)){
            console.error("Product is not an array ", product);
            return;
        }

        let filtered = [...product];
        if(category !==''){
            filtered = filtered.filter((product)=>{
                return product.category === category;
                //console.log("Product category is :" ,product.category, "And the selected is : ", category);
            }
            );

        }

        setFilteredProducts(filtered);
    };

    useEffect(()=>{
        filterProducts();
    },[product,category]);   

    


return (
        <div className="p-6 max-w-[1300px] mx-auto mt-16">
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
    <div className="form-control w-full sm:w-1/3">
      <label className="label">
        <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Filter by Category</span>
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      >
        <option value="">All</option>
        <option value="course">Courses</option>
        <option value="template">Template</option>
      </select>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <ProductSingleCard key={product._id} product={product} />
      ))
    ) : (
      <p className="text-center text-xl text-gray-500 dark:text-gray-400 col-span-full mt-10">
        No products found.
      </p>
    )}
  </div>
</div>

    );
};


export default Shop
