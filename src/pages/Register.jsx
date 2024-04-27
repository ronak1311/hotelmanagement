import { useState } from "react"
import { AiOutlineLogin } from "react-icons/ai";
import Spinner from "../ui/Spinner";
import { useRegister } from "../hooks/useRegister";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, signUp } = useRegister();

  const onSubmitHandler = function (event) {
    event.preventDefault();
    let isError = false;
    if (!email && !password && !firstName && !lastName && !dob && !phoneNumber && !address){
      toast.error("All the fields are required");
      return;
    } 

    if(!firstName){
      toast.error("First Name is required");
      isError = true;
    }

    if(!lastName){
      toast.error("Last Name is required");
      isError = true;
    }


    if(!email){
      toast.error("Email is required");
      isError = true;
    }
    if(!address){
      toast.error("Address is required");
      isError = true;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!regex.test(email)) {
          toast.error("Email must be in xyz@abc.com") 
          isError = true;
         }

    if(!dob){
      toast.error("Date of Birth is required");
      isError = true;
    }

    if(!phoneNumber){
      toast.error("Phonenumber is required");
      isError = true;
    }

    const phoneRegex = /^\+1\d{10}$/;
    if(!phoneRegex.test(phoneNumber)) {
      toast.error("Phonenumber must be in +1XXXXXXXXXX Format");
      isError = true;
    }

    if(!password){
      toast.error("Password is required");
      isError = true;
    }

    const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{6,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
    if(!passRegex.test(password)) {
      toast.error("Password must be Alphanumeric with special character and 6 of length")
      isError = true;
    }


    
    if(isError) return;

    signUp({ firstName,lastName, dob, phoneNumber, address, email, password }, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      }
    })
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
              <div className="w-full flex-1 mt-8">
                
                <div className="mx-auto max-w-xs">
                <input
                    className="w-full px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    disabled={isLoading}
                    type="text"
                    placeholder="First Name"
                    autoComplete="firstname"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    disabled={isLoading}
                    type="text"
                    placeholder="Last Name"
                    autoComplete="lastname"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    type="email"
                    placeholder="Email"
                    autoComplete="username"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    disabled={isLoading}
                    type="date"
                    placeholder="Date of Birth"
                    autoComplete="dob"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    type="text"
                    placeholder="Phone Number"
                    autoComplete="phoneNumber"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isLoading}
                    type="textarea"
                    placeholder="Address"
                    autoComplete="address"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <AiOutlineLogin size={20} />
                    <span className="ml-3 disabled:cursor-not-allowed disabled:bg-gray-300">{!isLoading ? "Register" : <Spinner />}</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 dark:text-white text-center">
                    I agree to abide by itsteatv's hotel
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>
                    and its
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Register
