import { Container } from '@chakra-ui/react'

function Loading() {
    return (
        <Container maxW='lg'>
            <div className="loading-spinner" />
        </Container>
    );
}

export default Loading;
