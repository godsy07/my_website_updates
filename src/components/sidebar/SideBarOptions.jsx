import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { FaSignInAlt } from 'react-icons/fa'

const SideBarOptions = ({ logoutUser }) => {
  return (
    <>
        <Nav.Link as={Button} className='mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded'>
            Hello
        </Nav.Link>
        <Nav.Link as={Button} className='mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded' onClick={logoutUser}>
            <FaSignInAlt className='me-2' />
            Logout
        </Nav.Link>
    </>
  )
}

export default SideBarOptions
