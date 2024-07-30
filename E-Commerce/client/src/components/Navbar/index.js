import React from 'react'
import './styles.css';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {

    const { loggedIn, logout } = useAuth();

    const handleClick = ({ history }) => {
        logout(() => {
            history('/');
        })
    }

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
                {loggedIn
                    ?
                    <>
                        <Link to='/profile'>
                            <Button >Profile</Button>
                        </Link>
                        <Link to='/'>
                            <Button
                                colorScheme='pink'
                                variant='solid'
                                onClick={handleClick}>Logout
                            </Button>
                        </Link>
                    </>
                    :
                    <>
                        <Link to='/signin'>
                            <Button colorScheme='pink'>Login</Button>
                        </Link>
                        <Link to='/signup'>
                            <Button colorScheme='pink'>Register</Button>
                        </Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar