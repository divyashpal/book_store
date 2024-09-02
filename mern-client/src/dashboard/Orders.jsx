import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      
      try {

        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        // console.log('Token:',token);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is stored in localStorage
          }
        });

        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setError('Unexpected response format');
          console.error('Unexpected response format:', response.data);
        }
      } catch (err) {
         if (err.response && err.response.status === 403) {
          setError('Access denied. Please check your credentials.');
        } else {
          setError('Failed to fetch orders');
        }
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>User ID: {order.userId}</p>
            <p>Amount: ${order.amount / 100}</p>
            <p>Status: {order.paymentStatus}</p>
            <p>Items: {order.items.map(item => item.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
