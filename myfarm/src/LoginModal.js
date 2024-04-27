import React from 'react'; // Import necessary components for the modal

const LoginModal = ({ onSelection }) => {
  // Implement your modal UI and logic here
  // Include buttons for buyer and farmer selection

  const handleBuyerSelection = () => {
    onSelection('buyer');
  };

  const handleFarmerSelection = () => {
    onSelection('farmer');
  };

  return (
    <div className="login-modal"> {/* Define modal structure */}
      <h2>Select Account Type</h2>
      <button onClick={handleBuyerSelection}>Buyer</button>
      <button onClick={handleFarmerSelection}>Farmer</button>
    </div>
  );
};

export default LoginModal;
