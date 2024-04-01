import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner"
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    // Load the authenticated user
    const { isAuthenticated } = useUser();
    // redirect to login if the user is not authenticated
    useEffect(() => {
        setLoading(false);
        if (!isAuthenticated) navigate("/")
        else setLoading(false)
    }, [isAuthenticated, navigate])

    if (isLoading) {
        return <Spinner />
    }

    if (isAuthenticated) return children
}

export default ProtectedRoute
