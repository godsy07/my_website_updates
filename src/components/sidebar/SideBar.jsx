import React from 'react'
import { Navbar } from 'react-bootstrap'
import SideBarOptions from './SideBarOptions'

const SideBar = ({ logoutUser }) => {
  return (
    <div className='w-100 h-100'>
      <Navbar className='d-flex flex-column px-2'>
        <SideBarOptions logoutUser={logoutUser} />
      </Navbar>
    </div>
  )
}

export default SideBar
