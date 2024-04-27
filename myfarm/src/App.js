// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import BuyerLandingPage from './buyercom/BuyerLandingPage';
// import FarmerLandingPage from './farmercom/FarmerLandingPage';
// import BuyerDashboard from './buyercom/BuyerDashboard';
// import FarmerDashboard from './/farmercom/FarmerDashboard';

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAccountType, setSelectedAccountType] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const onSelectBuyer = () => {
//     setSelectedAccountType('buyer');
//     closeModal();
//     setIsLoggedIn(true);
//   };

//   const onSelectFarmer = () => {
//     setSelectedAccountType('farmer');
//     closeModal();
//     setIsLoggedIn(true);
//   };

//   const handleLoginOrSignup = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <div>
//       <button onClick={handleLoginOrSignup}>Login or Signup</button>
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
//           <h2>Select Account Type</h2>
//           <button onClick={onSelectBuyer}>Buyer</button>
//           <button onClick={onSelectFarmer}>Farmer</button>
//         </Modal>
//       )}
//       {isLoggedIn && (
//         <div>
//           {selectedAccountType === 'buyer'? (
//             <div>
//               <BuyerLandingPage />
//               <BuyerDashboard />
//             </div>
//           ) : (
//             <div>
//               <FarmerLandingPage />
//               <FarmerDashboard />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerLandingPage from './buyercom/BuyerLandingPage'; // Import buyer components
import BuyerDashboard from './buyercom/BuyerDashboard';
import FarmerLandingPage from './farmercom/FarmerLandingPage'; // Import farmer components
import FarmerDashboard from './farmercom/FarmerDashboard';
import LoginModal from './LoginModal'; // Import LoginModal component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState(null); // Track selection

  const handleLoginOrSignup = () => {
    // Implement backend interaction for login/signup
    setIsLoggedIn(true); // Simulate login for now (replace with actual logic)
  };

  const handleAccountSelection = (type) => {
    setSelectedAccountType(type);
  };

  return (
    <Router>
      <div>
        <button onClick={handleLoginOrSignup}>Login or Signup</button>
        {isLoggedIn && (
          <div>
            <LoginModal // Render LoginModal conditionally
              onSelection={handleAccountSelection} // Pass selection handler
            />
            <Routes>
              {selectedAccountType === 'buyer' && ( // Render based on selection
                <>
                  <Route path="/" element={<BuyerLandingPage />} />
                  <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                </>
              )}
              {selectedAccountType === 'farmer' && (
                <>
                  <Route path="/" element={<FarmerLandingPage />} />
                  <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                </>
              )}
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
