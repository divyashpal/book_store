import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//react icons
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from '../contects/AuthProvider';



const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isSticky, setisSticky] = useState(false);
    const {user} = useContext(AuthContext);
    console.log(user) 

    // toggle menu
    const toggleMenu = () => {
        setisMenuOpen(!isMenuOpen);
    }

    // Handle logout
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setisSticky(true);
            } else {
                setisSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])

    //navItems
    const navItems = [
        {
            link: "Home", path: "/"
        },
        {
            link: "About", path: "/about"
        },
        {
            link: "Shop", path: "/shop"
        },
        {
            link: "Sell Your Book", path: "/userupload"
        },
        {
            link: "Admin", path: "/adminlogin"
        },
        ...(user ? [{ link: "Logout", path: "/logout", onClick: handleLogout }] : [])
    ]
    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/*logo */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center'><FaBlog className='inline-block' />Chapters & Verse</Link>

                    {/* nav items for large devices */}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
                        }
                    </ul>

                    {/* btn for lg devices */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>
                        {
                            user ? user.email : ""
                        }
                    </div>

                    {/* menu btn for mobile devices */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                </div>

                {/* nav items for sm device */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen? "blog fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                    navItems.map(({ link, path, onClick}) => <Link key={path} to={path} onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : null} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>)
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar