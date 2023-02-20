import { Component } from 'react';
import toast from 'react-hot-toast';
import { addImage } from 'services/api';
import { ImageList } from './ImageGallery.styled';
import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.imageQuery !== this.props.imageQuery) {
        this.setState({ isLoading: true, error: null });
        const data = await addImage(this.props.imageQuery);
        this.setState({ items: data.hits });
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  }
  render() {
    const { items, isLoading, error } = this.state;

    return (
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoading && <Loader />}

        {items.length > 0 && !isLoading && (
          <ImageList>
            {items.map(item => (
              <li key={item.id}>
                <ImageGalleryItem image={item} />
              </li>
            ))}
          </ImageList>
        )}
      </div>
    );
  }
}
