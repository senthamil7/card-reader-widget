import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logger = props.logger ? props.logger : console.log;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (cardDetails) => {
    props?.onDone(cardDetails);
    logger('cardDetails', cardDetails);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="scan-icon-container">
        <div className="scan-icon" onClick={openModal} />
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default App;