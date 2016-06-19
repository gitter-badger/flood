import classnames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import EventTypes from '../../constants/EventTypes';
import propsMap from '../../../../../shared/constants/propsMap';
import SidebarFilter from './SidebarFilter';
import TorrentFilterStore from '../../stores/TorrentFilterStore';
import TorrentStore from '../../stores/TorrentStore';
import UIActions from '../../actions/UIActions';

const METHODS_TO_BIND = [
  'getFilters',
  'handleClick',
  'onStatusFilterChange',
  'onTrackerFilterChange',
  'onTorrentTrackerCountChange',
  'updateTrackerCount'
];

export default class TrackerFilters extends React.Component {
  constructor() {
    super();

    this.state = {
      trackerCount: {},
      trackerFilter: TorrentFilterStore.getTrackerFilter()
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    TorrentStore.listen(EventTypes.CLIENT_TORRENTS_REQUEST_SUCCESS, this.onTorrentRequestSuccess);
    TorrentFilterStore.listen(EventTypes.CLIENT_TORRENT_TRACKER_COUNT_CHANGE, this.onTorrentTrackerCountChange);
    TorrentFilterStore.listen(EventTypes.UI_TORRENTS_FILTER_TRACKER_CHANGE, this.onTrackerFilterChange);
    TorrentFilterStore.listen(EventTypes.UI_TORRENTS_FILTER_STATUS_CHANGE, this.onStatusFilterChange);
  }

  componentWillUnmount() {
    TorrentFilterStore.unlisten(EventTypes.CLIENT_TORRENT_TRACKER_COUNT_CHANGE, this.onTorrentTrackerCountChange);
    TorrentFilterStore.unlisten(EventTypes.UI_TORRENTS_FILTER_TRACKER_CHANGE, this.onTrackerFilterChange);
    TorrentFilterStore.unlisten(EventTypes.UI_TORRENTS_FILTER_STATUS_CHANGE, this.onStatusFilterChange);
    TorrentFilterStore.fetchTorrentTrackerCount();
  }

  handleClick(filter) {
    UIActions.setTorrentTrackerFilter(filter);
  }

  onStatusFilterChange() {
    this.updateTrackerCount();
  }

  onTrackerFilterChange() {
    this.setState({trackerFilter: TorrentFilterStore.getTrackerFilter()});
  }

  onTorrentRequestSuccess() {
    TorrentFilterStore.fetchTorrentTrackerCount();
  }

  onTorrentTrackerCountChange() {
    this.updateTrackerCount();
  }

  getFilters() {
    let filterItems = Object.keys(this.state.trackerCount);

    let filterElements = filterItems.map((filter, index) => {
      return (
        <SidebarFilter handleClick={this.handleClick}
          count={this.state.trackerCount[filter] || 0}
          key={filter}
          isActive={filter === this.state.trackerFilter}
          name={filter}
          slug={filter} />
      );
    });

    return filterElements;
  }

  updateTrackerCount() {
    let trackerCount = TorrentFilterStore.getTorrentTrackerCount();
    let statusFilter = TorrentFilterStore.getStatusFilter();

    if (statusFilter !== 'all') {
      let torrentCount = 0;
      let torrents = TorrentStore.getAllTorrents();

      Object.keys(trackerCount).forEach((key) => {
        trackerCount[key] = 0;
      });

      Object.keys(torrents).forEach((hash) => {
        let torrent = torrents[hash];

        if (torrent.status.indexOf(propsMap.clientStatus[statusFilter]) > -1) {
          torrentCount++;
          torrent.trackers.forEach((tracker) => {
            trackerCount[tracker]++;
          });
        }
      });

      trackerCount.all = torrentCount;
    }

    this.setState({trackerCount});
  }

  render() {
    let filters = this.getFilters();

    if (filters.length === 0) {
      return null;
    }

    return (
      <ul className="sidebar-filter sidebar__item">
        <li className="sidebar-filter__item sidebar-filter__item--heading">
          <FormattedMessage
            id="statusfilter.title"
            defaultMessage="Filter by Status"
          />
        </li>
        {filters}
      </ul>
    );
  }
}
