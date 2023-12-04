import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../axios';
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext';

function SignInScreen() {

  const {setUser} = useUser()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    setUser(formData)
    login(formData)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success(res.data.message)
        console.log(res.data.user)
        navigate('/')
      })
      .catch((e) => toast.error(e.response.data.message))
  }

  const emailChange = (e) => {
    setFormData({ ...formData, email: e.target.value })
  }
  const passwordChange = (e) => {
    setFormData({ ...formData, password: e.target.value })
  }

  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
            </Form.Group>

            <Form.Group className="d-grid gap-2">
              <Button variant="primary" size="lg" type='submit'
                disabled={formData.email === '' || formData.password === ''}>Sign In</Button>
              <Form.Text className='mt-3 text-end'>I don't have an account
                <Link to='/signUp' className='text-decoration-none px-2'>SignUp</Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInScreen