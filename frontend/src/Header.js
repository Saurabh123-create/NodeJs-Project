import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(){
    
    return(
        <div className='header'>
            <Link className='headertext' to={'/'}>Home</Link>
            <Link className='headertext' to={'/about'}>About</Link>
            <Link className='headertext' to={'/contact'}>Contact Us</Link>
            <Link className='headertext' to={'/signUp'}>Sign Up</Link>
        </div>
    )
}