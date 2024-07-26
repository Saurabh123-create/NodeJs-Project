import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';

export default function Routing(){
    return(
        <Routes>
            <Route  path={'/'} element={<Home/>}/>
            <Route  path={'/about'} element={<About/>}/>
            <Route  path={'/signUp'} element={<SignUp/>}/>
        </Routes>
    )
}