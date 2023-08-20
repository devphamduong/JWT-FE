import './Login.scss';

function Login(props) {
    return (
        <div className='login-container mt-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7 content-left'>
                        <div className='brand'>DuongPC</div>
                        <div className='details'>Learn everything....</div>
                    </div>
                    <div className='col-md-5 content-right d-flex flex-column gap-2 py-3'>
                        <input placeholder='Email address or phone number' className='form-control' type='text'></input>
                        <input placeholder='Password' className='form-control' type='password'></input>
                        <button className='btn btn-primary'>Log in</button>
                        <div className='text-center'>Forgotten password?</div>
                        <hr></hr>
                        <div className='text-center'><button class="btn btn-success">Create new account</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;