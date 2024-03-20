import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();

    const { isLoading, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (user) => {
            console.log("USER", user);
            user = {...user, isAuthenticated:true}
           localStorage.setItem("user",JSON.stringify(user));

            toast.success("You've been successfully logged in"),
                navigate("/", { replace: true });
        },

        onError: (error) => {
            console.error(error);
            toast.error("Provided email or password is incorrect")
        }
    })

    return { isLoading, login }
}