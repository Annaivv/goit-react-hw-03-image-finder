import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ul className="gallery">
      {items.map(item => (
        <li key={item.id}>
          <ImageGalleryItem image={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
