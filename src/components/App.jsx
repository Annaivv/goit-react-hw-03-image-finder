import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    query: '',
    showModal: true,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { query, showModal } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageQuery={query} />

        {showModal && <Modal onClose={this.closeModal} />}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
