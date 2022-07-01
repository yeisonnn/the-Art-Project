import React, { useState, useEffect } from 'react';

import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from '../api/api';

const Search = (props) => {
  const { setIsLoading, setSearchResults } = props;

  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');

  const promiseAll = async () => {
    try {
      const [century, classification] = await Promise.all([
        fetchAllCenturies(),
        fetchAllClassifications(),
      ]);

      setCenturyList(century);
      setClassificationList(classification);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    promiseAll();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetchQueryResults({
        century,
        classification,
        queryString,
      });
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="search" onSubmit={submitHandler}>
      <fieldset>
        <label htmlFor="keywords">Query</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="select-classification">
          Classification{' '}
          <span className="classification-count">
            ({classificationList.length})
          </span>
        </label>
        <select
          name="classification"
          id="select-classification"
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
        >
          <option value="any">Any</option>
          {classificationList.map((classification) => (
            <option key={classification.id}>{classification.name}</option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          value={century}
          onChange={(e) => setCentury(e.target.value)}
        >
          <option value="any">Any</option>
          {centuryList.map((century) => (
            <option key={century.id}>{century.name}</option>
          ))}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;
