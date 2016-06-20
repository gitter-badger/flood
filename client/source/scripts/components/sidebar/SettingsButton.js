import {FormattedMessage} from 'react-intl';
import React from 'react';

import SettingsIcon from '../icons/SettingsIcon';
import UIActions from '../../actions/UIActions';

class SettingsButton extends React.Component {
  constructor() {
    super();
  }

  handleSettingsButtonClick() {
    UIActions.displayModal({id: 'settings'});
  }

  render() {
    return (
      <a className="sidebar__icon-button sidebar__icon-button--settings"
        onClick={this.handleSettingsButtonClick}>
        <FormattedMessage
          id="sidebar.button.settings"
          defaultMessage="Settings"
        /> <SettingsIcon />
      </a>
    );
  }
}

export default SettingsButton;
