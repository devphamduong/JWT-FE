import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Login(props) {
    const navigate = useNavigate();

    useEffect(() => {
        // axios.get("http://localhost:8080/api/testApi")
        //     .then(result => {
        //         console.log(result.data);
        //     });
    }, []);

    const handleCreateNewAccount = () => {
        navigate('/register');
    };

    return (
        <div className='login-container py-3 d-flex justify-content-center align-items-center'>
            <div className='container'>
                <div className='row align-items-center px-3 px-sm-0'>
                    <div className='col-12 d-none col-sm-7 d-sm-block content-left'>
                        <div className='brand'>DuongPC</div>
                        <div className='details'>Learn everything....</div>
                    </div>
                    <div className='col-12 col-sm-5 content-right d-flex flex-column gap-2 py-3'>
                        <div className='brand d-sm-none d-block'>DuongPC</div>
                        <input placeholder='Email address or phone number' className='form-control' type='text'></input>
                        <input placeholder='Password' className='form-control' type='password'></input>
                        <button className='btn btn-primary'>Log in</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgotten password?</a>
                        </span>
                        <hr></hr>
                        <div className='text-center'><button className="btn btn-success" onClick={() => handleCreateNewAccount()}>Create new account</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;