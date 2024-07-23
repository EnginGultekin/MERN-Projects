import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { Component } from 'react'

export class Signin extends Component {
  render() {
    return (
      <div>
        <Flex align='center' width='full' justifyContent='center'>
          <Box pt={10}>
            <Box my={5} textAign='left'>
              <form onSubmit={() => { }}>
                <FormControl>
                  <FormLabel>E-mail</FormLabel>
                  <Input name='email'/>
                </FormControl>

                <FormControl mt='4'>
                  <FormLabel>Password</FormLabel>
                  <Input name='password' type='password'/>
                </FormControl>

                <FormControl mt='4'>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input name='confirmPassword' type='password'/>
                </FormControl>

                <Button mt='5' width='full' type='submit'>Sign Up</Button>
              </form>
            </Box>
          </Box>
        </Flex>

      </div>
    )
  }
}

export default Signin