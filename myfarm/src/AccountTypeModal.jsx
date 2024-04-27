import React from 'react';
import Modal from 'react-modal';

const AccountTypeModal = ({ isOpen, closeModal, onSelectBuyer, onSelectFarmer }) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal}>
    <h2>Select Account Type</h2>
    <button onClick={onSelectBuyer}>Buyer</button>
    <button onClick={onSelectFarmer}>Farmer</button>
  </Modal>
);

export default AccountTypeModal;