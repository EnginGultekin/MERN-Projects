import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div>
      <h2> Page Not Found</h2>
      <Link to='/'>Go Home Page</Link>
    </div>
  )
}

export default Page404