import { useEffect } from 'react';
import './User.scss';
import { useNavigate } from 'react-router-dom';

function User(props) {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            alo
        </>
    );
}

export default User;