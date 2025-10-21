import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from 'store/slices/uiSlice';
import { RootState } from 'store/store';

const ContentModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, content } = useSelector((state: RootState) => state.ui);

    if (!isOpen || !content) {
        return null;
    }

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={handleClose} className="close-button">Close</button>
                <h2>{content.title}</h2>
                <p>{content.description}</p>
                <img src={content.imageUrl} alt={content.title} />
            </div>
        </div>
    );
};

export default ContentModal;