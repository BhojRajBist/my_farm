import React, { useState } from 'react';
import App from './App';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <App setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <Modal />}
    </div>
  );
};

export default ParentComponent;