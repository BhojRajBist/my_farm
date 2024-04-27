import React, { useState } from 'react';
import './Signup.css';
import Swal from 'sweetalert2';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Term from '../Term';

function Signup({ onClose, onSigninClick }) {

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        country: '',
        address: '',
        password: '',
        confirm_password: '',
        agreeToTerms: false // Add a state for tracking whether the user has agreed to the terms
    });

    const [showTerms, setShowTerms] = useState(false); // State to manage the visibility of the Terms component

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!formData.agreeToTerms) {
                toast.error('Please agree to the Terms of Service.'); // Display error toast if terms are not agreed
                return;
            }
            
            // Proceed with registration if terms are agreed
            const res = await registerUser(formData);
            console.log('Registration response:', res);
            if (res.error) {
                // Handle registration errors
                console.error('Registration error:', res.error);
                throw new Error(res.error.data.detail || 'Something went wrong');
            }
            toast.success('An email has been sent to activate your account. Please proceed to activate your account using the link provided in the email.');
            onSigninClick();
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error
        }
    };

    const handleCloseClick = () => {
        onClose();
    };

    const handleSigninButtonClick = () => {
        onSigninClick();
    };

    const handleCloseTerms = () => {
      setShowTerms(false)
      };


    const handleTermsButtonClick = () => {
        setShowTerms(true); // Show the Terms component when the button is clicked
    };

    return (
        <div className="signup-container">
            {showTerms ? (
                <Term onClose={handleCloseTerms} />
            ) : (
                <>
                <div className="signup-form">
                <h2>Sign Up</h2>
                <div className="input-div">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="signup-input"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                
                 
                    {/* End of checkbox */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="signup-input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        className="signup-input"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="signup-input"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="signup-input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="signup-input"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                    />
                       <label>
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />  I have read and agree to the <button className='term-button' onClick={handleTermsButtonClick}> Terms of Service</button>
                            </label>
                        </div>
                        <button className="signup-button" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                    <div className="signup-options">
                        <p>Already have an account? </p>
                        <button className="signin-button" onClick={handleSigninButtonClick}>
                            <i className="fa fa-sign-in"></i> Sign In
                        </button>
                    </div>
                    <button className="close-button" onClick={handleCloseClick}>
                        <i className="fa fa-times"></i>
                    </button>
                </>
            )}
        </div>
    );
}

export default Signup;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Swal from 'sweetalert2';
// import Term from '../Term';
// import ChooseLocation from './ChooseLocation';

// const Signup = ({ onSigninClick, onClose }) => {
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     country: '',
//     address: {
//       lat: null,
//       lng: null,
//       description: '',
//     },
//     role: 'buyer',
//     password: '',
//     confirm_password: '',
//     agreeToTerms: false,
//     registration_document: null,
//   });

//   const [showTerms, setShowTerms] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === 'file') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: e.target.files[0],
//       }));

//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleAddressChange = (address) => {
//     setFormData(prev => ({
//       ...prev,
//       address,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (verifyInput()) {
//       console.log('Form submitted', formData);

//       // Add your registration logic here

//       Swal.fire('Form submitted successfully!', '', 'success');
//       onClose();
//       onSigninClick();
//     }
//   };

//   const verifyInput = () => {
//     const {
//       full_name,
//       email,
//       country,
//       address: { lat, lng },
//       role,
//       password,
//       confirm_password,
//       agreeToTerms,
//     } = formData;

//     if (full_name === '') return Swal.fire('Error', 'Please enter your full name', 'error');
//     if (email === '') return Swal.fire('Error', 'Please enter your email address', 'error');
//     if (country === '') return Swal.fire('Error', 'Please enter your country', 'error');

//     if (role === 'farmer') {
//       if ([lat, lng].includes(null)) return Swal.fire('Error', 'Please choose a location for your farm', 'error');

//       if (!formData.registration_document) return Swal.fire('Error', 'Please upload a registration document for your farm', 'error');

//       // Add verification logic for registration document here
//     }

//     if (password !== confirm_password) return Swal.fire('Error', 'Passwords do not match', 'error');

//     if (!agreeToTerms) return Swal.fire('Error', 'Please agree to the terms and conditions', 'error');

//     return true;
//   };

//   return (
//     <>
//       <div className="signup-container">
//         <ChooseLocation
//           showAddress
//           coordinates={formData.address}
//           onCoordinatesChange={handleAddressChange}
//         />

//         <form onSubmit={handleSubmit} className="signup-form">
//           <h2>Sign Up</h2>
//           <div className="input-div">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="signup-input"
//               name="full_name"
//               value={formData.full_name}
//               onChange={handleChange}
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               className="signup-input"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               placeholder="Country"
//               className="signup-input"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//             />

//             {formData.role === 'farmer' && <div>
//               <Term />

//               <label htmlFor="registration-document">Farm Registration Document</label>
//               <input
//                 type="file"
//                 className="signup-input"
//                 name="registration_document"
//                 id="registration-document"
//                 onChange={handleChange}
//               />
//             </div>}

//             <label htmlFor="role">
//               Are you a buyer or a farmer?
//               <select
//                 name="role"
//                 id="role"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="buyer">Buyer</option>
//                 <option value="farmer">Farmer</option>
//               </select>
//             </label>

//             <div className="input-div">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="signup-input"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="signup-input"
//                 name="confirm_password"
//                 value={formData.confirm_password}
//                 onChange={handleChange}
//               />

