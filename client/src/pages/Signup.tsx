import React,{ChangeEvent, FormEvent, useState} from "react";
import SkyBidder2 from "../components/common/SkyBidder2";
import InputEmail from "../components/input/InputEmail";
import InputPass from "../components/input/InputPass";
import { IoIosSend } from "react-icons/io";
import InputName from "../components/input/InputName";
import axios, { AxiosError } from "axios";
import Loading from "../components/loader/Loading";

interface SignupResponse {
  msg: string;
}
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};
export default function Signup(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const [load ,setLoad] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    },2000);
  
    return () => clearTimeout(timer);
  }, []);


  const handleSignup = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
      setSuccess(true)  
      setError(null);
      setTimeout(() => {
        window.location.href = "/sign-in";
      },1000);
    } 
     catch (err: unknown) {
      setSuccess(false); 
      if (isAxiosError(err)) {
        if (err.response) {
            if (err.response.status === 400) {
                setError((err.response.data as SignupResponse).msg);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } else if (err.request) {
            setError("No response from the server. Please check your internet connection.");
        } else {
            setError("An unexpected error occurred. Please try again later.");
        }
    } else {
        setError("An unexpected error occurred. Please try again later.");
    }}};
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  return (
    <>
     {load && <Loading/>}
  
    <div className="relative w-full h-auto md:h-[100vh] overflow-hidden">
      <SkyBidder2 />
      <div className="w-full md:w-[65%] lg:w-[75%] pb-6 md:absolute top-[30%] md:top-0 right-0 bg-white h-full z-20 rounded-t-3xl lg:rounded-t-[unset] lg:rounded-l-[1.5rem!important] block pt-20 md:pt-0 md:flex items-center justify-center">
        <div className="w-[80%] mx-auto">
       
          <h1 className="text-black font-bold text-center text-[32px]">Create Your Account</h1>
          <div className="flex justify-evenly w-full items-center my-5 flex-col lg:flex-row">
          </div>
          <p className="w-fit mx-auto text-[#878787] text-[26px]">- OR -</p>
          <div className="w-full md:w-10/12 mx-auto text-start my-6">
            <InputName defValue="" 
            onChange={handleChange}
            name="name"
            />
            <InputEmail defValue=""
             onChange={handleChange}
             name="email"/>
            <InputPass defValue="" 
            onChange={handleChange}
            name="password"
          />
              {error && <b className="text-red-500">{error}</b>}
              {success && (<b className="text-green-800 !font-bold">User Registerd SuccessFully ! Please Login .</b>)}
            <button className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
            onClick={handleSignup}>
              <IoIosSend className="mr-3 text-[20px]" /> Sign Up
            </button>
            <p className="text-[#878787] text-[16px] font-[700] mt-4">
              Already have an account?{" "}
              <a href="/" className="text-[#002F53] font-[900]">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
