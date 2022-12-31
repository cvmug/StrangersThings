import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Title.css';
import Login from './Login/Login';

export default function Title() {
  return (
      <div className="Title">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Stranger's Things</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
