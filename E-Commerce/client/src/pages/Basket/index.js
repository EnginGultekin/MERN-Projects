import React from 'react'
import { useBasket } from '../../context/BasketContext';
import { Alert, Box, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Basket() {

    const { items, removefromBasket } = useBasket();

    // (accumulator, obje ve başlangıç değeri)
    const totalPrice = items.reduce((acc, obj) => acc + obj.price, 0);



    return (
        <Box p='5'>
            {
                items.length < 1 &&
                <Alert status='warning'>You have not any items in your basket</Alert>
            }
            {
                items.length > 0 &&
                <>
                    <ul style={{ listStyleType: 'decimal' }}>
                        {items.map((item) => (
                            <li key={item._id} style={{ marginBottom: '15px' }}>
                                <Link to={`/product/${item._id}`}>
                                    <Text mb={1} fontSize='18'>{item.title} - {item.price}$</Text>
                                    <Image
                                        src={item.photos[0]}
                                        alt='Basket item'
                                        loading='layz'
                                        htmlWidth={200}
                                    />
                                </Link>
                                <Button mt={2} size='sm' colorScheme='pink' onClick={() => removefromBasket(item._id)}>
                                    Remove from basket
                                </Button>
                            </li>

                        ))}
                    </ul>
                    <Box mt={10}>
                        <Text fontSize={22}>Total: {totalPrice}$</Text>
                    </Box>
                </>
            }
        </Box>
    )
}

export default Basket