import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useSnackbar,enqueueSnackbar } from 'notistack';

const CreateProduct = () => {

  const[name ,setName] = useState('');
  const[price ,setPrice] = useState('');
  const[category ,setCategory] = useState('');
  const[description,setDescription] = useState('');
  const[img ,setImg] = useState(null);
  const[imgPreview , setImgPreview] = useState(null);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();


  const token = localStorage.getItem('token');
  const config = {
      headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
      }
  };
  const handleFileChange = (e)=>{
      const selectedFile = e.target.files[0]; 
      setImg(selectedFile);
      if(selectedFile){
          const reader = new FileReader();
          reader.onload = ()=>{
              setImgPreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
            
      }
      else{
          setImgPreview(null); 
      }
  };

  const uploadFile = async ()=>{
      if(!img){
          enqueueSnackbar('No Image is selected',{variant:'warning'});
          return;
      }

      const data =  new FormData();
      data.append('file',img);
      try{
          const uploadUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload-image`;
          const res = await axios.post(uploadUrl,data);
          
          const {secure_url} = res.data;
          console.log('Uploaded image url : ',secure_url);
          enqueueSnackbar('Image Uploaded Successfully',{variant:'success'});
          return secure_url;

      }catch(error){
          console.log('Upload Error',error);
          enqueueSnackbar('Failed to upload the image',{variant : 'error'});


      }


  };

  const handleSaveProduct = async ()=>{

      if(!name || !price || !category){
          enqueueSnackbar('Please fill all the Required Fields', {variant :"error"});
          return;
      }

      const price_product  = parseInt(price);
      if(isNaN(price_product) || price_product < 0){
          enqueueSnackbar('Price Must be a positive Number.',{variant:'warning'});
          return;
      }

      setLoading(true);
      try {
          const uploadedImageUrl = await uploadFile();
          if(!uploadedImageUrl){
              throw new Error("Image Upload failed.");
          }

          const formdata = {
              name,price,description,image : uploadedImageUrl,category
          };

          await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`, formdata,config);
          enqueueSnackbar('Product Saved Successfully',{variant:'success'});
          navigate("/admin");

          
      } catch (error) {
          console.log('Error :',error);
          enqueueSnackbar('Error Saving Product: '+(error.response?.data?.message || error.message),{variant:'error'});

      } finally{
          setLoading(false);
      }

      };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center px-4 py-10">
<div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-8">
  
  <Link
    to="/admin"
    className="inline-block text-gray-600 hover:text-gray-800 text-sm font-medium"
  >
    ← Back
  </Link>

  <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
    Create Product
  </h1>

  <div className="space-y-6">
    {/* Name Field */}
    <div>
      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Enter product name"
      />
    </div>

    {/* Price Field */}
    <div>
      <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
        Price
      </label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Enter product price"
      />
    </div>

    {/* Description Field */}
    <div>
      <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
        Description
      </label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Short product description"
      />
    </div>

    {/* Category Select */}
    <div>
      <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        <option value="" disabled>Select category</option>
        <option value="course">Course</option>
        <option value="template">Template</option>
      </select>
    </div>

    {/* Image Upload */}
    <div>
      <label htmlFor="img" className="block text-sm font-semibold text-gray-700 mb-2">
        Upload Image
      </label>
      <input
        id="img"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:cursor-pointer
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />

      {imgPreview && (
        <div className="mt-4">
          <img
            src={imgPreview}
            alt="preview"
            className="rounded-xl border border-gray-300 shadow-md max-h-64 object-cover mx-auto"
          />
        </div>
      )}
    </div>

    {/* Save Button */}
    <button
      onClick={handleSaveProduct}
      className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
    >
      Save Product
    </button>
  </div>
</div>
</div>

)
}

export default CreateProduct
