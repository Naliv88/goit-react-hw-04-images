import React from 'react';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

 const ImageGalleryItem = ({ smallImage, largeImage, onClick }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItemImage}
        onClick={() => onClick(largeImage)}
        src={smallImage}
        alt="gallaryImg"
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ImageGalleryItem;