import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceFilter, resetFilters } from 'store/slices/contentSlice';

const ContentFilter: React.FC = () => {
    const dispatch = useDispatch();
    const [priceRange, setPriceRange] = useState<string>('all');

    const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
        dispatch(setPriceFilter(event.target.value));
    };

    const handleReset = () => {
        setPriceRange('all');
        dispatch(resetFilters());
    };

    return (
        <div className="content-filter">
            <label htmlFor="price-range">Filter by Price:</label>
            <select id="price-range" value={priceRange} onChange={handlePriceChange}>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button onClick={handleReset}>Reset Filters</button>
        </div>
    );
};

export default ContentFilter;