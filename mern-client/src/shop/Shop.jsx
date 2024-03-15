import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setBooks(data));
  }, [])
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are here</h2>

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

                <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy now</button>
              </Card>
            </Link>)
        }
      </div>
    </div>
  )
}

export default Shop