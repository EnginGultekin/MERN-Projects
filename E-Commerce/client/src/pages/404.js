import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div style={{
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <Text mb="25" >  Page Not Found 404</Text>
        <Link  to='/'>Go Home Page</Link>
      </div>

    </div>
  )
}

export default Page404