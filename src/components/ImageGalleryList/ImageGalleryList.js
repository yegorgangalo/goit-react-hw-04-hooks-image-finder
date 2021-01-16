import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem'

function ImageGalleryList ({imgArray}) {
    return (
        <ul className="ImageGallery">
            {imgArray.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                    <li className="ImageGalleryItem" key={id+webformatURL}>
                        <ImageGalleryItem src={webformatURL} alt={tags} fullSize={largeImageURL} />
                    </li>
                )
            })}
        </ul>
    )
}

ImageGalleryList.propTypes = {
    imgArray: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}

export default ImageGalleryList;