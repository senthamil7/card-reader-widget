import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function CardReader() {
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
      {cardDetails && JSON.stringify(cardDetails)}
    </div>
  );
}

export default CardReader;