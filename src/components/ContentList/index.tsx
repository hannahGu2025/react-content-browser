import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';
import ContentCard from 'components/ContentCard';
import { fetchContent } from 'store/slices/contentSlice';
import useFilterUrlSync from 'hooks/useFilterUrlSync';
import { useAppSelector } from 'store/hooks';

import './index.scss';

const ContentList: React.FC = () => {
  // sync filter state <-> URL
  useFilterUrlSync();
  const dispatch = useDispatch<AppDispatch>();
  const contentItems = useSelector((state: RootState) => state.content.filteredItems);
  const status = useSelector((state: RootState) => state.content.status);
  const error = useSelector((state: RootState) => state.content.error);
  const currentPage = useAppSelector((s: RootState) => s.content.currentPage);
  const itemsPerPage = useAppSelector((s: RootState) => s.content.itemsPerPage);
  const hasMore = useAppSelector((s: RootState) => s.content.hasMore);
  const initialLoaded = useAppSelector((s: RootState) => s.content.initialLoaded);

  const loaderRef = React.useRef<HTMLDivElement | null>(null);
  const loadingRef = React.useRef(false);

  React.useEffect(() => {
   if (!initialLoaded && contentItems.length === 0 && status !== 'loading') {
     dispatch(fetchContent({ page: 1, pageSize: itemsPerPage }));
    }
  }, [dispatch, contentItems.length, itemsPerPage, status, initialLoaded]);

  React.useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (contentItems.length === 0) return;
          if (loadingRef.current) return;
          if (status === 'loading') return;
          if (!hasMore) return;

          loadingRef.current = true;
          const nextPage = (currentPage || 1) + 1;
          dispatch(fetchContent({ page: nextPage, pageSize: itemsPerPage })).finally(() => {
            loadingRef.current = false;
          });
        });
      },
      { root: null, rootMargin: '300px', threshold: 0.1 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [dispatch, currentPage, itemsPerPage, status, hasMore]);

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
      {/* sentinel for infinite scroll */}
      <div ref={loaderRef} style={{ height: 1 }} aria-hidden />

      {!hasMore && <div className="content-list__end">No more items</div>}
    </div>
  );
};

export default ContentList;
