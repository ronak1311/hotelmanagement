import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, mutate: signUp } = useMutation({
        mutationFn: ({ firstName,lastName, dob, phoneNumber, address, email, password }) => signUpApi({ firstName,lastName, dob, phoneNumber, address, email, password }),

        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user)

            toast.success("You've been successfully Registerd"),
                navigate("/login", { replace: true })
        },

        onError: (error) => {
            console.error(error);
            // toast.error("Provided email or password is incorrect")
        }
    })

    return { isLoading, signUp }
}