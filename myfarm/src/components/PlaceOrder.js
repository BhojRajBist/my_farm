import React from 'react';

const PlaceOrder = ({ data }) => {
  const handlePlaceOrder = () => {
    // Logic for placing an order
  };

  return (
    <div className="place-order">
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default PlaceOrder;
