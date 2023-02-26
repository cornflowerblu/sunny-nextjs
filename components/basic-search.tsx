import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  'RT84MN73PG',
  'c9e2cc86a9b1a6c0ac5ca4e3536b6d24'
);

export default function Search() {
  return (
    <InstantSearch indexName="episodes" searchClient={searchClient}>
      <SearchBox placeholder='Type some keywords...' />
    </InstantSearch>
  )
}