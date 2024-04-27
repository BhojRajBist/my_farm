// import React, { useState } from 'react';
// import AccountTypeModal from './AccountTypeModal';

// const LandingPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAccountType, setSelectedAccountType] = useState(null);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const onSelectBuyer = () => {
//     setSelectedAccountType('buyer');
//     closeModal();
//   };

//   const onSelectFarmer = () => {
//     setSelectedAccountType('farmer');
//     closeModal();
//   };

//   return (
//     <div>
//       <button onClick={() => setIsModalOpen(true)}>Login or Signup</button>
//       {isModalOpen && (
//         <AccountTypeModal
//           isOpen={isModalOpen}
//           closeModal={closeModal}
//           onSelectBuyer={onSelectBuyer}
//           onSelectFarmer={onSelectFarmer}
//         />
//       )}
//       {selectedAccountType === 'buyer' && <BuyerDashboard />}
//       {selectedAccountType === 'farmer' && <FarmerDashboard />}
//     </div>
//   );
// };

// const BuyerDashboard = () => {
//   // Code for the buyer dashboard goes here
// };

// const FarmerDashboard = () => {
//   // Code for the farmer dashboard goes here
// };

// export default LandingPage;