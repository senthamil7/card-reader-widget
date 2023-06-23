import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { recognize } from 'tesseract.js';

const Modal = ( {closeModal} ) => {
  const webcamRef = useRef(null);
  let cardnumber = ""
  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await processImage(imageSrc);
  };

  const processImage = async (imageSrc) => {
    const result = await recognize(imageSrc, 'eng');
    let res = result.data.text.replace(/(\r\n|\n)/gm, "");
    let formattedres = res.replace(/[^0-9 /]/g, "");
    let cardnumberarray = formattedres.split(" ");
    const reg = /^\d+$/;
    console.log('cardnumberarray',cardnumberarray);
    cardnumberarray.forEach((item) => {
        if((item && item !==0 ) && ((item.length === 4 || item.length === 3 ) && reg.test(item))) {
            cardnumber += item
        }
    });
    console.log('cardnumber',cardnumber);
    if(checkLuhn(cardnumber)) {
      console.log('luhn check passed');
      let cardbrand = identifyCreditCard(cardnumber);
      if(cardbrand) {
        let cardDetails = {
          number: cardnumber,
          brand: cardbrand
        }
        closeModal(cardDetails);
      }
      else {
        closeModal({ 'error': 'invalidcarddetails'});
      }
    } else {
      closeModal({ 'error': 'invalidcarddetails'});
    }
  };

  const checkLuhn = (value) => {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
      var digit = parseInt(value.charAt(i));
      
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) == 0;
  }

  const identifyCreditCard = (cardNumber) => {
    // Remove non-digit characters from the credit card number
    const sanitizedNumber = cardNumber.replace(/\D/g, '');
  
    // Define regular expressions for each credit card brand
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };
  
    // Check the credit card number against each brand's pattern
    for (const [brand, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(sanitizedNumber)) {
        return brand.toUpperCase();
      }
    }
  
    // If no match is found, return null or handle it as desired
    return null;
  }


  return (
    <div className= "modal open">
      <div className="modal-content">
        <h1>Card Reader</h1>
            <div className="overlay">
        <div className="overlay-helper">
            <div className="overlay-element top-left"></div>
            {/* <div className="overlay-element top-right"></div> */}
            {/* <div className="overlay-element bottom-left"></div> */}
            <div className="overlay-element bottom-right"></div>
        </div>
        </div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"
        style={{
                height: "400px",
                width: "700px",
                objectFit: "fill",
            }}
             />
        <div className='button'>
        <button onClick={captureImage}>Capture it!</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;