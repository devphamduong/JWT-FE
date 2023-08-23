import './Register.scss';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
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
                            <label class="form-label">Email address</label>
                            <input className='form-control' type='text'></input>
                        </div>
                        <div className="form-group">
                            <label class="form-label">Username</label>
                            <input className='form-control' type='text'></input>
                        </div>
                        <div className="form-group">
                            <label class="form-label">Phone number</label>
                            <input className='form-control' type='text'></input>
                        </div>
                        <div className="form-group">
                            <label class="form-label">Password</label>
                            <input className='form-control' type='password'></input>
                        </div>
                        <div className="form-group">
                            <label class="form-label">Re-enter password</label>
                            <input className='form-control' type='password'></input>
                        </div>
                        <button className='btn btn-primary'>Register</button>
                        <hr></hr>
                        <div className='text-center'><button class="btn btn-success" onClick={() => handleLogin()}>Already have an account?</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;