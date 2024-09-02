import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const OtherBooks = () => {
    const [books,setbooks] = useState([]);
    
    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}/all-books`).then(res => res.json()).then(data => setbooks(data.slice(4,80)))
    },[])
  return (
    <div>
        <BookCards books={books} headline="Other Books"/>
    </div>
  )
}

export default OtherBooks