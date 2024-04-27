import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../services/userAuthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ResetPassword.css';

function ResetPassword({setAuthActive}) {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    const data = new FormData(e.currentTarget);
    console.log("Form data:", data);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    };
    console.log("Actual data:", actualData);

    const res = await resetPassword({ actualData, id, token });
    console.log("Response:", res);

    if (res.error) {
      console.error("Error occurred:", res.error);
      setServerMsg({});
      setServerError(res.error.data.errors);
      toast.error('An error occurred. Please try again.');
    }
    if (res.data) {
      console.log("Success:", res.data);
      setServerError({});
      setServerMsg(res.data);
      document.getElementById('password-reset-form').reset();
 
        navigate("/", { state: { signInState: true } }); // Redirect to '/' with argument
    
    
      toast.success('Password reset successfully.');
    }
  };

  return (
    <>
      <div className="reset-password">
        <form id="password-reset-form" onSubmit={handleSubmit}>
          <div className='input-div'>
            <input type="password" name="password" placeholder="Password" className="reset-password-input" />
            <input type="password" name="password2" placeholder="Confirm Password" className="reset-password-input" />
          </div>
          <button type="submit" className="reset-password-button">
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ResetPassword;
