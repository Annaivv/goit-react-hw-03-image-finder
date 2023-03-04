import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
// import { addImage } from 'services/api';
import Loader from './Loader/Loader';
import { addImageFirstPage, addImageNextPages } from 'services/api';

export default class App extends Component {
  state = {
    query: '',
    isLoading: false,
    page: 1,

    results: [],
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (prevState.query !== this.state.query) {
        this.setState({ isLoading: true });
        const data = await addImageFirstPage(this.state.query);
        if (data.hits.length === 0) {
          toast.error('No results for your search');
          this.setState({ isLoading: false });
          return;
        }
        this.setState({
          results: data.hits,
          isLoading: false,
        });
      }

      if (
        prevState.page !== this.state.page &&
        prevState.query === this.state.query
      ) {
        const data = await addImageNextPages(this.state.query, this.state.page);

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
    const { isLoading, results } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery items={results} onLoadMoreClick={this.loadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
