import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const SingleBook = () => {
  const { _id, bookTitle, imageURL, bookDescription, authorname, category, price } = useLoaderData();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');



  useEffect(() => {
    // Fetch the number of items in the cart when the component mounts
    fetch("http://localhost:5000/cart")
      .then(res => res.json())
      .then(data => setCartItemsCount(data.length))
      .catch(error => console.error("Error fetching cart items:", error));
  }, []);

  // Function to add a book to the cart
  const addToCart = (bookId) => {
    fetch(`http://localhost:5000/add-to-cart/${bookId}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        // Handle response if needed
        console.log("Book added to cart:", data);
        // Update the cart items count
        setCartItemsCount(prevCount => prevCount + 1);
        // Update the state to indicate that the book is in the cart
        setIsInCart(true);
      })
      .catch(error => {
        console.error("Error adding book to cart:", error);
      });
  };



  return (

    <div className='flex flex-wrap mt-28 px-24 lg:px-24 relative'>
      {/* Cart Icon */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <Link to="/cart" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7v3m0 0v4m0-4h3m-3 0H5a2 2 0 01-2-2v-.6a3 3 0 013-3h14a3 3 0 013 3v.6a2 2 0 01-2 2h-3" />
            </svg>
            Cart ({cartItemsCount})
          </Link>
        </div>
      )}

      <div className='flex'>
        <div className='flex flex-col'>
          <img src={imageURL} className='h-96'></img>
        </div>
        <div className='ml-80 flex flex-col items-center justify-center'>
          <h2 className='text-5xl font-semibold text-gray-700 whitespace-normal'>{bookTitle}</h2>
          <div className='mt-4'>
            <p className='text-xl text-gray-600'>By {authorname}</p>
          </div>
          <div className='mt-4'>
            <p className='text-xl text-gray-600'>Category - {category}</p>
          </div>
          <button 
            className='bg-blue-700 mt-2 w-full h-15 font-semibold text-white py-2 rounded' 
            onClick={() => addToCart(_id)}
            disabled={isInCart} // Disable the button if the book is already in the cart
          >
            {isInCart ? 'Already in Cart' : `Add to cart @ Rs.${price}`}
          </button>
        </div>
      </div>
      <div className='mt-5 mb-6 flex flex-col justify-evenly'>
        <h6 className='text-3xl font-medium'>Description</h6>
        <p className='mt-2 text-xl whitespace-normal'>{bookDescription}</p>
      </div>
    </div>
  )
}

export default SingleBook