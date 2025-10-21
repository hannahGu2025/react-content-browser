import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';
import ContentCard from 'components/ContentCard';
import { fetchContent } from 'store/slices/contentSlice';
import useFilterUrlSync from 'hooks/useFilterUrlSync';

import './index.scss';

const ContentList: React.FC = () => {
  // sync filter state <-> URL
  useFilterUrlSync();
  const dispatch = useDispatch<AppDispatch>();
  const contentItems = useSelector((state: RootState) => state.content.filteredItems);
  const status = useSelector((state: RootState) => state.content.status);
  const error = useSelector((state: RootState) => state.content.error);

  React.useEffect(() => {
    dispatch(fetchContent({}));
  }, [dispatch]);

  return (
    <div className="content-list">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status !== 'loading' && contentItems.length === 0 && <p>No content available.</p>}
      {contentItems.map(item => (
        <ContentCard
          key={item.id}
          {...item}
          imageUrl={item?.imagePath || ''}
          onClick={() => console.log(item.id)}
        />
      ))}
    </div>
  );
};

export default ContentList;
