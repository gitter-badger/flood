import {formatMessage, FormattedMessage, injectIntl} from 'react-intl';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

import Dropdown from '../forms/Dropdown';

const METHODS_TO_BIND = [
  'getDropdownHeader',
  'handleItemSelect'
];

class SortDropdown extends React.Component {
  constructor() {
    super();

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getDropdownHeader() {
    return (
      <a className="dropdown__button">
        <label className="dropdown__label">
          <FormattedMessage
            id="torrents.sort.title"
            defaultMessage="Sort By"
          />
        </label>
        <span className="dropdown__value">{this.props.selectedItem.displayName}</span>
      </a>
    );
  }

  getDropdownMenus() {
    let options = [
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.name',
          defaultMessage: 'Name'
        }),
        value: 'name'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.eta',
          defaultMessage: 'ETA'
        }),
        value: 'eta'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.download.speed',
          defaultMessage: 'Download Speed'
        }),
        value: 'downloadRate'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.upload.speed',
          defaultMessage: 'Upload Speed'
        }),
        value: 'uploadRate'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.ratio',
          defaultMessage: 'Ratio'
        }),
        value: 'ratio'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.percentage',
          defaultMessage: 'Percent Complete'
        }),
        value: 'percentComplete'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.download.total',
          defaultMessage: 'Downloaded'
        }),
        value: 'downloadTotal'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.upload.total',
          defaultMessage: 'Uploaded'
        }),
        value: 'uploadTotal'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.size',
          defaultMessage: 'File Size'
        }),
        value: 'sizeBytes'
      },
      {
        displayName: this.props.intl.formatMessage({
          id: 'torrents.sort.added',
          defaultMessage: 'Date Added'
        }),
        value: 'added'
      }
    ];

    let items = options.map((sortProp) => {
      return {
        displayName: sortProp.displayName,
        property: 'sortBy',
        selected: this.props.selectedItem.value === sortProp.value,
        value: sortProp.value
      };
    });

    // Dropdown expects an array of arrays.
    return [items];
  }

  handleItemSelect(sortBy) {
    let direction = this.props.selectedItem.direction;

    if (this.props.selectedItem.value === sortBy.value) {
      direction = direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'asc';
    }

    let sortProperty = {
      direction,
      displayName: sortBy.displayName,
      property: 'sortBy',
      value: sortBy.value
    };

    this.props.onSortChange(sortProperty);
  }

  render() {
    if (this.props.selectedItem == null) {
      return null;
    }

    return (
      <Dropdown
        handleItemSelect={this.handleItemSelect}
        header={this.getDropdownHeader()}
        menuItems={this.getDropdownMenus()} />
    );
  }
}

export default injectIntl(SortDropdown);
