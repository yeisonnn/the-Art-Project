import React from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api/api';

const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;

  const linkHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetchQueryResultsFromTermAndValue(
        searchTerm,
        searchValue
      );
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="content">
      {searchValue ? (
        <a onClick={linkHandler} href="#">
          {searchValue}
        </a>
      ) : (
        <span>Uknown</span>
      )}
    </span>
  );
};

export default Searchable;
