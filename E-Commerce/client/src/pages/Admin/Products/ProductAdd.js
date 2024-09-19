import { createProduct } from '../../../globals/Network';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import { message } from 'antd';
import validations from './Validation.js';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

function ProductAdd() {

    const queryClient = useQueryClient();
    const history = useNavigate();

    const newProductMutation = useMutation(createProduct, {
        onSuccess: (values) => {
            // Silinen ürünün bulunduğu sayfanın verilerini yeniden yükle
            queryClient.refetchQueries(['admin-products']);
            message.success({
                content: 'The product successfully Save',
                key: 'product_save',
                duration: 2,
            })
            history('/admin/products');
        },
        onError: () => {
            message.error('Ürün eklenirken bir hata oluştu!');
        },
        // onSuccess: () => queryClient.invalidateQueries("admin-products")
    });


    return (
        <div>
            <Text fontSize="2xl">Edit Product</Text>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    photos: [], // Eğer data.photos yoksa boş array tanımlıyoruz
                }}
                validateOnChange={false}
                validationSchema={validations.newValidations}
                onSubmit={async (values) => {
                    message.loading({ content: 'Loading...', key: 'product_save' })
                    try {
                        newProductMutation.mutate(values)
                    } catch (error) {
                        message.error('The product does not save!')
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
                    <Box my="2" textAlign="left" p="5">
                        <form onSubmit={handleSubmit}>
                            <Grid templateColumns="repeat(6, 1fr)" >
                                <GridItem colSpan={3} mb='3'>
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
                                <GridItem colSpan={3} mb='3' ml="4">
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
                                    <FormControl mt='5' mb='3'>
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
                                Save Product
                            </Button>
                        </form>
                    </Box>
                )}
            </Formik>
        </div>
    );
}

export default ProductAdd;
