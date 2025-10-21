import React from 'react';
import ContentFilter from '../components/ContentFilter';
import ContentList from '../components/ContentList';

const Home: React.FC = () => {
    
    return (
        <div>
            <h1>Content Browser</h1>
            <ContentFilter />
            <ContentList />
        </div>
    );
};

export default Home;