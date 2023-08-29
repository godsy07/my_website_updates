import React, { lazy, Suspense, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { useAuth } from "../auth/AuthContext"
import { Col, Row, Spinner } from 'react-bootstrap'
import SideBar from '../sidebar/SideBar'
import Swal from 'sweetalert2'

const LazyOutletWrapper = lazy(() => import("../wrapper/OutletWrapper"))

const ProtectedRoutes = (props) => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies("my_api_token");
    
    const { userLogin, userLogout } = useAuth();

    useEffect(() => {
        // Check if user is logged in or not, else redirect then to Dashboard
        if (cookies.my_api_token) {
            const token = cookies.my_api_token !== "undefined" ? cookies.my_api_token : null;
            if (token) {
                const decoded = jwtDecode(token);
                if (decoded) {
                    if (decoded.exp * 1000 < Date.now()) {
                        // Token expired
                        userLogout();
                        removeCookie("my_api_token")
                        navigate("/admin_login")
                    } else {
                        // Save authenticated Details
                        userLogin(decoded);
                    }
                } else {
                    userLogout();
                    navigate("/admin_login")
                }
            } else {
                userLogout();
                navigate("/admin_login")
            }
        } else {
            userLogout();
            navigate("/admin_login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleLogoutUser = async() => {
        const confirm_logout = await Swal.fire({
            title: 'Do you really want to logout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Logout'
        });
        if (!confirm_logout.isConfirmed) return;

        userLogout();
        removeCookie("my_api_token")
        navigate("/admin_login")
    }

  return (
    <main className='main-div'>
        <Row className='p-0 m-0'>
            <Col md={3} lg={2} className='p-0 m-0 d-none d-sm-none d-md-block d-lg-block bg-info' style={{ minHeight: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
                <SideBar logoutUser={handleLogoutUser} />
            </Col>
            <Col xs={12} sm={12} md={9} lg={10} className='p-0 m-0'>
                <Suspense fallback={<div><Spinner animation='border' /></div>}>
                    <LazyOutletWrapper {...props} />
                </Suspense>
            </Col>
        </Row>
    </main>
  )
}

export default ProtectedRoutes
