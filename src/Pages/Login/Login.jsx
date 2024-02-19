import React, { useContext, useState } from 'react'
import "./Login.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
export default function Login() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(loginDataContextProvider);
    const handleFormChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    const handleFormSubmit = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/user/login",
                {
                    regNo: formData.username,
                    password: formData.password
                });
            const data = response.data;
            if (data.status === false) {
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
            else {
                toast.success("Log in success!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                const regNo = formData?.username;
                localStorage.setItem('user', regNo);
                navigate('/map');
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