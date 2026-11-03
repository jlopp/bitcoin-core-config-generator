import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Select ({ value, onChange, values, id, disabled }) {
  const selected = values.find(val => val.value === value) || {};

  // We cannot just remove options, since mdl is adding some additional dom nodes.
  const list = (
    <ul
      className='mdl-menu mdl-menu--bottom-left mdl-js-menu'
      htmlFor={id}
      style={disabled ? { display: 'none' } : {}}
    >
      {
        values.map(({ name, value }) => (
          <li className='mdl-menu__item' data-val={value} key={value} onClick={() => onChange(value)}>{name}</li>
        ))
      }
    </ul>
  );

  return (
    <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select'>
      <input
        onKeyDown={handleKeyPress}
        className={classnames('mdl-textfield__input', {
          'is-disabled': disabled // Overcome mdl light issues
        })}
        disabled={disabled}
        value={selected.name}
        type='text'
        id={id}
        readOnly
        data-val={selected.value}
      />
      {list}
    </div>
  );
}

function handleKeyPress (ev) {
  if (ev.keyCode === 13) {
    ev.target.dispatchEvent(new window.MouseEvent('click'));
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

Select.defaultPropTypes = {
  disabled: false
};

export default Select;
