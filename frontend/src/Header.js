import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Header(){
    const navigate = useNavigate()
    let auth = localStorage.getItem("signup user")
    function logout(){
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div className='header'>
            <Link className='headertext' to={'/'}>Home</Link>
            <Link className='headertext' to={'/about'}>About</Link>
            <Link className='headertext' to={'/contact'}>Contact Us</Link>
            {auth?
            <Link className='headertext' onClick={logout} to={'/signup'}>Logout</Link>
            :
            <Link className='headertext' to={'/signup'}>Sign Up</Link>
            }
        </div>
    )
}