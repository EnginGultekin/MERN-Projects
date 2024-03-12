import React from 'react'
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navbar() {
    return (
        <nav className='nav'>
            <div className='left'>
                <div className='logo'>
                    <Link to='/'>e-Commerce</Link>
                </div>
                <ul className='menu'>
                    <li>
                        <Link to='/'>Product</Link>
                    </li>
                </ul>
            </div>
            <div className='rigth'>
                <Link to='/signin'>
                    <Button colorScheme='pink'>Login</Button>
                </Link>
                <Link to='/signup'>
                    <Button colorScheme='pink'>Register</Button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar