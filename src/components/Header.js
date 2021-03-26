import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)
  const dispatch = useDispatch()

  function logoutHandler() {
    console.log('logging user out')
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>BVBookstore</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.email} id='email'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.is_superuser && (
                <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/books/add'>
                    <NavDropdown.Item>Add new book</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>View users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>View orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <SearchBox></SearchBox>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
