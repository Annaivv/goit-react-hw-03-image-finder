import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import LoadMoreBtn from './LoadMoreButton/Button';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  return (
    <Layout>
      <Searchbar />
      <ImageGallery />
      <LoadMoreBtn />
      <GlobalStyle />
    </Layout>
  );
};
