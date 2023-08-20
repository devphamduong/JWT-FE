import { NavLink } from 'react-router-dom';
import './Nav.scss';

function Nav(props) {
    return (
        <div className="topnav">
            <NavLink className='nav-link' to={'/'}>Home</NavLink>
            <NavLink className='nav-link' to={'/news'}>News</NavLink>
            <NavLink className='nav-link' to={'/contact'}>Contact</NavLink>
            <NavLink className='nav-link' to={'/about'}>About</NavLink>
            <NavLink className='nav-link' to={'/login'}>Login</NavLink>
        </div>
    );
}

export default Nav;