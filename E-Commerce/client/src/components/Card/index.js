import { Box, Image, Button } from "@chakra-ui/react";
import moment from 'moment';
import { Link } from "react-router-dom";

function Card({ item }) {
    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="3">
            <Link to={`/product/${item._id}`}>
                <Image borderRadius='lg' src={item.photos[0]} alt='product' loading="lazy" />
                <Box p="6">
                    <Box d="plex" alignItems="baseline">
                        {moment(item.creatAt).format("DD/MM/YYYY")}
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        {item.title}
                    </Box>
                    <Box>{item.price} TL</Box>
                </Box>
            </Link>

            <Button colorScheme="pink">Add to basket</Button>
        </Box>
    )
}

export default Card



/*
import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card() {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }
    return (
        <Box maxW='lg'  borderColor='red' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Link to='#/'>
                <Image src={property.imageUrl} alt={property.imageAlt} />

                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            New
                        </Badge>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        >
                            {property.beds} beds &bull; {property.baths} baths
                        </Box>
                    </Box>

                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        {property.title}
                    </Box>

                    <Box>
                        {property.formattedPrice}
                        <Box as='span' color='gray.600' fontSize='sm'>
                            / wk
                        </Box>
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <div
                                    key={i}
                                    color={i < property.rating ? 'teal.500' : 'gray.300'}
                                />
                            ))}
                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                            {property.reviewCount} reviews
                        </Box>
                    </Box>
                </Box>
            </Link>
            <Button> Add to basket</Button>
        </Box>
    )
}



*/