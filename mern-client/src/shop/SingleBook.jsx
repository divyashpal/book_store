import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
  const { _id, bookTitle, imageURL, bookDescription, authorname, category, price } = useLoaderData();
  return (
    <div className='flex flex-wrap mt-28 px-24 mb-5 lg:px-24'>
      <div className='flex'>
        <div className='flex flex-col'>
          <img src={imageURL} className='h-96'></img>
          <button className='bg-blue-700 mt-2 w-full font-semibold text-white py-2 rounded'>Buy now</button>
        </div>
        <div className='ml-8'>
          <h2 className='text-5xl font-semibold text-gray-700 whitespace-normal'>{bookTitle}</h2>
          <div className='mt-4'>
            <p className='text-xl text-gray-600'>By {authorname}</p>
          </div>
          <div className='mt-4'>
            <p className='text-xl text-gray-600'>Category - {category}</p>
          </div>
        </div>
      </div>
      <div className='mt-5 flex flex-col  justify-evenly'>
        <h6 className='text-2xl'>Description</h6>
        <p className='mt-2 text-xl whitespace-normal'>{bookDescription}</p>
      </div>
    </div>
  )
}

export default SingleBook