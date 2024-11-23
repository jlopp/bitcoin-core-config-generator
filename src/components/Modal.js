import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import dialogPolyfill from 'dialog-polyfill/dialog-polyfill.js';
import 'dialog-polyfill/dialog-polyfill.css';
import './Modal.css';

class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object
  };

  close () {
    ReactDOM.findDOMNode(this).close();
  }

  show () {
    ReactDOM.findDOMNode(this).showModal();
  }

  componentDidMount () {
    const dialog = ReactDOM.findDOMNode(this);
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    if (this.props.isOpen) {
      // Delay is a workaround for paint issue (modal overlay not showing up)
      setTimeout(() => { this.show(); }, 100);
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen && !this.props.isOpen) {
      this.close();
    } else if (!prevProps.isOpen && this.props.isOpen) {
      this.show();
    }
  }

  render () {
    return (
      <dialog className='mdl-dialog'>
        <h4 className='mdl-dialog__title'>{this.props.title}</h4>
        <div className='mdl-dialog__content'>
          {this.props.children}
        </div>
        <div className='mdl-dialog__actions'>
          <button type='button' className='mdl-button close' onClick={this.props.onClose}>OK</button>
        </div>
      </dialog>
    );
  }
}

export default Modal;
