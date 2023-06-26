import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, cardDetailsSet] = useState({})

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (cardDetails) => {
    cardDetailsSet(cardDetails)
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="scan-icon-container">
        <div className="scan-icon" onClick={openModal} />
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
      {(cardDetails && cardDetails?.number) && JSON.stringify(cardDetails)}
    </div>
  );
}

export default App;