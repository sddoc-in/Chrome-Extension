import React, { useState, ChangeEvent } from "react";
import SkyBidder from "../components/common/SkyBidder";
import InputEmail from "../components/input/InputEmail";
import InputPass from "../components/input/InputPass";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import Loading from "../components/loader/Loading";

export default function Signin() {

  const [load ,setLoad] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);

  if (localStorage.getItem('Token')) {
    window.location.href = '/dashboard';
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password fields cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('Token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login response:', response);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  return (
    <>
   {load && <Loading/>}
    <div className="relative w-full h-auto md:h-[100vh] overflow-hidden">
      <SkyBidder />
      <div className="w-full md:w-[65%] lg:w-[75%] pb-6 md:absolute top-[30%] md:top-0 right-0 bg-white h-full z-20 rounded-t-3xl lg:rounded-t-[unset] lg:rounded-l-[1.5rem!important] block pt-20 md:pt-0 md:flex items-center justify-center">
        <div className="w-[80%] mx-auto">
          <h1 className="text-black text-center font-bold text-[32px]">
            Log in to your account
          </h1>
          <div className="flex justify-evenly w-full items-center my-5 flex-col lg:flex-row">
          </div>
          <div className="w-full md:w-10/12 mx-auto text-start my-6">
            <InputEmail defValue="" 
            onChange={handleChange}
            name="email"/>
            <InputPass defValue=""
            onChange={handleChange}
            name="password" />
            <button className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
            onClick={handleLogin}>
              <IoIosSend className="mr-3 text-[20px]" />Log in
            </button>
            {error && <b className="text-red-500 mt-4">{error}</b>}
            <div className="flex justify-between mx-6 ">
            <p className="text-[#575454] text-[16px] font-[700] mt-4">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-[#002F53] font-[900]">
                Sign Up
              </a>
            </p>
            <p className="text-[#575454] text-[16px] font-[700] mt-4">
              Forgot your password?{" "}
              <span className="text-[#002F53] font-[900]">Reset Password</span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
