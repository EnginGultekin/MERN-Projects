import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function SignInScreen() {
  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Form.Group className="d-grid gap-2">
              <Button variant="primary" size="lg">Submit</Button>
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