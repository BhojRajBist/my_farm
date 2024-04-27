import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Profile from './Profile';
import SendPasswordResetEmail from './auth/SendPasswordResetEmail';
import { ToastContainer} from 'react-toastify';


function Header({ setAuthActive,  SignInState }) {
  
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const [showSendPasswordResetEmail, setshowSendPasswordResetEmail] = useState(false)

  useEffect(() => {
    if(SignInState){
    setShowSignin(SignInState)
    }
   
  }, [SignInState]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setTokenExists(!!token);
  }, [[tokenExists]]);

  const handleSigninClick = () => {
    setShowSignin(true);
    setShowSignup(false);
    setShowProfile(false);
    setshowSendPasswordResetEmail(false)
    setAuthActive(true, 'signin');

  };

  const handleCloseSignin = () => {
    setShowSignin(false);
    setAuthActive(false, null);

  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowSignin(false);
    setShowProfile(false);
    setshowSendPasswordResetEmail(false)
    setAuthActive(true, 'signup');
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowSignin(false);
    setShowSignup(false);
    setshowSendPasswordResetEmail(false)
    setAuthActive(true, 'signup');
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
    setAuthActive(false, null);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setAuthActive(false, null);
  };

  const ForgetPasswordClick =() =>{
    setshowSendPasswordResetEmail(true)
    setShowSignup(false);
    setShowSignin(false);
    setShowProfile(false);
    setAuthActive(true, 'ForgetPassword');
  }
 const handleCloseForgetPassword=()=>{
  setshowSendPasswordResetEmail(false)
  setAuthActive(false, null);

  }

  return (
    <div className="header-container">
      <Link to="/" className="logo-container">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        Logo here
      </Link>
      <div className="auth-buttons">
        {!tokenExists && (
          <>
            <button className="auth-button sign-in-button" onClick={handleSigninClick}>
              <i className="fa fa-sign-in"></i> Sign In
            </button>
            <span> or </span>
            <button className="auth-button sign-up-button" onClick={handleSignupClick}>
              <i className="fa fa-user-plus"></i> Sign Up
            </button>
          </>
        )}
        {tokenExists && (
          <button className="auth-button sign-up-button" onClick={handleProfileClick}>
            <i className="fa fa-user"></i> View Profile
          </button>
        )}
      </div>
      {showSignin&& <Signin onClose={handleCloseSignin} onSignupClick={handleSignupClick} onForgetPasswordClick={ForgetPasswordClick} />}
      {showSignup && <Signup onClose={handleCloseSignup} onSigninClick={handleSigninClick} />}
      {showSendPasswordResetEmail && <SendPasswordResetEmail onClose={handleCloseForgetPassword} />}
      {tokenExists && showProfile && <Profile onClose={handleCloseProfile} />}
      <ToastContainer position="top-center" /> {/* Add this line to display toast notifications */}
    </div>
  );
}

export default Header;
