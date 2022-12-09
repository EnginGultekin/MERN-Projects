import { useState } from 'react'
import { Container, Row, Col, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'



function SignuUpScreen() {


    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'USER', value: '1' },
        { name: 'SUPERUSER', value: '2' },
        { name: 'SUPER', value: '3' },
    ];
    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} md={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Fullname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mt-4">
                            <ButtonGroup>
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}>
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Form.Group>
                        
                        <Button className='mt-5' variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignuUpScreen