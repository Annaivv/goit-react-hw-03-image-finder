import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';

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
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <ImSearch />
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}
