import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';

import TopBar from './components/TopBar';
import Modal from './components/Modal';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Presets from './components/Presets';

import { detectPlatform } from './system';
import data from './data.json';

function loadFromURL () {
  const hash = window.location.hash;
  if (!hash.startsWith('#config=')) {
    return null;
  }

  try {
    const config = hash.split('=')[1];
    return JSON.parse(window.atob(config));
  } catch (e) {
    console.warn('Error parsing config from URL: ', e);
    return null;
  }
}

function loadFromLocalStorage () {
  try {
    return JSON.parse(window.localStorage.getItem('last-config'));
  } catch (e) {
    window.localStorage.setItem('last-config', null);
    return null;
  }
}

function loadSettings () {
  const defaultSettings = generateDefaults(data);
  try {
    let settings = loadFromLocalStorage();
    const url = loadFromURL();
    if (settings && url) {
      const diff = JSON.stringify(settings) !== JSON.stringify(url);
      if (diff && window.confirm('Detected config in URL. Do you want to override your current config?')) {
        settings = null;
      }
    }
    if (!settings && url) {
      settings = url;
    }
    if (settings && typeof settings === 'object') {
      // make sure the sections are always created
      const errors = [];
      Object.keys(defaultSettings).forEach(key => {
        settings[key] = settings[key] || {};
        Object.keys(defaultSettings[key]).forEach(prop => {
          let settingsValue = settings[key][prop];
          let defaultSettingsValue = defaultSettings[key][prop];
          if (settingsValue === undefined) {
            settings[key][prop] = defaultSettingsValue;
          } else if (typeof settingsValue !== typeof defaultSettingsValue) {
            errors.push({
              section: key,
              prop,
              value: settingsValue,
              type: typeof settingsValue,
              expected: typeof defaultSettingsValue});
            console.error(`Incorrect type for config item ${key}.${prop} with value ${JSON.stringify(settingsValue)} (found ${typeof settingsValue}, expected ${typeof defaultSettingsValue})`);
            settings[key][prop] = defaultSettingsValue;
          }
        });
      });
      return {settings, errors};
    }
  } catch (e) {
    console.warn(e);
  }

  return {settings: defaultSettings, errors: []};
}

function saveSettings (settings) {
  const defaultSettings = generateDefaults(data);
  const cloned = JSON.parse(JSON.stringify(settings));

  Object.keys(defaultSettings).forEach(section => {
    Object.keys(defaultSettings[section]).forEach(prop => {
      if (isEqual(cloned[section][prop], defaultSettings[section][prop])) {
        delete cloned[section][prop];
      }
    });

    if (Object.keys(cloned[section]).length === 0) {
      delete cloned[section];
    }
  });

  const json = JSON.stringify(cloned);
  try {
    window.localStorage.setItem('last-config', json);
    window.location.hash = 'config=' + window.btoa(json);
  } catch (e) {
  }
}

class App extends Component {
  constructor (props) {
    super(props);

    const {settings, errors} = loadSettings();

    let modal;
    if (!errors.length) {
      modal = {visible: false};
    } else {
      let lis = errors.map(({section, prop, value, type, expected}, i) =>
        (<li key={i}><em>{section}.{prop}</em> has value <em>{JSON.stringify(value)}</em> of type <em>{type}</em>; expected type <em>{expected}</em></li>));
      modal = {
        visible: true,
        title: 'Warning',
        content: (
          <Fragment>
            <p>{lis.length > 1 ? 'Some items' : 'An item'} couldn't be parsed from the loaded config:</p>
            <ul>{lis}</ul>
          </Fragment>
        )
      };
    }

    this.state = {
      preset: undefined,
      settings,
      defaults: generateDefaults(data),
      modal
    };
  }

  handleChange = (settings) => {
    saveSettings(settings);
    this.setState({
      preset: undefined,
      settings
    });
  };

  handlePreset = (preset, settings) => {
    saveSettings(settings);
    this.setState({
      preset,
      settings
    });
  };

  render () {
    const {settings, defaults, preset, modal} = this.state;

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <TopBar />
        <main className='mdl-layout__content'>
          <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet'>
              <Editor settings={settings} onChange={this.handleChange} />
            </div>
            <div className='mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet'>
              <Presets preset={preset} defaults={defaults} onChange={this.handlePreset} />
              <Preview settings={settings} defaults={defaults} />
            </div>
          </div>
        </main>
        <Modal title={modal.title} isOpen={modal.visible} onClose={() => this.setState({modal: {visible: false}})}>
          {modal.content}
        </Modal>
      </div>
    );
  }
}

function generateDefaults (settings) {
  const defaults = Object.keys(settings).reduce((data, section) => {
    data[section] = Object.keys(settings[section])
      .filter(key => settings[section][key].default !== undefined)
      .reduce((d, key) => {
        d[key] = settings[section][key].default;
        return d;
      }, {});
    return data;
  }, {});

  defaults.__internal.platform = detectPlatform();
  return defaults;
}

export default App;
