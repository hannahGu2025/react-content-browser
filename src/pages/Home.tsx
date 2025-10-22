import React from 'react';
import ContentFilter from 'components/ContentFilter';
import ContentList from 'components/ContentList';
import SearchBar from 'components/SearchBar';

import './Home.scss';

const Home: React.FC = () => {
  return (
     <div className="page">
      <header className="page__header">
        <SearchBar />
        <ContentFilter />
      </header>

      <main className="page__content">
        <ContentList />
      </main>
    </div>
  );
};

export default Home;
