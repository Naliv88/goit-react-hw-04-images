import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const Modal = ({ largeImage, onClose }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  const clickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      return onClose();
    }
  };

  return (
    <div onClick={clickOverlay} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={largeImage} alt="modalImg" />
      </div>
    </div>
  );
};

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   clickOverlay = e => {
//     if (e.target.nodeName !== 'IMG') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImage } = this.props;
//     return (
//       <div onClick={this.clickOverlay} className={styles.Overlay}>
//         <div className={styles.Modal}>
//           <img src={largeImage} alt="modalImg" />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
