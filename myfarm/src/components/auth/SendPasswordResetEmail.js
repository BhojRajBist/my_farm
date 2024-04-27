import React, { useState } from 'react';
import './SendPasswordResetEmail.css';
import { useSendPasswordResetEmailMutation } from '../../services/userAuthApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendPasswordResetEmail({ onClose }) {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');
  const [serverMsg, setServerMsg] = useState('');
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleCloseClick = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending password reset email...');
      toast.promise(
        sendPasswordResetEmail({ email }),
        {
          pending: 'Sending...',
          success: (response) => {
            console.log('Password reset email sent successfully:', response.data);
            setServerError('');
            setServerMsg(response.data.msg);
            setEmail('');
            return 'Reset link sent successfully!';
          },
          
          error: (error) => {
            console.error('Error sending reset email:', error);
            setServerError(error.data.errors);
            setServerMsg('');
            return 'Error sending reset link!';
          }
        }
      );
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className="send-password-reset-email">
      <h2>Forgot Password?</h2>
      <div className='password-reset-message'>
    <p>Please enter the email address you used during registration. We'll send password reset instructions shortly. Rest assured, we never store or send passwords via email for security reasons.</p>  
      </div>
      <form onSubmit={handleSubmit}>
        <div className='input-div'>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="forget-password-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="forget-password-button">
          Send Reset Link
        </button>
      </form>
      {serverError && <p className="error-message">{serverError}</p>}
      {serverMsg && <p className="success-message">{serverMsg}</p>}
      <button className="close-button" onClick={handleCloseClick}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export default SendPasswordResetEmail;
