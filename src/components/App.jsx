import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import LoadMoreBtn from './LoadMoreButton/Button';
import Searchbar from './Searchbar/Searchbar';
// import { addImage } from '../services/api';

export default class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  // loadMore = () => {
  //   this.setState(prevState => {
  //     return { page: prevState.page + 1 };
  //   });
  //   console.log(this.state.page);
  // };

  render() {
    const { query, page } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery imageQuery={query} page={page} />
        {/* <LoadMoreBtn onClick={this.loadMore} /> */}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
