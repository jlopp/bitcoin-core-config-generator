import React from 'react';
import PropTypes from 'prop-types';

const heightStyle = { height: '100%' };

function Item ({ title, description, children, disabled, large }) {
  const isDisabled = disabled ? 'disabled' : '';
  return (
    <li
      className={`mdl-list__item mdl-list__item--two-line ${isDisabled}`}
      style={heightStyle}
    >
      <span className='mdl-list__item-primary-content' style={heightStyle}>
        <span>{title}</span>
        <span className='mdl-list__item-sub-title'>
          {description}
        </span>
      </span>
      <span className='mdl-list__item-secondary-content'>
        {children}
      </span>
    </li>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  disabled: PropTypes.bool,
  large: PropTypes.bool
};

Item.defaultPropTypes = {
  disabled: false,
  large: false
};

export default Item;
