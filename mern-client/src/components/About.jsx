import React from 'react'
import book_img from '../assets/awardbooks.png'

const About = () => {
  return (
    <section id="about" className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <p className="text-lg leading-relaxed">
                            Welcome to Chapters & Verse, where book lovers discover their next great read! Founded with a passion for literature and a commitment to bringing the joy of reading to everyone, our bookstore offers an extensive collection of books across genres, from timeless classics to contemporary bestsellers.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            Our mission is to provide book enthusiasts with a seamless online shopping experience, curated book selections, and personalized recommendations. Whether you're seeking a gripping mystery, a thought-provoking literary work, or a heartwarming story, we've got something for every reader.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img src= {book_img} alt="About Us" className="w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About