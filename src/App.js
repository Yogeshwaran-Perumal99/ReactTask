import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ImageModal from './components/imagemodal.js';

const ACCESS_KEY = 'XTXi4_jm43Q4N_jF8mRqTuh-qdr14VByoiIYAsVOC6Q';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const selectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handlePrevious = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  return (
    <div className="App">
      <div className="masonry">
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            className="masonry-item"
            onClick={() => selectPhoto(photo)}
          />
        ))}
      </div>

      {selectedPhoto && (
        <ImageModal
          photo={selectedPhoto}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={photos.findIndex(photo => photo.id === selectedPhoto.id) === 0}
          isLast={photos.findIndex(photo => photo.id === selectedPhoto.id) === photos.length - 1}
        />
      )}
    </div>
  );
}

export default App;
