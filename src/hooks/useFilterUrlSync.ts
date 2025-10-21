import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setPricingOptions, setSearchTerm } from 'store/slices/contentSlice';

export default function useFilterUrlSync() {
  const dispatch = useAppDispatch();

  const searchKeyword = useAppSelector(s => s.content.searchKeyword);
  const selectedPricingOptions = useAppSelector(s => s.content.selectedPricingOptions);

  // hydrate store once from URL on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    const pricingParam = params.get('pricing') ?? '';
    const pricing = pricingParam
      ? pricingParam
          .split(',')
          .map(n => Number(n))
          .filter(n => !Number.isNaN(n))
      : [];

    if (q) dispatch(setSearchTerm(q));
    if (pricing.length) dispatch(setPricingOptions(pricing));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // run only once

  // push store -> url when filters change
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchKeyword && searchKeyword.trim()) params.set('q', searchKeyword.trim());
    if (Array.isArray(selectedPricingOptions) && selectedPricingOptions.length > 0) {
      params.set('pricing', selectedPricingOptions.join(','));
    }

    const next = params.toString() ? `?${params.toString()}` : '';
    const current = window.location.search || '';
    if (next !== current) {
      const newUrl = window.location.pathname + next + window.location.hash;
      window.history.replaceState(null, '', newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword, selectedPricingOptions, window.location.pathname]);
}
