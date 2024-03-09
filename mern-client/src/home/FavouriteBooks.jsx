import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const FavouriteBooks = () => {
    const [books,setbooks] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:5000/all-books').then(res => res.json()).then(data => setbooks(data))
    },[])
  return (
    <div>
        <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}

export default FavouriteBooks