import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [key, setKey] = useState(0); // Add key state
    const navigate = useNavigate(); // Initialize navigate function
    const [totalBooks, setTotalBooks] = useState(0); // Add state for totalBooks
    const [totalPrice, setTotalPrice] = useState(0); // Add state for totalPrice


    useEffect(() => {
        fetch("http://localhost:5000/cart")
            .then(res => res.json())
            .then(data => {
                setCartItems(data);
                updateTotals(data); // Update totals after fetching cart items
            })
    }, []);

    const updateTotals = (items) => {
        let totalBooksCount = 0;
        let totalPriceValue = 0;
        items.forEach(item => {
            totalBooksCount += item.quantity || 0;
            totalPriceValue += (item.price * (item.quantity || 0));
        });
        setTotalBooks(totalBooksCount);
        setTotalPrice(totalPriceValue);
    };

    // const removeFromCart = (bookId) => {
    //     fetch(`http://localhost:5000/remove-from-cart/${bookId}`, {
    //         method: 'DELETE',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // Handle response if needed
    //             // console.log("Book removed from cart:", data);
    //             // Remove the item from the local state
    //             setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== bookId));
    //             setKey(prevKey => prevKey + 1); // Increment key to force re-render
    //         })
    //         .catch(error => {
    //             console.error("Error removing book from cart:", error);
    //         })
    // };

    const removeFromCart = (bookId) => {
        fetch(`http://localhost:5000/remove-from-cart/${bookId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // Handle response if needed
                console.log("Book removed from cart:", data);

                // Remove the item from the local state
                setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== bookId));
            })
            .catch(error => {
                console.error("Error removing book from cart:", error);
            });
    };

    // const handleQuantityChange = (bookId, quantityChange) => {
    //     fetch(`http://localhost:5000/change-quantity/${bookId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ quantityChange }),
    //     })
    //         .then(res => res.json())
    //         .then(updatedItem => {
    //             setCartItems(prevCartItems => {
    //                 return prevCartItems.map(item => {
    //                     if (item._id === bookId) {
    //                         const updatedQuantity = updatedItem.quantity;
    //                         return { ...item, quantity: updatedQuantity };
    //                     }
    //                     return item;
    //                 });
    //             });
    //             updateTotals(cartItems.map(item => {
    //                 if (item._id === bookId) {
    //                     return { ...item, quantity: updatedItem.quantity };
    //                 }
    //                 return item;
    //             })); // Update totals after changing quantity
    //         })
    //         .catch(error => {
    //             console.error("Error changing quantity:", error);
    //         });
    // };

    const handleQuantityChange = (bookId, quantityChange) => {
        fetch(`http://localhost:5000/change-quantity/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantityChange }),
        })
        .then(res => res.json())
        .then(updatedItem => {
            console.log("Updated item:", updatedItem); // Check if the updated item is received correctly

            // Update the quantity of the item in the cart directly
            const updatedCartItems = cartItems.map(item => {
                if (item._id === bookId) {
                    const updatedQuantity = updatedItem.quantity;
                    console.log("Updated quantity:", updatedQuantity); // Check if the updated quantity is received correctly
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            });

            console.log("Updated cart items:", updatedCartItems); // Check if the cartItems state is updated correctly
            // Update cart items state with the updated quantities
            setCartItems(updatedCartItems);
            // Recalculate the total books and total price based on the updated quantities
            updateTotals(updatedCartItems);
        })
            .catch(error => {
                console.error("Error changing quantity:", error);
            });
    };


    // Function to calculate total amount
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);
    };

    //payment integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51Ox301SJZ7HGVRiknhcApObzraBoN4hcvmr1tmJPc7ESZswzeScc9T0HAXKUL0HknRzPBEETgSmkh6KEV87FM1bh00UKzAxUQf");

        const body = {
            products: cartItems
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:5000/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });
        const session = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });

        if( result.error){
            console.log(result.error);
        }
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mt-20">Your Cart</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {cartItems.map(item => (
                    <div key={item._id} className="border p-4">
                        <img src={item.imageURL} alt={item.bookTitle} className="w-24 h-24 mb-2" />
                        <h3 className="text-lg font-semibold">{item.bookTitle}</h3>
                        <p className="text-gray-600">Price: Rs.{item.price}</p>
                        <div className="flex items-center mt-2">
                            <button onClick={() => handleQuantityChange(item._id, -1)} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                            <span className="px-4">{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item._id, 1)} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <p className="font-semibold">Total Books: {totalBooks}</p>
                <p className="font-semibold">Total Price: Rs.{totalPrice}</p>
            </div>
            <button onClick={makePayment} className="mt-5 bg-blue-700 text-white text-xl px-6 py-4 rounded hover:bg-blue-800">Checkout</button>
        </div>
    );
};


export default Cart