import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Section.css';

const styles = {
  sectionVisible: {},
  sectionHidden: {
    visibility: 'hidden',
    height: 0
  }
};

class Section extends Component {
  state = {
    collapsed: true
  };

  constructor (...args) {
    super(...args);
    this.state = {
      collapsed: this.props.collapsed
    };
  }

  UNSAFE_componentWillReceiveProps (newProps) {
    if (this.props.collapsed !== newProps.collapsed) {
      this.setState({
        collapsed: newProps.collapsed
      });
    }
  }

  handleToggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render () {
    const { title, description, children } = this.props;
    const { collapsed } = this.state;
    return (
      <div className='section'>
        <h5 onClick={this.handleToggleCollapsed} style={{ cursor: 'pointer' }}>
          <button className='mdl-button mdl-js-button mdl-button--icon'>
            {collapsed
              ? (
                <i className='material-icons'>expand_more</i>
                )
              : (
                <i className='material-icons'>expand_less</i>
                )}
          </button>
          {title}
        </h5>
        <p>{description}</p>
        <ul className='mdl-list section-list' style={collapsed ? styles.sectionHidden : styles.sectionVisible}>
          {children}
        </ul>
      </div>
    );
  }

  static propTypes = {
    collapsed: PropTypes.bool,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
  };

  static defaultProps = {
    collapsed: true
  };
}

export default Section;
