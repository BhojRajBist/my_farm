import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import './Profile.css';

function Profile({ onClose }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  useEffect(() => {
    if (data && isSuccess) {
      setUserData(data);
      
    }
  }, [data, isSuccess]);

  const handleCloseClick = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    handleCloseClick()
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-row-head">
          <i className="fa fa-user profile-icon"></i>
          <div className='profile-header'>
            <span className="profile-value">{userData.full_name}</span>
            <span className="profile-value">{userData.email}</span>
          </div>
        </div>
        <div className="profile-row">
          <span className="profile-label">Country:</span>
          <span className="profile-value">{userData.country}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Address:</span>
          <span className="profile-value">{userData.address}</span>
        </div>
      </div>
      <div className="profile-buttons">
        <button className="profile-button">Edit Profile</button>
        <button className="profile-button">Change Password</button>
        <button className="profile-button" onClick={handleLogout} >Logout Account</button>
        <button className="profile-button">Delete Account</button>
      </div>
      <button className="close-button" onClick={handleCloseClick}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export default Profile;
