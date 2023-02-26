import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import '@algolia/autocomplete-theme-classic';
import React from 'react';

import { ClearIcon } from './ClearIcon';
import { Highlight } from './Highlight';
import { SearchIcon } from './SearchIcon';

const searchClient = algoliasearch(
  'RT84MN73PG',
  'c9e2cc86a9b1a6c0ac5ca4e3536b6d24'
);

type AutocompleteItem = Hit<{
  description: string;
  name: string;
  show: string;
  season: string;
  episode: string;
  // url: string;
}>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  });
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'episode_picker',
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'episodes',
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                  ],
                });
              },
              // getItemUrl({ item }) {
              //   return item.name;
              // },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, autocompleteState.isOpen]);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapperPrefix">
          <label className="aa-Label" {...autocomplete.getLabelProps({})}>
            <button className="aa-SubmitButton" disabled>
              <SearchIcon />
            </button>
          </label>
          {autocompleteState.query ? null : <span className='text-muted'>Type some keywords...</span>}
        </div>
        <div className="aa-InputWrapper">
          <input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
        <div className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <ClearIcon />
          </button>
        </div>
      </form>

      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <div className="aa-ItemContentBody">
                                  <div className="aa-ItemContentTitle">
                                    <Highlight hit={item} attribute="name" />
                                  </div>
                                  <div className="aa-ItemContentDescription">
                                    <strong>{item.show}:&nbsp;</strong>Season&nbsp;{item.season},&nbsp;Episode {item.episode}<br /><br />
                                    {item.description}<hr />
                                  </div>
                                </div>
                              </div>
                              <div className="aa-ItemActions">
                                <button
                                  className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                  type="button"
                                  title="Select"
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
