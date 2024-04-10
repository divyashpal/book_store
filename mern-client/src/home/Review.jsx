import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

//react icons
import { FaStar } from 'react-icons/fa6';
import { Avatar } from 'flowbite-react';
import proPic from "../assets/profile.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-14'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
              <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>


              {/* text */}
              <div className='mt-7'>
                <p className='mb-5'>"Absolutely love this book store! The selection is vast and diverse, catering to every taste and interest. The website is easy to navigate, and the ordering process is seamless. Plus, their customer service is top-notch, always going above and beyond to ensure customer satisfaction. Highly recommend!"</p>
                <Avatar img={proPic} alt="avatar of Jese" rounded  className='w-10 mb-4'/>
                <h5 className='text-lg font-medium'>Mark Ping</h5>
                <p className='text-base'>Verified buyer</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
              <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>


              {/* text */}
              <div className='mt-7'>
                <p className='mb-5'>"This online book store is a hidden gem! Not only do they offer an extensive collection of books, but they also feature insightful reviews and recommendations that help me discover new reads. I appreciate the attention to detail and the personalized touch they bring to every order. It's evident that they're passionate about books and dedicated to serving their customers."</p>
                <Avatar img={proPic} alt="avatar of Jese" rounded  className='w-10 mb-4'/>
                <h5 className='text-lg font-medium'>Maria James</h5>
                <p className='text-base'>Verified Buyer</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
              <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>


              {/* text */}
              <div className='mt-7'>
                <p className='mb-5'>"This online book store is a hidden gem! Not only do they offer an extensive collection of books, but they also feature insightful reviews and recommendations that help me discover new reads. I appreciate the attention to detail and the personalized touch they bring to every order. It's evident that they're passionate about books and dedicated to serving their customers."</p>
                <Avatar img={proPic} alt="avatar of Jese" rounded  className='w-10 mb-4'/>
                <h5 className='text-lg font-medium'>James Dung</h5>
                <p className='text-base'>Verfied Buyer</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
              <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>


              {/* text */}
              <div className='mt-7'>
                <p className='mb-5'>"I stumbled upon this book store while searching for a specific title, and I'm so glad I did! Not only did they have the book I was looking for, but I also found myself browsing their curated selections and discovering so many other intriguing titles along the way. The checkout process was smooth, and my order arrived promptly and well-packaged."</p>
                <Avatar img={proPic} alt="avatar of Jese" rounded  className='w-10 mb-4'/>
                <h5 className='text-lg font-medium'>Josh Dune</h5>
                <p className='text-base'>Verified Buyer</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
              <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>


              {/* text */}
              <div className='mt-7'>
                <p className='mb-5'>"As an avid reader, I've tried many online book stores, but none compare to this one. The user interface is intuitive, making it easy to find what I'm looking for or explore new genres. I appreciate the attention to diversity in their book offerings, ensuring representation for all readers."</p>
                <Avatar img={proPic} alt="avatar of Jese" rounded  className='w-10 mb-4'/>
                <h5 className='text-lg font-medium'>Mark Broad</h5>
                <p className='text-base'>Verified Buyer</p>
              </div>
            </div>
          </SwiperSlide>
         
        </Swiper>
      </div>
    </div>
  )
}

export default Review