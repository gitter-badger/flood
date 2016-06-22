import {FormattedMessage} from 'react-intl';
import React from 'react';

import Badge from '../ui/Badge';
import DirectoryTree from '../filesystem/DirectoryTree';
import File from '../icons/File';
import FolderOpenSolid from '../icons/FolderOpenSolid';
import format from '../../util/formatData';

export default class TorrentPeers extends React.Component {
  render() {
    let peers = this.props.peers;

    if (peers) {
      let peerList = peers.map((peer, index) => {
        let downloadRate = format.data(peer.downloadRate, '/s');
        let uploadRate = format.data(peer.uploadRate, '/s');
        return (
          <tr key={index}>
            <td>{peer.address}</td>
            <td>
              {downloadRate.value}
              <em className="unit">{downloadRate.unit}</em>
            </td>
            <td>
              {uploadRate.value}
              <em className="unit">{uploadRate.unit}</em>
            </td>
          </tr>
        );
      });

      return (
        <div className="torrent-details__peers torrent-details__section">
          <table className="torrent-details__table table">
            <thead className="torrent-details__table__heading">
              <tr>
                <th className="torrent-details__table__heading--primary">
                  <FormattedMessage
                    id="torrents.details.peers"
                    defaultMessage="Peers"
                  />
                  <Badge>
                    {peers.length}
                  </Badge>
                </th>
                <th className="torrent-details__table__heading--secondary">
                  DL
                </th>
                <th className="torrent-details__table__heading--secondary">
                  UL
                </th>
              </tr>
            </thead>
            <tbody>
              {peerList}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <span className="torrent-details__section__null-data">
          <FormattedMessage
            id="torrents.details.peers.no.data"
            defaultMessage="There is no peer data for this torrent."
          />
        </span>
      );
    }
  }
}
