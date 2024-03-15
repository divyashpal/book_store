import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
  const { _id, bookTitle, imageURL, bookDescription, authorname, category, price } = useLoaderData();
  return (
    <div className='flex flex-wrap mt-28 px-24 lg:px-24'>
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
          <button className='bg-blue-700 mt-2 w-full h-15 font-semibold text-white py-2 rounded'>Buy now @ Rs.{price}</button>

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