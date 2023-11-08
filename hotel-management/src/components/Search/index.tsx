import { useEffect, useState } from 'react';

// Styled
import { StyledSearch } from './styled';

// Hooks
import { useDebounce } from '@hook/useDebounce';

interface ISearch {
  setPlaceHolder: string;
  setValueSearch: (phone: string) => void;
}

const Search = ({ setValueSearch, setPlaceHolder }: ISearch) => {
  const [query, setQuery] = useState('');
  const debounceValue = useDebounce<string>(query, 700);

  useEffect(() => {
    setValueSearch(debounceValue);
  }, [debounceValue, setValueSearch]);

  return (
    <StyledSearch
      onChange={(e) => setQuery(e.target.value)}
      placeholder={setPlaceHolder}
    />
  );
};

export default Search;
