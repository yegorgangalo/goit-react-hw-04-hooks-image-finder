import { useState, useEffect, useRef } from 'react';
import { imageAPI } from '../../APIservice';
import Notification from '../Notification';
import ImageGalleryList from '../ImageGalleryList';
import Button from '../Button';
import PropTypes from 'prop-types';

const { IDLE, PENDING, REJECTED, RESOLVED } = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

function ImageGallery({ searchQuery }) {
  const [status, setStatus] = useState(IDLE);
  const [imgFetched, setImgFetched] = useState([]);
  const [imgTotal, setImgTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    resetGallery();
  }, [searchQuery]);

  const oldQuery = useRef('');

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }
    if (page !== 1 && oldQuery.current !== searchQuery) {
      return;
    }

    oldQuery.current = searchQuery;
    setStatus(PENDING);
    setTimeout(() => {
      imageAPI(searchQuery, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            return Promise.reject(
              new Error(`There is no image with tag: ${searchQuery}`),
            );
          }
          setImgFetched(prevState => [...prevState, ...hits]);
          setImgTotal(totalHits);
          setStatus(RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(REJECTED);
        });
    }, 500);
  }, [page, searchQuery]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [imgFetched, status]);

  const resetGallery = () => {
    setStatus(IDLE);
    setImgFetched([]);
    setImgTotal(0);
    setPage(1);
    setError('');
  };

  const incrementPage = () => setPage(prev => prev + 1);

  const buttonLoadType = () => {
    if (status === PENDING && page === 1) {
      return 'spinner';
    }
    if (status === PENDING && page > 1) {
      return 'loading';
    }
    if (imgFetched.length >= imgTotal) {
      return 'hidden';
    }
    return 'more';
  };
  const buttonType = buttonLoadType();

  if (status === IDLE) {
    return <Notification text="Input tag to find images" />;
  }
  if (status === PENDING) {
    return (
      <>
        <ImageGalleryList imgArray={imgFetched} />
        <Button type={buttonType} />
      </>
    );
  }
  if (status === REJECTED) {
    return <Notification text={error.message} />;
  }
  if (status === RESOLVED) {
    return (
      <>
        <ImageGalleryList imgArray={imgFetched} />
        <Button type={buttonType} onClickFetch={incrementPage} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
