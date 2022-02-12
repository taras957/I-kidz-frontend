import React from 'react';
import Modal from 'react-modal';
import { useModal } from 'components/common/modal';

Modal.setAppElement('#__next');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 12,
  },
};

const Dialog = (props) => {
  const { isOpen } = useModal();
  return <Modal isOpen={isOpen} style={customStyles} {...props} />;
};

export default Dialog;
