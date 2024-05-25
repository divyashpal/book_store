import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sucess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Payment successfull ",
      text: "Your payment has been successfull",
      footer: ''
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/'); // Redirect to the home page
      }
    });
  }, []);
  
  return (
    <div></div>
  )
}

export default Sucess