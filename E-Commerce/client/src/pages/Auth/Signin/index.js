import { Box, Button, Flex, FormControl, FormLabel, Input, Alert, Heading } from '@chakra-ui/react'
import { useFormik } from 'formik';
import validations from './validations';
import { fetchRegister } from '../../../globals/Network';

function Signin() {

  const { handleSubmit, handleChange, handleBlur, handleReset, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister(values);
        console.log(registerResponse);
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box pt={10}>
          <Box textAlign='center'>
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {errors.general && (
              <Alert status='error'>{errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textaign='left'>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name='email'
                  onChange={handleChange}
                  value={values.email}
                  isInvalid={errors.email} />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Password</FormLabel>
                <Input name='password'
                  type='password'
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={errors.password} />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Confirm Password</FormLabel>
                <Input name='confirmPassword'
                  type='password'
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isInvalid={errors.confirmPassword} />
              </FormControl>

              <Button mt='4' width type='submit'>Sign Up</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin
