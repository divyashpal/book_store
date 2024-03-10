import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
    const {_id,bookTitle,imageURL} = useLoaderData();
   return (
    <div className='mt-28 px-24 lg:px-24'>
        <img src={imageURL} className='h-96'></img>
        <h2>{bookTitle}</h2>

    </div>
  )
}

export default SingleBook