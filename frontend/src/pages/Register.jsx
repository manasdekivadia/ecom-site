import React,{useDebugValue, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Register = () => {

    const navigate = useNavigate();
    const[userData , setUserData] = useState({
        name : '',
        email: '',
        password : '',
        password2 : '' 

    });

    const [statusMessage , setStatusMessage] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);

    const changeInputHandler= (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
        setStatusMessage('');
        setIsSuccess(false);

    };

    const submitHandler = async (e)=>{
        e.preventDefault();

        if(userData.password !== userData.password2){
            setIsSuccess(false);
            setStatusMessage('Passwords Do Not Match');
            return;
           
            
        }

        try {

            const config = {
                headers :{
                    'Content-Type' : 'application/json'
                }
            };

            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/register`,{
                name : userData.name,
                email : userData.email,
                password : userData.password
            },config);

            setIsSuccess(true);
            setStatusMessage("Registration Succesfull");
            navigate('/login');

            
        } catch (error) {
            setIsSuccess(false);
            setStatusMessage(error.response?.data?.msg|| "An Error Occured");
             
        }
    }



return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4'>
        <h2 className='text-3xl font-bold mb-6 text-gray-800'>Create Your Account</h2>

        {statusMessage && (
            <p className={`${isSuccess ? 'text-green-600' : 'text-red-600'} text-lg italic mb-4`}>
                {statusMessage}
            </p>
        )}

        <form 
            className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-4'
            onSubmit={submitHandler}
        >
            <input
                type="text"
                placeholder='Username'
                name="name"
                value={userData.name}
                onChange={changeInputHandler}
                className='shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
                type="email"
                placeholder='Email'
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
                className='shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
                type="password"
                placeholder='Password'
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
                className='shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
                type="password"
                placeholder='Confirm password'
                name="password2"
                value={userData.password2}
                onChange={changeInputHandler}
                className='shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <button
                type="submit"
                className='bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white font-bold py-3 rounded-md w-full'
            >
                Register
            </button>
        </form>

        <p className='mt-6 text-gray-700'>Already have an account?</p>
        <Link
            to="/login"
            className='text-blue-600 hover:text-blue-800 font-semibold text-lg'
        >
            Sign In
        </Link>
    </div>
)};

export default Register