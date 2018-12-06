import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term)
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleSearch(event) {
    if(event.keyCode === 13) {
      this.search()
    }

  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange}

        // Attribute for handleSearch
        onKeyDown={this.handleSearch}

        placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search} >SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
