import { Box, Image, Button } from "@chakra-ui/react";
import moment from 'moment';
import { Link } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";

function Card({ item }) {

    const { addToBasket, items } = useBasket();

    const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

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

            <Button
                variant='solid'
                colorScheme={findBasketItem ? 'pink' : 'green'}
                onClick={() => addToBasket(item, findBasketItem)}>
                {findBasketItem ? 'Remove to basket' : 'Add to basket'}
            </Button>
        </Box>
    )
}

export default Card