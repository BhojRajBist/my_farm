import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling toast notifications
import './Signin.css';

function Signin({ onClose, onSignupClick, onForgetPasswordClick }) {
  const [serverError, setServerError] = useState({});
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      console.log('Submitting login form...');
      const response = await loginUser({ email, password });
      console.log('Response received:', response);

      if (response.error) {
        console.error('Error during login:', response.error);
        setServerError(response.error.data.errors);
        toast.error('Login failed. Please check your credentials.'); // Display error toast
      } else {
        console.log('Login successful:', response.data);
        const token = response.data.token;
        console.log('Access token:', token);
        storeToken(token);
        dispatch(setUserToken({ access_token: token }));
        console.log('Redirecting to dashboard...');
        handleCloseClick(); // Close the sign-in component
        toast.success('Login successful!'); // Display success toast
        navigate('/')
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred. Please try again later.'); // Display error toast
    }
  };

  const handleCloseClick = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  const handleSignupButtonClick = () => {
    onSignupClick(); // Call the onSignupClick function passed from the parent component
  };

  const handleForgotPasswordClick = () => {
    // Handle forget password button click
    // Close the sign-in component and open the SendPasswordResetEmail component
    onForgetPasswordClick()




    // You can implement your logic here to open the SendPasswordResetEmail component
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <div className='input-div'>
          <input type="email" name="email" placeholder="Email" className="signin-input" />
          <input type="password" name="password" placeholder="Password" className="signin-input" />
        </div>
        <div className="form-options">
          <button type="button" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</button>
          <button type="submit" className="signin-button" disabled={isLoading}>Sign In</button>
        </div>
      </form>
      <div className="signup-options">
        <p>Don't have an account? </p>
        <button className="signin-button" onClick={handleSignupButtonClick}>  <i className="fa fa-user-plus"></i> Sign Up</button>
      </div>
      <button className="close-button" onClick={handleCloseClick}>
        <i className="fa fa-times"></i>
      </button>
      
    </div>
  );
}

export default Signin;
