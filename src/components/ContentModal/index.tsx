import React from 'react';
import { closeModal } from 'store/slices/uiSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

const ContentModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, content } = useAppSelector(state => state.ui);

  if (!isOpen || !content) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={handleClose} className="close-button">
          Close
        </button>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        <img src={content.imagePath} alt={content.title} />
      </div>
    </div>
  );
};

export default ContentModal;
