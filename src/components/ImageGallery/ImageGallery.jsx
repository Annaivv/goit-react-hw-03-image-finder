import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { addImage } from 'services/api';
import { ImageList } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.imageQuery !== this.props.imageQuery) {
        this.setState({ isLoading: true });
        const data = await addImage(this.props.imageQuery);
        this.setState({ items: data.hits });
      }
    } catch (error) {
      this.setState({ error });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  render() {
    const { items, isLoading, error } = this.state;
    const { imageQuery } = this.props;
    return (
      <div>
        {error && <p>{error.message}</p>}
        {isLoading && <p>Loading, please wait</p>}
        {!imageQuery && <p>What would you like to find?</p>}
        {items.length > 0 && (
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
