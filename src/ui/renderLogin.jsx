import { AiOutlineLogin } from "react-icons/ai";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

function RenderLogin(email,
    password,
    isLoading,
    setPassword,
    setEmail,
    onSubmitHandler){
const navigate = useNavigate();
return(
  <div>
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-1 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/1 xl:w-5/12 p-6 sm:p-12">
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
                <button
                  onClick={(e) => onSubmitHandler(e)}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <AiOutlineLogin size={20} />
                  <span className="ml-3 disabled:cursor-not-allowed disabled:bg-gray-300">
                    {!isLoading ? "Log in" : <Spinner />}
                  </span>
                </button>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 py-2 inline-block text-sm text-white  dark:text-white dark:bg-gray-800 tracking-wide font-medium transform translate-y-1/2 bg-none">
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Or Signup here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default RenderLogin;