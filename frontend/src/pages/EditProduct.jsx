import React,{useActionState, useEffect,useState } from "react";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const EditProduct = () => {

  const[name,setName] = useState('');
  const[price,setPrice] = useState('');
  const[category,setCategory] = useState('');
  const[description ,setDescription] = useState('');
  const[loading,setLoading] = useState(false);

  const Navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const token = localStorage.getItem('token');
  const config = {
      headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
      }
  };
  useEffect(()=>{
    setLoading (true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`)
      .then((response)=>{
        setName(response.data.name);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setDescription(response.data.description);
        setLoading(false);

      })
      .catch((error)=>{
        setLoading(false);
        console.log(error);
        alert("An Error has occured. Please Check Console.");
      }) 
  },[id]);

  const handleEditProduct= ()=>{
    const data = {name, price ,description,category};
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`,data,config)  
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Product Edited Succesfully',{variant:'success'});
        Navigate('/admin');
      })
      .catch((error)=>{
        setLoading(false);
        enqueueSnackbar('Error',{variant:'error'});
        console.log(error);
      })
  }

  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        
        <Link
          to="/admin"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition"
        >
          ← Back
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 text-center">Edit Product</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="" disabled>Select category</option>
              <option value="course">Course</option>
              <option value="template">Template</option>
            </select>
          </div>

          <button
            onClick={handleEditProduct}
            className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

  )
}

export default EditProduct
