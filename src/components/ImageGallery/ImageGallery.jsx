import { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from 'components/LoadMoreButton/Button';

export default class ImageGallery extends Component {
  render() {
    const { items, renderCondition } = this.props;

    if (renderCondition === 'idle') {
      return;
    }

    if (renderCondition === 'pending') {
      return <Loader />;
    }

    if (renderCondition === 'rejected') {
      return <p style={{ color: 'red' }}>Something went wrong</p>;
    }

    if (renderCondition === 'resolved') {
      return (
        <div>
          <ImageList>
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  this.props.findActive(item.largeImageURL);
                  this.props.onImgClick();
                }}
              >
                <ImageGalleryItem image={item} />
              </li>
            ))}
          </ImageList>
          <LoadMoreBtn
            onBtnClick={() => {
              this.props.onLoadMoreClick();
            }}
          />
        </div>
      );
    }
  }
}
