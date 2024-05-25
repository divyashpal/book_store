import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contects/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/"
    useEffect(() => {
        // Show SweetAlert when the component mounts
        Swal.fire({
            title: "Are you sure you want to logout?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            } else {
                // Redirect back to the previous page if the user cancels
                navigate(from, { replace: true });
            }
        });
    }, []);

    const handleLogout = () => {
        logOut().then(() => {
            //alert("Log out successfully");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Logged out successfully"
              });
            navigate(from, {replace:true})
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className='h-screen bg-teal-100 flex items-center justify-center'>
            {/* <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>
                Logout
            </button> */}
        </div>
    )
}

export default Logout