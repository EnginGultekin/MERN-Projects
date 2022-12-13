import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Container, Row, Col, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { register } from '../axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



function SignuUpScreen() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password === formData.passwordConfirm) {
            register(formData)
                .then((res) => toast.success(res.data.message))
                .catch((error) => toast.error(error.response.data.message))
            navigate('/signIn')
        } else {
            toast.error('Passwords are Different')
        }
    }

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (formData.password.length >= 6 &&
            formData.fullname.length >= 3 &&
            formData.phoneNumber.length >= 13 &&
            formData.email.length >= 12) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [formData])

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User Fullname</Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname"
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" placeholder="Enter password confirm"
                                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <PhoneInput country={'tr'}
                                placeholder="enter phone number"
                                onChange={(phone) => setFormData({ ...formData, phoneNumber: `+${phone}` })}
                                enableSearch={true}
                                countryCodeEditable={false}
                                masks={{ tr: '(...) ... - .. - ..' }}>
                            </PhoneInput>
                        </Form.Group>
                        <Button variant="primary mt-3" type="submit" size='lg'
                            disabled={disabled}>Sign Up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignuUpScreen