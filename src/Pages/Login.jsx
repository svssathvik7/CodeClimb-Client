import React, { useState } from 'react'
import "./Login.css";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleFormChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const handleFormSubmit = async () => {
        try {
            const response = (await axios.post("http://localhost:3001/api/user/login/",
                {
                    regNo: formData.username,
                    password: formData.password
                }).data);
            if (response.status === false) {
                toast.error("Login failed!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Login failed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <div className='login-page'>
            <div className='login-controller'>
                <div>
                    <h1>Login</h1>
                    <input className='login-inputs' name='username' type='text' placeholder='Enter RegdNo' value={formData.username} onChange={handleFormChange} />
                    <input className='login-inputs' value={formData.password} name='password' type='password' onChange={handleFormChange} placeholder='Enter password' />
                    <button onClick={handleFormSubmit} type='submit' className='login-btn'>Login</button>
                </div>
            </div>
        </div>
    )
}