import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return <Navbar  bg="primary" expand="lg">
        <Container>
            <Navbar.Brand>MERN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className='text-white px-3'>Home</Nav.Link>
                    <Nav.Link className='text-white px-3'>announcement</Nav.Link>
                    <NavDropdown title={<span className='text-white px-3' >Project</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item>MERN</NavDropdown.Item>
                        <NavDropdown.Item>Javascript</NavDropdown.Item>
                        <NavDropdown.Item>Bootstrap</NavDropdown.Item>
                        <NavDropdown.Item>React</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>All Project</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Button variant='outline-light'>
                <Link to='/signIn'
                    className='text-white text-decoration-none'
                >Signin</Link>
            </Button>
        </Container>
    </Navbar>

}

export default Header