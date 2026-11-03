import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dist/dialog-polyfill.css';
import './Modal.css';

class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.dialogRef = React.createRef();
  }

  close () {
    this.dialogRef.current.close();
  }

  show () {
    this.dialogRef.current.showModal();
  }

  componentDidMount () {
    const dialog = this.dialogRef.current;
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
      <dialog className='mdl-dialog' ref={this.dialogRef}>
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