//               <label>
//                 <input
//                   type="checkbox"
//                   checked={formData.agreeToTerms}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     agreeToTerms: e.target.checked,
//                   }))}
//                 />

//                 <Term
//                   onView={() => setShowTerms(true)}
//                 />

//                 I have read and agree to the
//                 {' '}
//                 <button
//                   type="button"
//                   className="term-button"
//                   onClick={() => setShowTerms(true)}
//                 >
//                   Terms of Service
//                 </button>
//               </label>

//               <button
//                 type="submit"
//                 className="signup-button"
//                 disabled={
//                   formData.full_name === ''
//                   || formData.email === ''
//                   || formData.country === ''
//                   || formData.address.lat === null
//                   || formData.address.lng === null
//                   || formData.password !== formData.confirm_password
//                   || !formData.agreeToTerms
//                 }
//               >
//                 {
//                   isLoading ? (
//                     'Creating Account...'
//                   ) : (
//                     'Create Account'
//                   )
//                 }
//               </button>
//             </div>
//           </div>
//         </form>

//         <div className="signup-options">
//           <p>Already have an account?</p>

//           <button
//             type="button"
//             className="signin-button"
//             onClick={onSigninClick}
//           >
//             <i className="fa fa-sign-in" />
//             Sign In
//           </button>
//         </div>

//         <button
//           type="button"
//           className="close-button"
//           onClick={onClose}
//         >
//           <i className="fa fa-times" />
//         </button>

//         {
//           showTerms && (
//             <Term
//               onClose={() => setShowTerms(false)}
//             />
//           )
//         }
//       </div>
//     </>
//   );
// };

// Signup.propTypes = {
//   onSigninClick: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Signup;


// import React, { useState } from 'react';
// import './Signup.css';
// import Swal from 'sweetalert2';
// import { useRegisterUserMutation } from '../../services/userAuthApi';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Term from '../Term';

// function Signup({ onClose, onSigninClick }) {

//     const [formData, setFormData] = useState({
//         full_name: '',
//         email: '',
//         userType: '', // New state for user type (farmer or buyer)
//         address: '',
//         password: '',
//         confirm_password: '',
//         agreeToTerms: false
//     });

//     const [showTerms, setShowTerms] = useState(false);

//     const [registerUser, { isLoading }] = useRegisterUserMutation();

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             if (!formData.agreeToTerms) {
//                 toast.error('Please agree to the Terms of Service.');
//                 return;
//             }
            
//             const res = await registerUser(formData);
//             console.log('Registration response:', res);
//             if (res.error) {
//                 console.error('Registration error:', res.error);
//                 throw new Error(res.error.data.detail || 'Something went wrong');
//             }
//             toast.success('An email has been sent to activate your account. Please proceed to activate your account using the link provided in the email.');
//             onSigninClick();
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     const handleCloseClick = () => {
//         onClose();
//     };

//     const handleSigninButtonClick = () => {
//         onSigninClick();
//     };

//     const handleCloseTerms = () => {
//       setShowTerms(false)
//     };

//     const handleTermsButtonClick = () => {
//         setShowTerms(true);
//     };

//     return (
//         <div className="signup-container">
//             {showTerms ? (
//                 <Term onClose={handleCloseTerms} />
//             ) : (
//                 <>
//                     <div className="signup-form">
//                         <h2>Sign Up</h2>
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 placeholder="Full Name"
//                                 className="signup-input"
//                                 name="full_name"
//                                 value={formData.full_name}
//                                 onChange={handleChange}
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 className="signup-input"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                            <div className="radio-container">
//                                 <label className="radio-label">
//                                     <input
//                                         type="radio"
//                                         name="userType"
//                                         value="farmer"
//                                         checked={formData.userType === 'farmer'}
//                                         onChange={handleChange}
//                                         className="radio-input"
//                                     />
//                                     Farmer
//                                 </label>
//                                 <label className="radio-label">
//                                     <input
//                                         type="radio"
//                                         name="userType"
//                                         value="buyer"
//                                         checked={formData.userType === 'buyer'}
//                                         onChange={handleChange}
//                                         className="radio-input"
//                                     />
//                                     Buyer
//                                 </label>
//                             </div>

//                             <input
//                                 type="text"
//                                 placeholder="Address"
//                                 className="signup-input"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 className="signup-input"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Confirm Password"
//                                 className="signup-input"
//                                 name="confirm_password"
//                                 value={formData.confirm_password}
//                                 onChange={handleChange}
//                             />
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="agreeToTerms"
//                                     checked={formData.agreeToTerms}
//                                     onChange={handleChange}
//                                 />  I have read and agree to the <button className='term-button' onClick={handleTermsButtonClick}> Terms of Service</button>
//                             </label>
//                         </div>
//                         <button className="signup-button" onClick={handleSubmit} disabled={isLoading}>
//                             {isLoading ? 'Creating Account...' : 'Create Account'}
//                         </button>
//                     </div>
//                     <div className="signup-options">
//                         <p>Already have an account? </p>
//                         <button className="signin-button" onClick={handleSigninButtonClick}>
//                             <i className="fa fa-sign-in"></i> Sign In
//                         </button>
//                     </div>
//                     <button className="close-button" onClick={handleCloseClick}>
//                         <i className="fa fa-times"></i>
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Signup;




