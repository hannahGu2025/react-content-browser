import React from 'react';

interface ContentCardProps {
    title: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl, onClick }) => {
    return (
        <div className="content-card" onClick={onClick}>
            <img src={imageUrl} alt={title} className="content-card-image" />
            <h3 className="content-card-title">{title}</h3>
            <p className="content-card-description">{description}</p>
        </div>
    );
};

export default ContentCard;