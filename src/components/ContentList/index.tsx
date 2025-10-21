import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/store';
import ContentCard from 'components/ContentCard';
// import 'styles.css';

const ContentList: React.FC = () => {
    const contentItems = useSelector((state: RootState) => state.content.items);
    const loading = useSelector((state: RootState) => state.ui.loading);

    return (
        <div className="content-list">
            {loading && <p>Loading...</p>}
            {contentItems.length === 0 && !loading && <p>No content available.</p>}
            {contentItems.map(item => (
                <ContentCard
                    key={item.id}
                    {...item}
                    imageUrl={item?.imagePath}
                    onClick={() => console.log(item.id)}
                />
            ))}
        </div>
    );
};

export default ContentList;