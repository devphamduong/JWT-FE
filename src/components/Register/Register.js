import { useState, useEffect } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/userService';

function Register(props) {
    const initialFormInputs = {
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };
    const defaultValidInputs = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    };
    const [formData, setFormData] = useState(initialFormInputs);
    const [checkInputs, setCheckInputs] = useState(defaultValidInputs);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const isValidInputs = () => {
        const { email, phone, password, confirmPassword } = formData;

        const newCheckInputs = { ...defaultValidInputs };
        if (!email) {
            newCheckInputs.isValidEmail = false;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            setCheckInputs({ ...newCheckInputs, isValidEmail: false });
            return false;
        }
        if (!phone) {
            newCheckInputs.isValidPhone = false;
        }
        if (!password) {
            newCheckInputs.isValidPassword = false;
        }
        if (!confirmPassword || password !== confirmPassword) {
            newCheckInputs.isValidConfirmPassword = false;
            toast.error("Passwords do not match");
        }

        if (!email || !phone || !password || !confirmPassword) {
            toast.error("All fields are required");
            setCheckInputs(newCheckInputs);
            return false;
        }

        setCheckInputs(newCheckInputs);
        return true;
    };

    const handleRegister = async () => {
        let isValid = isValidInputs();
        if (isValid) {
            const { email, phone, password, username } = formData;
            let response = await registerUser(email, phone, password, username);
            let data = response.data;
            if (+data.EC === 0) {
                toast.success(data.EM);
                navigate('/login');
            } else {
                toast.error(data.EM);
            }
        }
    };

    const handleChangeInputs = (key, value) => {
        setFormData({
            ...formData, [key]: value,
        });
    };

    useEffect(() => {

    }, []);

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
                            <input className={checkInputs.isValidEmail ? 'form-control' : 'form-control is-invalid'} type='text' value={formData.email} onChange={(event) => handleChangeInputs('email', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input className='form-control' type='text' value={formData.username} onChange={(event) => handleChangeInputs('username', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone number</label>
                            <input className={checkInputs.isValidPhone ? 'form-control' : 'form-control is-invalid'} type='text' value={formData.phone} onChange={(event) => handleChangeInputs('phone', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input className={checkInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'} type='password' value={formData.password} onChange={(event) => handleChangeInputs('password', event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Re-enter password</label>
                            <input className={checkInputs.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} type='password' value={formData.confirmPassword} onChange={(event) => handleChangeInputs('confirmPassword', event.target.value)}></input>
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