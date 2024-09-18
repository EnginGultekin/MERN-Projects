import React from 'react'
import './style.css'
import { Link, Route, Routes, } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Home from './Home';
import Products from './Products';
import Orders from './Orders';
import ProductDetail from './Products/ProductDetail';


function Admin() {

    return (
        <div>
            <nav>
                <ul className='admin-menu'>
                    <li>
                        <Link to="/admin">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products">
                            Product
                        </Link>
                    </li>
                </ul>
            </nav>

            <Box mt='10'>
                <Routes>
                    <Route path="/" element={<Home home={true} />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:product_id" element={<ProductDetail />} />
                </Routes>
            </Box>
        </div>
    );
}

export default Admin