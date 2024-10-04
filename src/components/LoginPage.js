import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Include your CSS styles

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Add 'login-page' class to body when the component mounts
        document.body.classList.add('login-page');

        // Clean up: remove the class when the component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Navigate to the dashboard immediately upon clicking the login button
        navigate('/dashboard');
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
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username" 
                            placeholder="username" 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="logininput">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            placeholder="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="loginbutton">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
