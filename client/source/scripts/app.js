import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/layout/Application';
import ApplicationContent from './components/layout/ApplicationContent';
import ApplicationLoadingIndicator from './components/layout/ApplicationLoadingIndicator';
import Modals from './components/modals/Modals';
import Notifications from './components/notifications/Notifications';
import Sidebar from './components/panels/Sidebar';
import SettingsStore from './stores/SettingsStore';
import TorrentActions from './actions/TorrentActions';
import TorrentListView from './components/panels/TorrentListView';

class FloodApp extends React.Component {
  componentDidMount() {
    SettingsStore.fetchClientSettings();
    SettingsStore.fetchFloodSettings();
  }

  render() {
    return (
      <Application>
        <ApplicationLoadingIndicator />
        <Sidebar />
        <ApplicationContent>
          <TorrentListView />
        </ApplicationContent>
        <Modals />
        <Notifications />
      </Application>
    );
  }
}


ReactDOM.render(<FloodApp />, document.getElementById('app'));
