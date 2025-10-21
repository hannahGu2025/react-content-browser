import React from 'react';
import ContentFilter from 'components/ContentFilter';
import ContentList from 'components/ContentList';
import SearchBar from 'components/SearchBar';

const Home: React.FC = () => {
    
    return (
        <div style={{background:'#000'}}>
            <SearchBar/>
            <ContentFilter />
            <ContentList />
        </div>
    );
};

export default Home;