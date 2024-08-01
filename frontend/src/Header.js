import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Header(){
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location,'loca')
    let auth = localStorage.getItem("signup user")
    function logout(){
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div className='header'>
            {auth?
            <>
            <Link className='headertext' to={'/'}>Home</Link>
            <Link className='headertext' to={'/products'}>Products</Link>
            <Link className='headertext' to={'/contact'}>Contact Us</Link>
            <Link className='headertext' onClick={logout} to={'/signup'}>Logout</Link>
            </>
            :
            <>
            {location.pathname == '/login' ?
             <Link className='headertext' to={'/signup'}>Sign Up</Link> :
            <Link className='headertext' to={'/login'}>Login</Link> }
            </>
            }
        </div>
    )
}