import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Stats from "../components/Stats";


const Admin = ()=>{

    const[product , setProduct] = useState([]);

    const[loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);

        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
            .then((response) =>{
                setProduct(response.data.data);

                setLoading(false);
            })
            .catch((error) =>{
                console.log(error);
                setLoading(false);
            })

    },[]);


    return (
<div className="px-4 py-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <Stats/>
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Products</h2>
      <Link
        to="/admin/product/create"
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg font-medium transition"
      >
        + Add Item
      </Link>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Price</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {product.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <td className="px-6 py-4">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">₹{product.price}</td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{product.description}</td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{product.category}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/product/edit/${product._id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/product/delete/${product._id}`}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    )
}

export default Admin