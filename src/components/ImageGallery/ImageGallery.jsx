import { Component } from 'react';
import toast from 'react-hot-toast';
import { addImage } from 'services/api';
import { ImageList } from './ImageGallery.styled';
import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from 'components/LoadMoreButton/Button';

export default class ImageGallery extends Component {
  state = {
    items: [],
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.imageQuery !== this.props.imageQuery) {
        this.setState({ status: 'pending' });
        const data = await addImage(this.props.imageQuery);
        if (data.hits.length === 0) {
          toast.error('No results for your search');
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ items: data.hits, status: 'resolved' });
      }
    } catch {
      toast.error('Something went wrong');
      this.setState({ status: 'rejected' });
    }
  }
  render() {
    const { items, status } = this.state;
    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p style={{ color: 'red' }}>Something went wrong</p>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ImageList>
            {items.map(item => (
              <li key={item.id}>
                <ImageGalleryItem image={item} />
              </li>
            ))}
          </ImageList>
          <LoadMoreBtn />
        </div>
      );
    }
  }
}
