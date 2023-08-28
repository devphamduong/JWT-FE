import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';

function Login(props) {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const defaultValidInputs = {
        isValidEmailOrPhone: true,
        isValidPassword: true,
    };
    const [checkInputs, setCheckInputs] = useState(defaultValidInputs);

    const handleCreateNewAccount = () => {
        navigate('/register');
    };

    const handleLogin = async () => {
        const newCheckInputs = { ...defaultValidInputs };
        if (!emailOrPhone) {
            newCheckInputs.isValidEmailOrPhone = false;
        } else if (!password) {
            newCheckInputs.isValidPassword = false;
        }
        if (!emailOrPhone || !password) {
            toast.error("All fields are required");
            setCheckInputs(newCheckInputs);
            return;
        }
        setCheckInputs(newCheckInputs);
        await loginUser(emailOrPhone, password);
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
                        <input placeholder='Email address or phone number' className={checkInputs.isValidEmailOrPhone ? 'form-control' : 'form-control is-invalid'} type='text' value={emailOrPhone} onChange={(event) => setEmailOrPhone(event.target.value)}></input>
                        <input placeholder='Password' className={checkInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'} type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Log in</button>
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