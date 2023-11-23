import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Styled
import { StyledSearch } from './styled';

// Hooks
import { useDebounce } from '@hook/useDebounce';

// Types
import { Nullable } from '@type/common';

interface ISearch {
  setPlaceHolder: string;
}

const Search = ({ setPlaceHolder }: ISearch) => {
  const field = 'search';
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<Nullable<string>>(null);
  const debounceValue = useDebounce<Nullable<string>>(query, 700);

  useEffect(() => {
    if (debounceValue !== null) {
      searchParams.set(field, debounceValue);

      setSearchParams(searchParams);
    }
  }, [debounceValue, searchParams, setSearchParams]);

  return (
    <StyledSearch
      onChange={(e) => setQuery(e.target.value)}
      placeholder={setPlaceHolder}
    />
  );
};

export default Search;
