import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { addImage } from 'services/api';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    showModal: false,
    results: [],
    error: null,
    status: 'idle',
    activeItem: null,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.query !== this.state.query ||
        prevState.page !== this.state.page
      ) {
        this.setState({ status: 'pending' });
        const data = await addImage(this.state.query, this.state.page);
        if (data.hits.length === 0) {
          toast.error('No results for your search');
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({
          results: data.hits,
          status: 'resolved',
        });
      }
      if (prevState.query !== this.state.query) {
        this.setState({ page: 1 });
      }
    } catch {
      toast.error('Something went wrong');
      this.setState({ status: 'rejected' });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  findActiveItem = activeItem => {
    this.setState({ activeItem });
    console.log(activeItem);
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      results: [...prevState.results, this.state.results],
    }));
  };

  render() {
    const { showModal, results, status, activeItem } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          items={results}
          renderCondition={status}
          onImgClick={this.openModal}
          findActive={this.findActiveItem}
          onLoadMoreClick={this.loadMore}
        />

        {showModal && (
          <Modal onClose={this.closeModal} activeItem={activeItem} />
        )}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
