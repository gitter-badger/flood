import React from 'react';

import Badge from '../ui/Badge';

export default class TorrentTrackrs extends React.Component {
  render() {
    let trackers = this.props.trackers || [];

    let trackerCount = trackers.length;
    let trackerTypes = ['http', 'udp', 'dht'];

    let trackerDetails = trackers.map((tracker, index) => {
      return (
        <tr key={index}>
          <td>
            {tracker.url}
          </td>
          <td>
            {trackerTypes[tracker.type - 1]}
          </td>
        </tr>
      );
    });

    if (trackerCount) {
      return (
        <div className="torrent-details__trackers torrent-details__section">
          <table className="torrent-details__table table">
            <thead className="torrent-details__table__heading">
              <tr>
                <th className="torrent-details__table__heading--primary">
                  Trackers
                  <Badge>
                    {trackerCount}
                  </Badge>
                </th>
                <th className="torrent-details__table__heading--secondary">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {trackerDetails}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <span className="torrent-details__section__null-data">
          There is no tracker data for this torrent.
        </span>
      );
    }
  }
}
