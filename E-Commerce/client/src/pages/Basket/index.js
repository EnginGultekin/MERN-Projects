import { useRef, useState } from 'react'
import { useBasket } from '../../context/BasketContext';
import {
    Alert,
    Box,
    Button,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { postOrder } from '../../globals/Network';

function Basket() {
    const { items, removefromBasket, emptyBasket } = useBasket();

    const [address, setAddress] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)

    // (accumulator, obje ve başlangıç değeri)
    const totalPrice = items.reduce((acc, obj) => acc + obj.price, 0);

    const handleSubmit = async () => {
        const itemsIds = items.map((item) => item._id);

        const input = {
            address,
            items: itemsIds,
        }

        const reponse = await postOrder(input);
        if (reponse.status === 201) {
            emptyBasket();
            onClose();
        }
    }

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

                    <Button mt='2' size='sm' colorScheme='green' onClick={onOpen}>
                        Order
                    </Button>
                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Products</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea ref={initialRef}
                                        placeholder='Enter Address'
                                        onChange={(e) => setAddress(e.target.value)}
                                        name='address'
                                        value={address} />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }
        </Box>
    )
}

export default Basket