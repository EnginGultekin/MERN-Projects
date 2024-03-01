import { Container, Spinner } from '@chakra-ui/react'

function Loading() {
    return (
        <Container className='loading-spinner-container'>
            <Spinner
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                thickness='10px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#D53F8C'
            />
        </Container>
    );
}

export default Loading;
