import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../../globals/Network';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import { message } from 'antd';
import validations from './Validation.js';



function ProductDetail() {
    const { product_id } = useParams();
    const { data, error, isError, isLoading } = useQuery(
        ['admin-product', product_id],
        () => fetchProduct(product_id),
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;


    return (
        <div>
            <Text fontSize="2xl">Edit Product</Text>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    photos: data.photos, // Eğer data.photos yoksa boş array tanımlıyoruz
                }}
                validateOnChange={false}
                validationSchema={validations}
                onSubmit={async (values) => {
                    message.loading({ content: 'Loading...', key: 'product_update' })
                    try {
                        await updateProduct(values, product_id)
                        message.success({
                            content: 'The product successfully updated',
                            key: 'product_update',
                            duration: 2,
                        })
                    } catch (error) {
                        message.error('The product does not updated!')
                    }
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting,
                    touched,
                    errors
                }) => (
                    <Box my="5" textAlign="left" p="5">
                        <form onSubmit={handleSubmit}>
                            <Grid templateColumns="repeat(6, 1fr)" >
                                <GridItem colSpan={3} mb='5'>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                            isInvalid={touched.title && errors.title}
                                        />
                                        {touched.title && errors.title && (
                                            <Text mt="1" color='red.500'>{errors.title}</Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={3} mb='5' ml="4">
                                    <FormControl>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                            isInvalid={touched.price && errors.price}
                                        />
                                        {touched.price && errors.price && (
                                            <Text mt="1" color='red.500'>{errors.price}</Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6}>
                                    <FormControl mt='5' mb='5'>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                            isInvalid={touched.description && errors.description}
                                        />
                                        {touched.description && errors.description && (
                                            <Text mt="1" color='red.500'>{errors.description}</Text>
                                        )}
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={6} mt="5" >
                                    <FormControl>
                                        <FormLabel>Photos</FormLabel>
                                        <FieldArray
                                            name="photos"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {values.photos && values.photos.length > 0 &&
                                                        values.photos.map((photo, index) => (
                                                            <div key={index} >
                                                                <Grid templateColumns="repeat(12, 1fr)" mt="3">
                                                                    <GridItem colSpan={11}>
                                                                        <Input
                                                                            name={`photos.${index}`}
                                                                            value={photo}
                                                                            disabled={isSubmitting}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </GridItem>
                                                                    <GridItem colSpan={1} textAlign="end" ml='2'>
                                                                        <Button
                                                                            type="button"
                                                                            padding='20px'
                                                                            colorScheme="red"
                                                                            isLoading={isSubmitting}
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    </GridItem>
                                                                </Grid>
                                                            </div>
                                                        ))}
                                                    <Button
                                                        type="button"
                                                        style={{ padding: '20px 50px' }}
                                                        mt="5"
                                                        mb='5'
                                                        colorScheme="green"
                                                        isLoading={isSubmitting}
                                                        onClick={() => arrayHelpers.push('')}
                                                    >
                                                        Add Image
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                </GridItem>
                            </Grid>

                            <Button
                                type="submit"
                                mt="5"
                                width='full'
                                isLoading={isSubmitting}
                            >
                                Update Product
                            </Button>
                        </form>
                    </Box>
                )}
            </Formik>
        </div>
    );
}

export default ProductDetail;
