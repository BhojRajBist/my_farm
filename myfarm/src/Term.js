import React from 'react';
import './Term.css';

function Term({onClose}) {
    const handleCloseClick =()=>{
    onClose()
    }
  return (

    
    <div className="term-container">
      <h2>Terms of Service</h2>
      <p>
        Welcome to the eTOD Data Portal! By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>
      <h3>1. Access to Data</h3>
      <p>
        The eTOD portal offers access to electronic terrain and obstacle datasets for various aerodromes. To access specific airport data, users must register and log in to the portal.
      </p>
      <h3>2. Data Usage</h3>
      <p>
        The datasets provided on the eTOD portal include information on obstacle projections and more. Users are granted access to analyze and visualize the data for the purpose of enhancing decision-making and safety measures for aviation operations.
      </p>
      <h3>3. Compliance with Annex 15 ICAO Requirement</h3>
      <p>
        The data created for the pilot area meets the Annex 15 ICAO requirement, ensuring compliance with international standards for aviation safety and navigation.
      </p>
      <h3>4. User Responsibilities</h3>
      <p>
        Users are responsible for maintaining the confidentiality of their login credentials and for all activities that occur under their account. They agree to use the portal in compliance with applicable laws and regulations.
      </p>
      <h3>5. Limitation of Liability</h3>
      <p>
        The eTOD portal and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the portal or its services.
      </p>
      <h3>6. Changes to Terms</h3>
      <p>
        We reserve the right to modify or revise these terms of service at any time. Users are encouraged to review the terms periodically for changes. Continued use of the portal after modifications signifies acceptance of the updated terms.
      </p>
      <h3>7. Contact Us</h3>
      <p>
        If you have any questions or concerns about these terms of service, please contact us at support@etodportal.com.
      </p>
      <button className="close-button" onClick={handleCloseClick}>
                        <i className="fa fa-times"></i>
                    </button>
    </div>
  );
}

export default Term;
