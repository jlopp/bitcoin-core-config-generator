import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './Section';
import Item from './Item';
import Select from './controls/Select';

import { localPath, basePath, joinPath } from '../system';
import data from '../data.json';

class Editor extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  change = (data, name) => {
    return value => {
      data[name] = value;
      this.props.onChange({...this.props.settings});
    };
  };

  render () {
    const {settings} = this.props;
    const platform = settings.__internal.platform;
    const base = settings.core.datadir !== '$BASE' ? settings.core.datadir : basePath(platform);

    // handle config dependencies here
    if (settings.network.peerblockfilters === 1 && settings.core.blockfilterindex !== "1") {
      settings.core.blockfilterindex = "1";
    }

    return (
      <div>
        { this.select('__internal', 'platform') }

        <Section title={data.core.section} description={data.core.description}>
          { this.text('core', 'alertnotify') }
          { this.select('core', 'blockfilterindex') }
          { this.text('core', 'blocknotify') }
          { this.path('core', 'blocksdir', base, platform) }
          { this.flag('core', 'blocksonly') }
          { this.text('core', 'assumevalid') }
          { this.flag('core', 'coinstatsindex') }
          { this.flag('core', 'daemon') }
          { this.flag('core', 'daemonwait') }
          { this.path('core', 'datadir', base, platform) }
          { this.number('core', 'dbbatchsize') }
          { this.number('core', 'dbcache') }
          { this.text('core', 'includeconf') }
          { this.text('core', 'loadblock') }
          { this.number('core', 'maxorphantx') }
          { this.number('core', 'maxmempool') }
          { this.number('core', 'mempoolexpiry') }
          { this.flag('core', 'persistmempool') }
          { this.text('core', 'minimumchainwork') }
          { this.number('core', 'blockreconstructionextratxn') }
          { this.number('core', 'par') }
          { this.text('core', 'pid') }
          { this.number('core', 'prune') }
          { this.flag('core', 'reindex-chainstate') }
          { this.flag('core', 'reindex') }
          { this.select('core', 'sandbox') }
          { this.text('core', 'settings') }
          { this.text('core', 'startupnotify') }
          { this.flag('core', 'sysperms') }
          { this.flag('core', 'txindex') }
        </Section>
        <Section title={data.debug.section} description={data.debug.description}>
          { this.text('debug', 'uacomment') }
          { this.flag('debug', 'addrmantest') }
          { this.flag('debug', 'capturemessages') }
          { this.number('debug', 'checkblocks') }
          { this.number('debug', 'checklevel') }
          { this.number('debug', 'checkaddrman') }
          { this.number('debug', 'checkmempool') }
          { this.flag('debug', 'checkpoints') }
          { this.decimal('debug', 'dbcrashratio') }
          { this.flag('debug', 'fastprune') }
          { this.flag('debug', 'stopafterblockimport') }
          { this.number('debug', 'stopatheight') }
          { this.text('debug', 'testactivationheight') }
          { this.number('debug', 'limitancestorcount') }
          { this.number('debug', 'limitancestorsize') }
          { this.number('debug', 'limitdescendantcount') }
          { this.number('debug', 'limitdescendantsize') }
          { this.select('debug', 'debug') }
          { this.select('debug', 'debugexclude') }
          { this.path('debug', 'debuglogfile', base, platform) }
          { this.flag('debug', 'logips') }
          { this.text('debug', 'loglevel') }
          { this.flag('debug', 'logsourcelocations') }
          { this.flag('debug', 'logthreadnames') }
          { this.flag('debug', 'logtimestamps') }
          { this.flag('debug', 'logtimemicros') }
          { this.number('debug', 'mocktime') }
          { this.number('debug', 'maxsigcachesize') }
          { this.number('debug', 'maxtipage') }
          { this.decimal('debug', 'maxtxfee') }
          { this.flag('debug', 'printtoconsole') }
          { this.flag('debug', 'printpriority') }
          { this.text('debug', 'promiscuousmempoolflags') }
          { this.flag('debug', 'shrinkdebugfile') }
        </Section>
        <Section title={data.chain.section} description={data.chain.description}>
          { this.select('chain', 'chain') }
          { this.flag('chain', 'regtest') }
          { this.flag('chain', 'signet') }
          { this.text('chain', 'signetchallenge') }
          { this.text('chain', 'signetseednode') }
          { this.flag('chain', 'testnet') }
          { this.text('chain', 'vbparams') }
        </Section>
        <Section title={data.mining.section} description={data.mining.description}>
          { this.number('mining', 'blockmaxweight') }
          { this.decimal('mining', 'blockmintxfee') }
          { this.text('mining', 'blockversion') }
        </Section>
        <Section title={data.network.section} description={data.network.description}>
          { this.text('network', 'addnode') }
          { this.path('network', 'asmap', base, platform) }
          { this.number('network', 'bantime') }
          { this.text('network', 'bind') }
          { this.flag('network', 'cjdnsreachable') }
          { this.text('network', 'connect') }
          { this.flag('network', 'discover') }
          { this.flag('network', 'dns') }
          { this.flag('network', 'dnsseed') }
          { this.text('network', 'externalip') }
          { this.flag('network', 'fixedseeds') }
          { this.flag('network', 'forcednsseed') }
          { this.flag('network', 'i2pacceptincoming') }
          { this.text('network', 'i2psam') }
          { this.flag('network', 'listen') }
          { this.flag('network', 'listenonion') }
          { this.number('network', 'maxconnections') }
          { this.number('network', 'maxreceivebuffer') }
          { this.number('network', 'maxsendbuffer') }
          { this.number('network', 'maxtimeadjustment') }
          { this.flag('network', 'natpmp') }
          { this.flag('network', 'networkactive') }
          { this.text('network', 'onion') }
          { this.select('network', 'onlynet') }
          { this.flag('network', 'peerblockfilters') }
          { this.flag('network', 'peerbloomfilters') }
          { this.number('network', 'peertimeout') }
          { this.number('network', 'port') }
          { this.text('network', 'proxy') }
          { this.flag('network', 'proxyrandomize') }
          { this.text('network', 'seednode') }
          { this.number('network', 'timeout') }
          { this.text('network', 'torcontrol') }
          { this.text('network', 'torpassword') }
          { this.flag('network', 'upnp') }
          { this.text('network', 'whitebind') }
          { this.text('network', 'whitelist') }
          { this.number('network', 'maxuploadtarget') }
        </Section>
        <Section title={data.relay.section} description={data.relay.description}>
          { this.flag('relay', 'acceptnonstdtxn') }
          { this.decimal('relay', 'incrementalrelayfee') }
          { this.decimal('relay', 'dustrelayfee') }
          { this.number('relay', 'bytespersigop') }
          { this.flag('relay', 'datacarrier') }
          { this.number('relay', 'datacarriersize') }
          { this.flag('relay', 'mempoolfullrbf') }
          { this.flag('relay', 'permitbaremultisig') }
          { this.decimal('relay', 'minrelaytxfee') }
          { this.flag('relay', 'whitelistrelay') }
        </Section>
        <Section title={data.rpc.section} description={data.rpc.description}>
          { this.multiselect('rpc', 'deprecatedrpc') }
          { this.flag('rpc', 'server') }
          { this.flag('rpc', 'rest') }
          { this.text('rpc', 'rpcbind') }
          { this.flag('rpc', 'rpcdoccheck') }
          { this.path('rpc', 'rpccookiefile', base, platform) }
          { this.text('rpc', 'rpcauth') }
          { this.number('rpc', 'rpcport') }
          { this.text('rpc', 'rpcallowip') }
          { this.flag('rpc', 'rpcwhitelistdefault') }
          { this.text('rpc', 'rpcwhitelist') }
          { this.number('rpc', 'rpcthreads') }
          { this.number('rpc', 'rpcworkqueue') }
          { this.select('rpc', 'rpcserialversion') }
          { this.number('rpc', 'rpcservertimeout') }
        </Section>
        <Section title={data.wallet.section} description={data.wallet.description}>
          { this.select('wallet', 'addresstype') }
          { this.flag('wallet', 'avoidpartialspends') }
          { this.select('wallet', 'changetype') }
          { this.decimal('wallet', 'consolidatefeerate') }
          { this.flag('wallet', 'disablewallet') }
          { this.number('wallet', 'keypool') }
          { this.decimal('wallet', 'fallbackfee') }
          { this.decimal('wallet', 'discardfee') }
          { this.decimal('wallet', 'maxapsfee') }
          { this.decimal('wallet', 'mintxfee') }
          { this.decimal('wallet', 'paytxfee') }
          { this.text('wallet', 'signer') }
          { this.flag('wallet', 'spendzeroconfchange') }
          { this.text('wallet', 'rootcertificates') }
          { this.number('wallet', 'txconfirmtarget') }
          { this.flag('wallet', 'unsafesqlitesync') }
          { this.flag('wallet', 'walletrbf') }
          { this.text('wallet', 'wallet') }
          { this.path('wallet', 'walletdir', base, platform) }
          { this.flag('wallet', 'walletbroadcast') }
          { this.text('wallet', 'walletnotify') }
          { this.number('wallet', 'dblogsize') }
          { this.flag('wallet', 'flushwallet') }
          { this.flag('wallet', 'privdb') }
          { this.flag('wallet', 'walletrejectlongchains') }
          { this.flag('wallet', 'walletcrosschain') }
        </Section>
        <Section title={data.zeromq.section} description={data.zeromq.description}>
          { this.text('zeromq', 'zmqpubhashblock') }
          { this.text('zeromq', 'zmqpubhashtx') }
          { this.text('zeromq', 'zmqpubrawblock') }
          { this.text('zeromq', 'zmqpubrawtx') }
          { this.text('zeromq', 'zmqpubsequence') }
          { this.number('zeromq', 'zmqpubhashblockhwm') }
          { this.number('zeromq', 'zmqpubhashtxhwm') }
          { this.number('zeromq', 'zmqpubrawblockhwm') }
          { this.number('zeromq', 'zmqpubrawtxhwm') }
          { this.number('zeromq', 'zmqpubsequencehwm') }
        </Section>
      </div>
    );
  }

  select (section, prop, isEnabled = true) {
    check(section, prop);

    // TODO [ToDr] hacky
    const {configMode} = this;

    const {settings} = this.props;
    const value = or(settings[section][prop], data[section][prop].default);
    const description = fillDescription(data[section][prop].description[value], value, `${section}.${prop}`);

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
      >
        <Select
          onChange={this.change(settings[section], prop)}
          value={value}
          values={data[section][prop].values.map(val)}
          id={`${configMode}_${prop}`}
          disabled={!isEnabled}
        />
      </Item>
    );
  }

  multiselect (section, prop, isEnabled = true) {
    check(section, prop);

    // TODO [ToDr] hacky
    const {configMode} = this;

    const {settings} = this.props;
    const current = settings[section][prop];
    var description;

    if (current === undefined || current.length === 0) {
      description = '';
    } else {
      description = fillDescription(data[section][prop].description, current);
    }

    const change = (val) => (ev) => {
      const {checked} = ev.target;
      const newValue = [...current];
      const idx = newValue.indexOf(val);

      if (checked) {
        newValue.push(val);
      } else if (idx !== -1) {
        newValue.splice(idx, 1);
      }
      this.change(settings[section], prop)(newValue);
    };

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
        large
        >
        {data[section][prop].values.map(val).map(value => {
          const id = `${configMode}_${section}_${prop}_${value.value}`;

          return (
            <label className='mdl-switch mdl-js-switch' htmlFor={id} key={value.name}>
              <input
                type='checkbox'
                id={id}
                className='mdl-switch__input'
                checked={current.indexOf(value.value) !== -1}
                disabled={!isEnabled}
                onChange={change(value.value)}
                />
              <span className='mdl-switch__label'>{value.name}</span>
            </label>
          );
        })}
      </Item>
    );
  }

  number (section, prop, isEnabled = true) {
    check(section, prop);
    const {settings} = this.props;
    const value = or(settings[section][prop], data[section][prop].default);
    const description = fillDescription(data[section][prop].description, value);

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
      >
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <input
            className='mdl-textfield__input'
            type='number'
            value={value || 0}
            onChange={(ev) => this.change(settings[section], prop)(Number(ev.target.value))}
            min={data[section][prop].min}
            max={data[section][prop].max}
            disabled={!isEnabled}
          />
          <span className='mdl-textfield__error'>Please provide a valid number (min: {data[section][prop].min}, max: {data[section][prop].max})</span>
        </div>
      </Item>
    );
  }

  decimal (section, prop, isEnabled = true) {
    check(section, prop);
    const {settings} = this.props;
    const value = or(settings[section][prop], data[section][prop].default);
    const description = fillDescription(data[section][prop].description, value);

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
      >
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <input
            className='mdl-textfield__input'
            type='number'
            step='0.00000001'
            value={value || 0}
            onChange={(ev) => this.change(settings[section], prop)(Number(ev.target.value))}
            min={data[section][prop].min}
            max={data[section][prop].max}
            disabled={!isEnabled}
          />
          <span className='mdl-textfield__error'>Please provide a valid number (min: {data[section][prop].min}, max: {data[section][prop].max})</span>
        </div>
      </Item>
    );
  }

  path (section, prop, base, platform, isEnabled = true) {
    return this.text(section, prop, isEnabled, value => {
      if (!value) {
        return value;
      }
      value = value.replace('$LOCAL', localPath(platform));
      value = value.replace('$BASE', base);
      // normalize separators
      value = joinPath(value.split('\\'), platform);
      value = joinPath(value.split('/'), platform);
      return value;
    });
  }

  text (section, prop, isEnabled = true, processValue = x => x) {
    check(section, prop);
    const {settings} = this.props;
    const value = processValue(or(settings[section][prop], data[section][prop].default));
    const description = fillDescription(data[section][prop].description, value);

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
      >
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <input
            className='mdl-textfield__input'
            type='text'
            value={value || ''}
            onChange={(ev) => this.change(settings[section], prop)(ev.target.value)}
            disabled={!isEnabled}
          />
        </div>
      </Item>
    );
  }

  flag (section, prop, isEnabled = true) {
    check(section, prop);

    // TODO [ToDr] hacky
    const {configMode} = this;

    const {settings} = this.props;
    const value = or(settings[section][prop], data[section][prop].default);
    const description = fillDescription(data[section][prop].description, value);
    const id = `${configMode}_${section}_${prop}`;

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
        >
        <label className='mdl-switch mdl-js-switch' htmlFor={id}>
          <input
            type='checkbox'
            id={id}
            className='mdl-switch__input'
            checked={value}
            disabled={!isEnabled}
            onChange={(ev) => this.change(settings[section], prop)(ev.target.checked ? 1 : 0)}
          />
          <span className='mdl-switch__label' />
        </label>
      </Item>
    );
  }

  list (section, prop, isEnabled = true) {
    check(section, prop);
    const {settings} = this.props;
    const value = or(settings[section][prop], data[section][prop].default);
    const description = fillDescription(data[section][prop].description, value.toString());

    return (
      <Item
        title={data[section][prop].name}
        description={description}
        disabled={!isEnabled}
      >
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          {value.map((v, idx) => (
            <input
              disabled={!isEnabled}
              key={idx}
              className='mdl-textfield__input'
              type='text'
              value={v || ''}
              onChange={(ev) => {
                const newValue = [...value];
                if (ev.target.value !== '') {
                  newValue[idx] = ev.target.value;
                } else {
                  delete newValue[idx];
                }
                this.change(settings[section], prop)(newValue);
              }}
            />
          ))}
          <br />
          <button
            style={{bottom: 0, right: 0, zIndex: 10, transform: 'scale(0.5)'}}
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect'
            onClick={() => this.change(settings[section], prop)(value.concat(['']))}
            disabled={!isEnabled}
          >
            <i className='material-icons'>add</i>
          </button>
        </div>
      </Item>
    );
  }
}

export function fillDescription (description, value, key) {
  if (!description) {
    console.warn(`Cant find description for: value:${value} at ${key}`);
    return 'unknown entry';
  }

  if (typeof description === 'object') {
    // If the description value is an array, concatenate the descriptions
    if (Array.isArray(value)) {
      var formatted = '';
      for (var val in value) {
        if ({}.hasOwnProperty.call(value, val)) {
          formatted += description[value[val]] + ',';
        }
      }
      // remove trailing comma
      formatted = formatted.replace(/(,$)/g, "");
      return formatted;
    }
    // If there is a single value and it exists in the description mapping, return it
    if (description[value] !== undefined) {
      return description[value];
    }
    return description.value;
  }
  return description.replace(/{}/g, value || '');
}

function or (value, def) {
  if (value === undefined) {
    return def;
  }
  return value;
}

function check (section, prop) {
  if (!data[section][prop]) {
    throw new Error(`Can't find data for ${section}.${prop}`);
  }
}

function val (data) {
  const match = data.match(/(.+)\s+\[(.+)]/);
  if (!match) {
    return { name: data, value: data };
  }

  return {
    name: match[1],
    value: match[2]
  };
}

export default Editor;
