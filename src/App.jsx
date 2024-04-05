import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout.jsx";
import CustomerAppLayout from "./ui/CustomnerAppLayout.jsx";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import Bookings from "./pages/Bookings.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        }
    }
})
let user = JSON.parse(localStorage.getItem("user")) || false;
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>

                {user && user.userType == "admin" && 
                <Route path="admin" element={<ProtectedRoute> <AppLayout /> </ProtectedRoute>}>
                        <Route index element={<Navigate replace to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>  }
                <Route path="/" element={ <CustomerAppLayout />}>
                    <Route index element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                
                    

                </Routes>

            </BrowserRouter>
            <Toaster position="top-center" gutter={12} toastOptions={{
                success: {
                    duration: 3000,
                },
                error: {
                    duration: 5000,
                },
            }} />
        </QueryClientProvider>
    );
}

export default App;