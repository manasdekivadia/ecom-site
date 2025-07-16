import React,{useState} from 'react'
import {Link , useAsyncError, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [loginData , setLoginData] = useState({
    email :'',
    password : ''
  });

  const [statusMessage ,setStatusMessage] = useState('');

  const changeInputHandler = (e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value});
    if(statusMessage) setStatusMessage('');

  };

  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`,loginData);
      console.log(response.data);
      
      localStorage.setItem('token',response.data.token);

      navigate('/admin');
    } catch (error) {
      if(error.response){
        setStatusMessage(error.response.data.msg);
      }else if(error.request){
        console.log(error.request);
      }else{
        console.error("Error : ",error.message);
      }
      
    }
  };


    return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 px-4'>
    <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Welcome Back 👋</h2>

        {statusMessage && (
            <p className='text-red-500 text-sm italic text-center'>
                {statusMessage}
            </p>
        )}

        <form className='space-y-4' onSubmit={submitHandler}>
            <input
                type="email"
                placeholder='Email'
                name="email"
                value={loginData.email}
                onChange={changeInputHandler}
                className='w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
                type="password"
                placeholder='Password'
                name="password"
                value={loginData.password}
                onChange={changeInputHandler}
                className='w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <button
                type='submit'
                className='w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-all duration-300'
            >
                Log In
            </button>
        </form>

        <p className='text-center text-gray-700'>No account yet?</p>
        <Link
            to="/register"
            className='block text-center text-blue-600 hover:text-blue-800 font-semibold'
        >
            Create an Account
        </Link>
    </div>
</div>

  )
}


export default Login
