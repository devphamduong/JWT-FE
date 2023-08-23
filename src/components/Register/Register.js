import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const initialState = {
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };
    const [formData, setFormData] = useState(initialState);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        let userData = formData;
        console.log(userData);
    };

    const handleChangeInput = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className='register-container py-3 d-flex justify-content-center align-items-center'>
            <div className='container'>
                <div className='row align-items-center px-3 px-sm-0'>
                    <div className='col-12 d-none col-sm-7 d-sm-block content-left'>
                        <div className='brand'>DuongPC</div>
                        <div className='details'>Learn everything....</div>
                    </div>
                    <div className='col-12 col-sm-5 content-right d-flex flex-column gap-2 py-3'>
                        <div className='brand d-sm-none d-block'>DuongPC</div>
                        <div className="form-group">
                            <label className="form-label">Email address</label>
                            <input className='form-control' type='text' value={formData.email} onChange={(event) => handleChangeInput('email', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input className='form-control' type='text' value={formData.username} onChange={(event) => handleChangeInput('username', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone number</label>
                            <input className='form-control' type='text' value={formData.phone} onChange={(event) => handleChangeInput('phone', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input className='form-control' type='password' value={formData.password} onChange={(event) => handleChangeInput('password', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Re-enter password</label>
                            <input className='form-control' type='password' value={formData.confirmPassword} onChange={(event) => handleChangeInput('confirmPassword', event.target.value)}></input>
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr></hr>
                        <div className='text-center'><button className="btn btn-success" onClick={() => handleLogin()}>Already have an account?</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;