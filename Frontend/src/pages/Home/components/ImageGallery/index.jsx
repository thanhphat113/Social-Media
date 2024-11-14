import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';

function ImageGallery({ images }) {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImagePopup = (index) => {
    setCurrentImageIndex(index);
    setIsImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const renderImages = () => {
    const numImages = images.length;
  
    if (numImages === 1) {
      return <img src={images[0]} alt="Gallery image" onClick={() => openImagePopup(0)} className={styles.fullImage} />;
    } else if (numImages === 2) {
      return (
        <div className={styles.twoImages}>
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Gallery image ${index + 1}`} onClick={() => openImagePopup(index)} />
          ))}
        </div>
      );
    } else if (numImages === 3) {
      return (
        <div className={styles.threeImages}>
          <img src={images[0]} alt="Gallery image 1" onClick={() => openImagePopup(0)} />
          <img src={images[1]} alt="Gallery image 2" onClick={() => openImagePopup(1)} />
          <img src={images[2]} alt="Gallery image 3" onClick={() => openImagePopup(2)} />
        </div>
      );
    } else if (numImages === 4) {
      return (
        <div className={styles.fourImages}>
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Gallery image ${index + 1}`} onClick={() => openImagePopup(index)} />
          ))}
        </div>
      );
    } else {
      return (
        <div className={styles.fiveImages}>
          <div className={styles.topRow}>
            <img src={images[0]} alt="Gallery image 1" onClick={() => openImagePopup(0)} className={styles.imageItem} />
            <img src={images[1]} alt="Gallery image 2" onClick={() => openImagePopup(1)} className={styles.imageItem} />
          </div>
          <div className={styles.bottomRow}>
            <img src={images[2]} alt="Gallery image 3" onClick={() => openImagePopup(2)} className={styles.imageItem} />
            <img src={images[3]} alt="Gallery image 4" onClick={() => openImagePopup(3)} className={styles.imageItem} />
            <img src={images[4]} alt="Gallery image 5" onClick={() => openImagePopup(4)} className={styles.imageItem} />
          </div>
          <div className={styles.overlay} onClick={() => openImagePopup(4)}>
            +{numImages - 4}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.imageGallery}>
      {renderImages()}

      {isImagePopupOpen && (
        <div className={styles.imagePopup}>
          <div className={styles.popupOverlay} onClick={closeImagePopup}></div>
          <button onClick={prevImage} className={styles.navButtonLeft}>
            &#10094;
          </button>
          <div className={styles.popupContent}>
            <img src={images[currentImageIndex]} alt="Popup image" className={styles.popupImage} />
          </div>
          <button onClick={nextImage} className={styles.navButtonRight}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
