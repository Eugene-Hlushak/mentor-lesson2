import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange = e => this.setState({ searchQuery: e.target.value });

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
      </SearchFormStyled>
    );
  }
}
