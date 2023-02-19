import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { addImage } from 'services/api';

export default class ImageGallery extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.imageQuery !== this.props.imageQuery) {
        const data = await addImage(this.props.imageQuery);
        this.setState({ items: data.hits });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    }
  }
  render() {
    const { items } = this.state;
    return (
      <ul className="gallery">
        {items.map(item => (
          <li key={item.id}>
            <ImageGalleryItem image={item} />
          </li>
        ))}
      </ul>
    );
  }
}
