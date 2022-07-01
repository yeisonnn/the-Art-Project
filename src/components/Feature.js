import React, { Fragment } from 'react';
import Searchable from './Searchable';

import { fetchQueryResultsFromTermAndValue } from '../api/api';

const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;

  const featureHtml = !featuredResult ? null : (
    <div className="object-feature">
      <header>
        <h3>{featuredResult.title}</h3>
        <h4>{featuredResult.dated}</h4>
      </header>
      <section className="facts">
        <span className="title">Culture</span>
        <span className="content">
          <Searchable
            searchTerm={'culture'}
            searchValue={featuredResult.culture}
            setIsLoading={setIsLoading}
            setSearchResults={setSearchResults}
          />
        </span>
        <span className="title">Division</span>
        <span className="content">{featuredResult.division}</span>
        <span className="title">Department</span>
        <span className="content">{featuredResult.department}</span>
        <span className="title">Technique</span>
        <span className="content">
          <Searchable
            searchTerm={'technique'}
            searchValue={featuredResult.technique || null}
            setIsLoading={setIsLoading}
            setSearchResults={setSearchResults}
          />
        </span>
        <span className="title">Medium</span>
        <span className="content">
          <Searchable
            searchTerm={'medium'}
            searchValue={featuredResult.medium || null}
            setIsLoading={setIsLoading}
            setSearchResults={setSearchResults}
          />
        </span>
        <span className="title">Author</span>
        <span className="content">
          {featuredResult.people
            ? featuredResult.people[0].alphasort
            : 'Unknown'}
        </span>
      </section>
      <section>
        {featuredResult.primaryimageurl ? (
          <img
            src={featuredResult.primaryimageurl}
            alt={featuredResult.title}
          />
        ) : (
          <span>Sorry. No image</span>
        )}
      </section>
    </div>
  );

  return (
    <Fragment>
      <main id="feature">{featureHtml}</main>
    </Fragment>
  );
};

export default Feature;
