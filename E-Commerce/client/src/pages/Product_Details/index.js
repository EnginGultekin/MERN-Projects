import React from 'react'
import { useQuery } from 'react-query';
import Loading from '../../globals/Loading';
import { fetchProduct } from '../../globals/Network';
import { useParams } from 'react-router-dom';
import { Box, Button, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';

function ProductDetails() {

  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["products", product_id], () => fetchProduct(product_id));

  if (isLoading) return <Loading />
  if (error) return "An error has occurred" + error.message;


  const images = data.photos.map((url) => ({ original: url, thumbnail: url }))

  return (
    <div>
      <Box w='100%' p={4}>
        <Grid
          templateColumns='repeat(12, 1fr)'>

          <GridItem colSpan={1} >
            <Button colorScheme='pink'>Add to Basket</Button>
            <Text style={{margin:'20px'}}>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
          </GridItem>
          <GridItem colStart={3} colEnd={8}>
            <Center>
              <ImageGallery
                items={images}
                startIndex={0}
                autoPlay={true}
                slideInterval={2000}
                slideDuration={450}
                thumbnailPosition='left'
                infinite={true}
                showFullscreenButton={true}
                showPlayButton={false}
                showBullets={true}
                showNav={true}
                showThumbnails={true}
                showIndex={false}
                isRTL={false}
                useTranslate3D={true}
                lazyLoad={true} />
            </Center>
          </GridItem>
          <GridItem colStart={9} colEnd={12}>
            <Text>
              {data.description}
            </Text>
          </GridItem>
        
        </Grid>

      </Box>
    </div>
  )
}

export default ProductDetails