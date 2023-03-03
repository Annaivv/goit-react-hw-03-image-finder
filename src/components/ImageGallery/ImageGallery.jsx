import { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
// import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from 'components/LoadMoreButton/Button';

export default class ImageGallery extends Component {
  render() {
    const { items, findActive, onImgClick, onLoadMoreClick } = this.props;

    return (
      <div>
        <ImageList>
          {items.map(item => (
            <li
              key={item.id}
              // onClick={() => {
              //   findActive(item.largeImageURL);
              //   onImgClick();
              // }}
            >
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
