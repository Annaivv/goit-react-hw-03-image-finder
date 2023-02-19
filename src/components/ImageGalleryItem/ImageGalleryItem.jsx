import { ImgItem, ImgItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { webformatURL } }) => {
  return (
    <ImgItem>
      <ImgItemImage src={webformatURL} alt="picture" />
    </ImgItem>
  );
};

export default ImageGalleryItem;
