import React, { useEffect } from 'react'
import { useState } from 'react';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [key, setKey] = useState(0); // Add key state


    useEffect(() => {
        fetch("http://localhost:5000/cart")
            .then(res => res.json())
            .then(data => setCartItems(data))
    }, [key]);

    const removeFromCart = (bookId) => {
        fetch(`http://localhost:5000/remove-from-cart/${bookId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // Handle response if needed
                // console.log("Book removed from cart:", data);
                // Remove the item from the local state
                setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== bookId));
                setKey(prevKey => prevKey + 1); // Increment key to force re-render
            })
            .catch(error => {
                console.error("Error removing book from cart:", error);
            })
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mt-20">Your Cart</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {cartItems.map(item => (
                    <div key={item._id} className="border p-4">
                        <img src={item.imageURL} alt={item.bookTitle} className="w-24 h-24 mb-2" />
                        <h3 className="text-lg font-semibold">{item.bookTitle}</h3>
                        <p className="text-gray-600">Price: Rs.{item.price}</p>
                        <button onClick={() => removeFromCart(item._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cart