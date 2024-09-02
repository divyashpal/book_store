import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);
  // const [cartItemsCount, setCartItemsCount] = useState(0);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/all-books`).then(res => res.json()).then(data => setBooks(data));
  }, [])

  // useEffect(() => {
  //   // Fetch the number of items in the cart when the component mounts
  //   fetch("http://localhost:5000/cart")
  //     .then(res => res.json())
  //     .then(data => setCartItemsCount(data.length));
  // }, []);

  //  // Function to add a book to the cart
  //  const addToCart = (bookId) => {
  //   fetch(`http://localhost:5000/add-to-cart/${bookId}`, {
  //     method: 'POST',
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     // Handle response if needed
  //     console.log("Book added to cart:", data);
  //   })
  //   .catch(error => {
  //     console.error("Error adding book to cart:", error);
  //   });
  // };



  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are here</h2>


      {/* Conditional rendering for the cart icon
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <Link to="/cart" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7v3m0 0v4m0-4h3m-3 0H5a2 2 0 01-2-2v-.6a3 3 0 013-3h14a3 3 0 013 3v.6a2 2 0 01-2 2h-3" />
            </svg>
            Cart ({cartItemsCount})
          </Link>
        </div>
      )} */}


      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {

          books.map(book =>
            <Link to={`/book/${book._id}`}>
              <Card>
                <img src={book.imageURL} className='h-96'></img>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.bookTitle.length > 20 ? `${book.bookTitle.slice(0, 20)}...` : book.bookTitle}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {book.bookDescription.length> 170 ? `${book.bookDescription.slice(0, 170)}...`: book.bookDescription}
                </p>
                <div className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Price - Rs.{book.price} 
                </div>

                <button className='bg-blue-700 font-semibold text-white py-2 rounded' >Add to Cart</button>
              </Card>
            </Link>)
        }
      </div>
    </div>
  )
}

export default Shop