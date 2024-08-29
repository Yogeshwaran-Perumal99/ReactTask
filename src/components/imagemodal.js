import React from 'react';
import './imagemodal.css';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
const ImageModal = ({ photo, onClose, onPrevious, onNext, isFirst, isLast }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>×</span>
        <img src={photo.urls.regular} alt={photo.alt_description} />
        <div className="metadata">
          <p><strong>Description:</strong> {photo.alt_description || "No description available"}</p>
          <p><strong>Photographer:</strong> {photo.user?.name}</p>
          <p><strong>Location:</strong> {photo.location?.name || "Unknown"}</p>
        </div>
        <button onClick={onPrevious} disabled={isFirst} className='previous' >
           <SlArrowLeft/>
        </button>
        <button onClick={onNext} disabled={isLast} className='next'>
            <SlArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
