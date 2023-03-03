import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from 'components/LoadMoreButton/Button';

export default class ImageGallery extends Component {
  render() {
    const { items, onLoadMoreClick } = this.props;

    return (
      <div>
        <ImageList>
          {items.map(item => (
            <li key={item.id}>
              <ImageGalleryItem image={item} />
            </li>
          ))}
        </ImageList>

        {items.length > 0 && (
          <LoadMoreBtn onBtnClick={() => onLoadMoreClick()} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
};
