import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from '../Auth/Signup/index.js';
import Signin from '../Auth/Signin/index.js';
import Navbar from '../../components/Navbar/index.js'
import Page404 from '../404.js';
import Products from '../Products/index.js';
import ProductDetails from '../Product_Details/index.js';
import ProtectedProfileRoute from './ProtectedProfileRoute.js';



function Routers() {
    return (
        <>
            <Navbar />
            <div id='content'>
            <Routes>
                <Route path='/' element={<Products home={true} />} />
                <Route path='/product/:product_id' element={< ProductDetails />} />
                <Route path='/signin' element={< Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<ProtectedProfileRoute />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
            </div>
        </>
    )
}

export default Routers