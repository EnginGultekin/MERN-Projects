import { Box, Button, Flex, FormControl, FormLabel, Input, Alert, Heading } from '@chakra-ui/react'
import { useFormik } from 'formik';
import validations from './validations';
import { fetchLogin } from '../../../globals/Network';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signin() {

  const { login } = useAuth();
  const history = useNavigate();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin(values);
        login(loginResponse);

        history('/profile');
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
            <Heading>Sign In</Heading>
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

              <Button width='full'  mt='4' type='submit'>Sign In</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin
