import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import Signup from '../Auth/Signup/index.js';
import Signin from '../Auth/Signin/index.js';
import Navbar from '../../components/Navbar/index.js'
import Products from '../Products/index.js';
import ProductDetails from '../Product_Details/index.js';
import ProtectedProfileRoute from './ProtectedProfileRoute.js';
import Basket from '../Basket/index.js';
import Error404 from '../Error404/index.js';
import Admin from '../Admin/index.js';



function Routers() {
    const { user } = useAuth();
    const auth = (element) => (user?.role !== 'admin' ? <Navigate to={'/'} /> : element);
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
                    <Route path='/admin/*' element={auth(<Admin />)} />
                    <Route path='/basket' element={<Basket />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
            </div>
        </>
    )
}

export default Routers