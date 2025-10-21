import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store/store';
import { setSearchTerm } from 'store/slices/contentSlice';
import useDebouncedSearch from 'hooks/useDebouncedSearch';
import './index.scss';

const SearchBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTermState] = React.useState('');

    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

    React.useEffect(() => {
        dispatch(setSearchTerm(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermState(event.target.value);
    };
      const performSearch = React.useCallback(() => {
        dispatch(setSearchTerm(searchTerm));
    }, [dispatch, searchTerm]);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const focusInput = () => inputRef.current?.focus();

    return (
        <div className="rcb-search-wrapper">
            <div className="rcb-search-container">
                <div className="rcb-input-area" onClick={focusInput}>
                    <input
                        ref={inputRef}
                        className="rcb-input"
                        type="text"
                        placeholder="Find the Items you're looking for"
                        value={searchTerm}
                        onChange={handleChange}
                        aria-label="Search content"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                performSearch();
                            }
                        }}
                    />
                </div>

                <button
                    type="button"
                    className="rcb-search-btn"
                    onClick={performSearch}
                    aria-label="Open search"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;