import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  return (
    <Layout>
      <Searchbar />
      <GlobalStyle />
    </Layout>
  );
};
