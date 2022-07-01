import React, { useState } from 'react';
import Title from './Title';
import Loading from './Loading';
import Search from './Search';
import Preview from './Preview';
import Feature from './Feature';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    info: {},
    records: [],
  });
  const [featuredResult, setFeaturedResult] = useState(null);

  return (
    <div className="app">
      <Title setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
      <Search
        searchResults={searchResults}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
      {isLoading ? <Loading /> : null}
      <Preview
        searchResults={searchResults}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        setFeaturedResult={setFeaturedResult}
      />
      <Feature
        featuredResult={featuredResult}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
    </div>
  );
}

export default App;
