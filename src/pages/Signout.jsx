import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";


function Signout() {
const [isLoading,setIsLoading] = useState(true);
const navigate = useNavigate();
useEffect(()=>{
    setTimeout(() => {
        setIsLoading(false);
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    }, 3000);
},[])
  return (
    <>
      
        <h1 className="text-3xl font-bold">You are being logging out</h1>
      
        <div className="flex flex-wrap justify-center mt-8">
          {isLoading ? <> <Spinner /> </>:""}

      </div>
      
    </>
  );
}

export default Signout;
