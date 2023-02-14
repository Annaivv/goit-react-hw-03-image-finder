const ImageGalleryItem = ({ image: { webformatURL } }) => {
  return (
    <div className="gallery-item">
      <img src={webformatURL} alt="picture" />
    </div>
  );
};

export default ImageGalleryItem;
