import React from 'react';
import { Grid, Box, Flex, Button } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { fetchProductList } from '../../globals/Network.js';
import Card from '../../components/Card/index.js';
import Loading from '../../globals/Loading.js';

function Products() {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery("products", fetchProductList,
        {
            getNextPageParam: (lastGroup, allGroups) => {
                const morePagesExist = lastGroup?.length === 6;
                if (morePagesExist) {
                    return allGroups.length + 1;
                }
                return;
            },
        });

    if (status === 'loading') return <Loading />
    if (status === 'error') return <p>An error has occurred  {error.message}</p>;

    return (
        <div>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {/* {data.map((item, key) => (
                    <Card key={key} item={item} />
                ))} */}
                {data.pages.map((group, index) => (
                    <React.Fragment key={index}>
                        {group.map((item) => (
                            <Box w='100%' key={item._id}>
                                <Card item={item} />
                            </Box>
                        ))}
                    </React.Fragment>
                ))
                }
            </Grid>
            <Flex mt="20" mb='20' justifyContent='center'>
                <Button
                    onClick={() => fetchNextPage()}
                    isLoading={isFetching}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...' 
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>
        </div>
    )
}

export default Products