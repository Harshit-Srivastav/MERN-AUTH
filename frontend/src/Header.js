import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import {Outlet, Link, NavLink, useNavigate} from 'react-router-dom'
import './App.css'
import { deleteUser } from './reducers/userReducer.js';

function Header() {
  const token = localStorage.getItem('token')
  const name = useSelector((state) => state.users.name)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleLogout() {
    localStorage.removeItem('token')
    dispatch(deleteUser())
    navigate('/login')
  }
  return (
    <>
    <Navbar bg="primary" variant="dark" >
      <Container>
        <Navbar.Brand href="#home">Amaze Us</Navbar.Brand>
            <Nav className="me-auto">
               {!token && !name ? <div> <Link to='/registration' style={{color:'white', textDecoration: 'none', margin: '25px'}}>Sign Up </Link>
               <NavLink to='/login' style={{color:'white', textDecoration: 'none', margin: 10}} > Login</NavLink></div>: <div>
               <NavLink to='/changePassword' style={{color:'white', textDecoration: 'none', margin: 12}} >Change Password</NavLink>
               <NavLink to='/dashboard' style={{color:'white', textDecoration: 'none', margin: 12}} >Dashboard</NavLink>
                <Button onClick={() => handleLogout()} className='mb-1.8' variant='outline-success'>Logout</Button>
                </div>}
              {/* <Link to='/registration' style={{color:'white', textDecoration: 'none', margin: 10}}>Sign Up </Link>
               <NavLink to='/login' style={{color:'white', textDecoration: 'none', margin: 10}} > Login</NavLink> */}
                {/* <Nav.Link href="#pricing">Products</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Outlet/>
      </>
  );
}

export default Header;