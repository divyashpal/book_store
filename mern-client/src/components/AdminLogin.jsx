import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            setMessage('Login successful');
            navigate('/admin/dashboard')
        } else {
            setMessage(`Error: ${data.message}`);
        }
    };

    //   return (
    //     <div>
    //       <h2>Login</h2>
    //       <form onSubmit={handleLogin}>
    //         <div>
    //           <label>Username:</label>
    //           <input
    //             type="text"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label>Password:</label>
    //           <input
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         <button type="submit">Login</button>
    //       </form>
    //       {message && <p>{message}</p>}
    //     </div>
    //   );
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Admin Login Form </h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="email" name="email" type="text" value={username} onChange={(e) => setUsername(e.target.value)}className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"  placeholder="Email address" />

                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" value={password}
                                        onChange={(e) => setPassword(e.target.val)} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />

                                </div>

                                {message && <p>{message}</p>}
                                
                                <div className="relative">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2">Log In</button>
                                </div>
                            </form>
                        </div>

                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Adminlogin;
