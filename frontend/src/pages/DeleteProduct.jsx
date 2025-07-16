import React,{useActionState, useEffect,useState } from "react";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";

const DeleteProduct = () => {

  const [loading,setLoading] = useState(false);
  const navigate =useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const token = localStorage.getItem('token');
  const config = {
      headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
      }
  };
  const handleDeleteProduct = ()=>{
    setLoading(true);

    axios
      .delete( `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`,config)
      .then (()=>{
        setLoading(false);
        enqueueSnackbar('Product Deleted Successfully', { variant: 'success' });
        navigate('/admin');
      })
      .catch((error)=>{
        setLoading(false);
        enqueueSnackbar('Error',{variant:error});
        console.log(error);
      })
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6">
    <Link
      to="/admin"
      className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition"
    >
      ← Back
    </Link>

    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Are you sure you want to delete this product?
    </h2>

    <p className="text-sm text-gray-600 mb-6">
      This action cannot be undone. The product will be permanently removed.
    </p>

    <div className="flex justify-end gap-4">
      <Link
        to="/admin"
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        Cancel
      </Link>
      <button
        onClick={handleDeleteProduct}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Yes, Delete
      </button>
    </div>
  </div>
</div>

  )
}

export default DeleteProduct
