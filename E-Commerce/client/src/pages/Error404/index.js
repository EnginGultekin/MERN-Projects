import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

function Error404() {
  return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='30vh'
      >
        <AlertIcon boxSize='60px' mr={0} />
        <AlertTitle mt={4} mb={2} fontSize='3xl'>
          ERROR 404!
        </AlertTitle>
        <AlertDescription maxWidth='sm' fontSize='xl'>
          This page was not fount
        </AlertDescription>
      </Alert>
  )
}

export default Error404