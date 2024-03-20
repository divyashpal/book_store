import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { FaCartArrowDown, FaCartShopping } from 'react-icons/fa6';

const BookCards = ({ headline, books }) => {
    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-5xl text-center font-bold text-black'>
                {headline}
            </h2>

            {/* cards */}
            <div className='mt-12'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full h-full"
                >

                    {
                        books.map(book => <SwiperSlide key={book._id}>
                            <Link to= {`/book/${book._id}`}>
                                <div className='relative'>
                                    <img src={book.imageURL}></img>
                                </div>
                                <div>
                        
                                    <div>
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.bookTitle.length > 20 ? `${book.bookTitle.slice(0, 20)}...` : book.bookTitle}</h3>
                                    <p>{book.authorName}</p>
                                    </div>
                                    <div className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <p>Price - Rs.{book.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default BookCards