import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from '../Auth/Signup/index.js';
import Signin from '../Auth/Signin/index.js';
import Navbar from '../../components/Navbar/index.js'
import Page404 from '../404.js';
import Main from '../Main/index.js';

function Routers() {
    return (
        <>
            <Navbar />
            <div id='content'>
            <Routes>
                <Route path='/' element={<Main home={true} />} />
                <Route path='/signin' element={< Signup />} />
                <Route path='/signup' element={<Signin />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
            </div>
        </>
    )
}

export default Routers