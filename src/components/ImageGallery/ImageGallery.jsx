import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import style from "./ImageGallery.module.css"

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={style.ImageGallery}>
          {/* <!-- Набір <li> із зображеннями --> */}
          {images.map(image=>(
      <ImageGalleryItem key={image.id} smallImage={image.webformatURL} largeImage={image.largeImageURL} onClick={onClick}/>))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
