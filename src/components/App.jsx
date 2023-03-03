import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { addImage } from 'services/api';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    // showModal: false,
    results: [],
    error: null,
    isLoading: false,
    // status: 'idle',
    // activeItem: null,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (prevState.query !== this.state.query) {
        this.setState({ isLoading: true });

        const data = await addImage(this.state.query, 1);
        if (data.hits.length === 0) {
          toast.error('No results for your search');
          return;
        }

        this.setState({
          results: data.hits,
          isLoading: false,
          page: 1,
        });
      }

      if (
        prevState.page !== this.state.page &&
        prevState.query === this.state.query
      ) {
        const data = await addImage(this.state.query, this.state.page);
        this.setState(prevState => ({
          results: [...prevState.results, ...data.hits],
        }));
      }
    } catch (error) {
      toast.error('Something went wrong');
      this.setState({ error });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, results, status, activeItem, isLoading } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery items={results} onLoadMoreClick={this.loadMore} />
        )}
        {/* {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery
            items={results}
            // renderCondition={status}
            onImgClick={this.openModal}
            findActive={this.findActiveItem}
            onLoadMoreClick={this.loadMore}
          />
        )}

        {showModal && (
          <Modal onClose={this.closeModal} activeItem={activeItem} />
        )} */}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}

// if (prevState.page !== this.state.page) {
//     const data = await addImage(this.state.query, this.state.page);
//     this.setState(prevState => ({
//       results: [...prevState.results, ...data.hits],
//     }));
//   }
// };

// async componentDidUpdate(_, prevState) {
//   try {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ status: 'pending' });
//       const data = await addImage(this.state.query, this.state.page);
//       if (data.hits.length === 0) {
//         toast.error('No results for your search');
//         this.setState({ status: 'idle' });
//         return;
//       }
//       if (prevState.query !== this.state.query) {
//         this.setState({ results: [], page: 1, status: 'pending' });
//       }
//       this.setState(prevState => ({
//         results: [...prevState.results, ...data.hits],
//         status: 'resolved',
//       }));
//     }
//   } catch (error) {
//     toast.error('Something went wrong');
//     this.setState({ error, status: 'rejected' });
//   }
// }

// openModal = () => {
//   this.setState({ showModal: true });
// };

// closeModal = () => {
//   this.setState({ showModal: false });
// };

// findActiveItem = activeItem => {
//   this.setState({ activeItem });
//   console.log(activeItem);
// };

// loadMore = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };
