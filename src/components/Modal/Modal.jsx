import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('ESC pressed');
        this.props.onClose();
      }
    });
  }

  render() {
    return createPortal(
      <Overlay onClick={() => this.props.onClose()}>
        <ModalContent>
          <img src="" alt="Bigger" />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
