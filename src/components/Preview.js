import React from 'react';

import { fetchQueryResultsFromURL } from '../api/api';

const Preview = (props) => {
  const { searchResults, setIsLoading, setSearchResults, setFeaturedResult } =
    props;

  const { info, records } = searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const hmtlRecords = records.map((record, index) => {
    return (
      <div
        key={index}
        className="object-preview"
        onClick={(e) => {
          e.preventDefault();
          setFeaturedResult(record);
        }}
      >
        {record.primaryimageurl ? (
          <img src={record.primaryimageurl} alt={record.description} />
        ) : null}
        {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>}
      </div>
    );
  });

  const previousPageButtonHandler = () => {
    fetchPage(info.prev);
  };

  const nextPageButtonHandler = () => {
    fetchPage(info.next);
  };

  return (
    <aside id="preview">
      <header className="pagination">
        <button
          className="previous"
          disabled={searchResults.info.page > 1 ? false : true}
          onClick={previousPageButtonHandler}
        >
          Previous
        </button>
        <button
          className="next"
          disabled={!Object.keys(searchResults.info).length ? true : false}
          onClick={nextPageButtonHandler}
        >
          Next
        </button>
      </header>
      <section className="results">{hmtlRecords}</section>
    </aside>
  );
};

export default Preview;
