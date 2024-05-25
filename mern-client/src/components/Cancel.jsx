import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Cancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Payment failed ",
      text: "Something went wrong!",
      footer: ''
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/'); // Redirect to the home page
      }
    });
  }, []);

  return (
    <div></div>
  );
}

export default Cancel;
