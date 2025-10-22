import React from 'react';
import ContentCard from 'components/ContentCard';
import { fetchContent } from 'store/slices/contentSlice';
import useFilterUrlSync from 'hooks/useFilterUrlSync';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import './index.scss';

const ContentList: React.FC = () => {
  // sync filter state <-> URL
  useFilterUrlSync();
  const dispatch = useAppDispatch();
  const contentItems = useAppSelector(state => state.content.filteredItems);
  const status = useAppSelector(state => state.content.status);
  const error = useAppSelector(state => state.content.error);
  const currentPage = useAppSelector(state => state.content.currentPage);
  const itemsPerPage = useAppSelector(state => state.content.itemsPerPage);
  const hasMore = useAppSelector(state => state.content.hasMore);
  const initialLoaded = useAppSelector(state => state.content.initialLoaded);

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
      {status === 'loading' && (
        <div className="content-list__status content-list__status--loading" role="status" aria-live="polite">
          <span className="content-list__spinner" aria-hidden />
          <span>Loading…</span>
        </div>
      )}
      {status === 'failed' && (
        <div className="content-list__status content-list__status--error" role="alert">
          <span>{error || 'Failed to load content.'}</span>
        </div>
      )}
      {status !== 'loading' && contentItems.length === 0 && (
        <div className="content-list__status content-list__status--empty" aria-live="polite">
          <span>No content available.</span>
        </div>
      )}
      {contentItems.map((item,index) => (
        <ContentCard
          key={`${index}-${item.id}`}
          {...item}
          imagePath={item?.imagePath || ''}
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
