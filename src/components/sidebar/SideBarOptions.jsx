import React from "react";
import { NavLink } from "react-router-dom";
import { FaImages, FaListAlt, FaSignInAlt, FaUser, FaUsers } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { useAuth } from "../auth/AuthContext";
import { Button, Nav } from "react-bootstrap";

const SideBarOptions = ({ logoutUser }) => {
  const { authUser } = useAuth();

  return (
    <>
      <Nav.Link
        className='mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded'
        style={{ color: '#545e6f', background: '#f0f0f0' }}
      >
        <FaUser className='me-2' />
        Hello, {authUser && authUser.name.split(" ")[0]}
      </Nav.Link>
      <NavLink
        to='/dashboard'
        className="sidebar-nav-item mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#fff',
                background: '#8400dc',
              }
            : { color: '#545e6f', background: '#f0f0f0' }
        }
      >
        <AiFillDashboard className='me-2' />
        Dashboard
      </NavLink>
      <NavLink
        to='/manage-users'
        className="sidebar-nav-item mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#fff',
                background: '#8400dc',
              }
            : { color: '#545e6f', background: '#f0f0f0' }
        }
      >
        <FaUsers className='me-2' />
        Manage Users
      </NavLink>
      <NavLink
        to='/manage-projects'
        className="sidebar-nav-item mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#fff',
                background: '#8400dc',
              }
            : { color: '#545e6f', background: '#f0f0f0' }
        }
      >
        <FaListAlt className='me-2' />
        Manage Projects
      </NavLink>
      <NavLink
        to='/manage-images'
        className="sidebar-nav-item mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#fff',
                background: '#8400dc',
              }
            : { color: '#545e6f', background: '#f0f0f0' }
        }
      >
        <FaImages className='me-2' />
        Manage Images
      </NavLink>
      <Nav.Link
        as={Button}
        className="sidebar-nav-item mx-2 my-1 d-flex justify-content-start align-items-center p-2 w-100 border rounded"
        onClick={logoutUser}
        style={{ color: '#545e6f', background: '#f0f0f0' }}
      >
        <FaSignInAlt className='me-2' />
        Logout
      </Nav.Link>
    </>
  );
};

export default SideBarOptions;
