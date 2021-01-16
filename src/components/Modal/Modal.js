import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function Modal({ src, alt, onClose }) {

    useEffect(() => {
        const keydownCloseModal = ({ code }) => {
            code === "Escape" && onClose();
        }
        window.addEventListener('keydown', keydownCloseModal);
        return ()=>window.removeEventListener('keydown', keydownCloseModal);
    },[onClose])

    const backdropCloseModal = ({ target, currentTarget }) => {
        // target === currentTarget && onClose();
        onClose();
    }

        return createPortal(
            <div className="Overlay" onClick={backdropCloseModal}>
              <div className="Modal">
                <img src={src} alt={alt} />
              </div>
            </div>
        , document.querySelector('#modal-root'))
}

Modal.propTypes = {
        onClose: PropTypes.func.isRequired,
    }

export default Modal;