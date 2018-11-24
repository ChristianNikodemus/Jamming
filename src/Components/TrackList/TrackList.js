import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import App from '../App/App';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
      {
        this.props.tracks.map((track, index) => {
          return <Track track={track}
          key={index}
          onAdd={this.props.onAdd}
          isRemoval={this.props.isRemoval}
          onRemove={this.props.onRemove} />
        })
      }
      </div>
    );
  }
}

export default TrackList;
