import React from 'react'
import './styles.css';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';

function Navbar() {

    const { loggedIn, logout } = useAuth();
    const { items } = useBasket();

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
                        {
                            items.length > 0 && (
                                <Link to='/basket'>
                                    <Button colorScheme='pink' variant='outline'>
                                        Basket ({items.length})
                                    </Button>
                                </Link>
                            )
                        }
                        <Link to='/profile'>
                            <Button mr='2' ml='1'>Profile</Button>
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