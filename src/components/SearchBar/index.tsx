import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from 'store/slices/contentSlice';
import useDebouncedSearch from 'hooks/useDebouncedSearch';

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTermState] = React.useState('');

    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

    React.useEffect(() => {
        dispatch(setSearchTerm(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermState(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;