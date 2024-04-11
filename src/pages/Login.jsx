import { useEffect, useState } from "react"
import { useLogin } from "../hooks/useLogin";
import { AiOutlineLogin } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useLogin();
  const navigate = useNavigate();

  const onSubmitHandler = function (event) {
    event.preventDefault();

    if (!email || !password){
      toast.error("Email and Password is required");
      return;
    } 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(email)) {
       toast.error("Email must be in xyz@abc.com") 
       return;
      }

      const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{6,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
      if(!passRegex.test(password)) {
        toast.error("Password must be Alphanumeric with special character and 6 of length")
        return;
      }

    login({ email, password, from :'login' }, {
      onSettled: (data) => {
        setEmail("");
        setPassword("");
      }
    })
  }

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user")) || false;
    if(user){
      navigate("/home", { replace: true });
    }
  },[])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Log in</h1>
              <div className="w-full flex-1 mt-8">
                
                
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    type="email"
                    placeholder="Email"
                    autoComplete="username"
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
                    <span className="ml-3 disabled:cursor-not-allowed disabled:bg-gray-300">{!isLoading ? "Log in" : <Spinner />}</span>
                  </button>
                  <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 py-2 inline-block text-sm text-white  dark:text-white dark:bg-gray-800 tracking-wide font-medium transform translate-y-1/2 bg-none">
                  <button type="button" onClick={ () => navigate("/register") } className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    Or Signup here
                    </button>
                  </div>

                </div>
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
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
              }}
            ></div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
