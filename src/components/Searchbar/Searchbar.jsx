import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import {
  SearchingBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    request: '',
  };

  handleRequestChange = evt => {
    this.setState({ request: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.request.trim() === '') {
      return toast.error('Write your request!');
    }

    this.props.onSubmit(this.state.request);

    this.setState({ request: '' });
  };

  render() {
    return (
      <SearchingBar>
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <ImSearch />
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleRequestChange}
          />
        </SearchForm>
      </SearchingBar>
    );
  }
}
