import React, { useEffect, useState } from 'react'

import './App.css'
import { useSelector } from 'react-redux';
import Dashboard from './views/dashboard/Dashboard';
import UserDetail from './views/userDetail/UserDetail';
import EmployeeOverview from './views/employeeOverview/EmployeeOverview';
import Login from './views/login/Login';
import UserOverview from './views/userOverview/UserOverview';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showEmployeeOverview, setShowEmployeeOverview] = useState(true);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showUserOverview, setShowUserOverview] = useState(false);
  const isUserLoggedIn = useSelector((state: any) => state.auth.isSignedIn);
  const userRole = useSelector((state: any) => state.auth.role);

  useEffect(() => {
    if (isUserLoggedIn && showEmployeeOverview) {
      setShowDashboard(false);
      setShowUserOverview(false);
      setShowUserDetail(false);
      setShowEmployeeOverview(true);
    } else if (isUserLoggedIn && showDashboard) {
      setShowDashboard(true);
      setShowUserOverview(false);
      setShowUserDetail(false);
      setShowEmployeeOverview(false);
    } else if (isUserLoggedIn  && showUserDetail) {
      setShowDashboard(false);
      setShowUserOverview(false);
      setShowEmployeeOverview(false);
      setShowUserDetail(true);
    } else if (isUserLoggedIn && showUserOverview) {
      setShowDashboard(false);
      setShowEmployeeOverview(false);
      setShowUserDetail(false);
      setShowUserOverview(true);
    }


  }, [showDashboard, showEmployeeOverview, showUserDetail, showUserOverview])


  useEffect(() => {
    if (isUserLoggedIn) {
      setShowDashboard(true);
      setShowEmployeeOverview(false);
      setShowUserOverview(false);
    }

  }, [isUserLoggedIn])

  return (
    <>
      {
        isUserLoggedIn && showEmployeeOverview && !showDashboard ?
          <EmployeeOverview setShowDashboard={setShowDashboard}
            setShowEmployeeOverview={setShowEmployeeOverview}
            setShowUserOverview={setShowUserOverview} />
          : null
      }
      {
        isUserLoggedIn && showDashboard && !showEmployeeOverview ?
          <Dashboard setShowDashboard={setShowDashboard}
            setShowUserDetail={setShowUserDetail}
            setShowEmployeeOverview={setShowEmployeeOverview}
            setShowUserOverview={setShowUserOverview} />
          : null
      }
      {
        isUserLoggedIn && showUserDetail ?
          <UserDetail setShowDashboard={setShowDashboard}
            setShowUserDetail={setShowUserDetail}
            setShowUserOverview={setShowUserOverview} />
          : null
      }
            {
        isUserLoggedIn && showUserOverview ?
          <UserOverview setShowDashboard={setShowDashboard}
            setShowEmployeeOverview={setShowEmployeeOverview}
            setShowUserOverview={setShowUserOverview} />
          : null
      }
      {
        !isUserLoggedIn ? <Login /> : null
      }
    </>
  )
}

export default App
