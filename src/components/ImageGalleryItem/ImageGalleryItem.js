import {useState} from 'react';
import Modal from '../Modal'

function ImageGalleryItem({ src, alt, fullSize }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
      <>
      <img src={src} alt={alt} onClick={toggleModal} className="ImageGalleryItem-image" />
      {showModal && ( <Modal onClose={toggleModal} src={fullSize} alt={alt} /> )}
      </>
  )
}

export default ImageGalleryItem;