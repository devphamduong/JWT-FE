import { NavLink, useLocation } from 'react-router-dom';
import './Nav.scss';
import { useEffect, useState } from 'react';

function Nav(props) {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false);
        }
    }, [location.pathname]);

    return (
        <>
            {isShow &&
                <div className="topnav">
                    <NavLink className='nav-link' to={'/'}>Home</NavLink>
                    <NavLink className='nav-link' to={'/users'}>Users</NavLink>
                    <NavLink className='nav-link' to={'/projects'}>Projects</NavLink>
                    <NavLink className='nav-link' to={'/about'}>About</NavLink>
                </div>
            }
        </>
    );
}

export default Nav;