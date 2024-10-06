import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Import bcrypt for password comparison
import { supabase } from '../api/supabaseClient'; // Adjust the path based on your folder structure
import './login.css'; // Include your CSS styles

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Add 'login-page' class to body when the component mounts
        document.body.classList.add('login-page');

        // Clean up: remove the class when the component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Fetch the user from the Supabase database using the entered email (username in this case)
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username) // Assuming username is the email
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            setError('Invalid email or password');
            return;
        }

        if (user && user.password === password) {
            // Store the username in localStorage after login
            localStorage.setItem('username', user.firstName);
            // Passwords match, proceed with login
            navigate('/dashboard');
        } else {
            // Invalid login credentials
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="loginheader">
                <h1>INVENTORY MANAGEMENT SYSTEM</h1>
            </div>
            <br />
            <br />
            <br />
            <div className="loginbody">
                <form onSubmit={handleLogin}>
                    <div className="logininput">
                        <label htmlFor="username">username</label> {/* Assuming username is the email */}
                        <input 
                            id="username" 
                            placeholder="Enter your email" 
                            type="text" // Changed to 'email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="logininput">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            placeholder="Enter your password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                    <div className="loginbutton">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
