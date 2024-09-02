import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
    const [books,setbooks] = useState([]);
    
    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}/all-books`).then(res => res.json()).then(data => setbooks(data.slice(0,8)))
    },[])
  return (
    <div>
        <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}

export default BestSellerBooks