import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import LoadMoreBtn from './LoadMoreButton/Button';
import Searchbar from './Searchbar/Searchbar';
import { addImage } from '../services/api';

export default class App extends Component {
  state = {
    request: '',
    results: [],
  };

  async addResults() {
    const results = await addImage();
    console.log(results);
    console.log(results.hits[0].id);
    this.setState({
      results: results.hits,
    });
  }
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=30900325-2c40b95e1611f9496716f72a9&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(image => this.setState({ image }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  handleFormSubmit = request => {
    this.addResults();
    this.setState({ request });
  };

  render() {
    const { request, results } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery items={results} />
        {/* <LoadMoreBtn /> */}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
