import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import App from '../App/App';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onclick={this.props.playAudio} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
