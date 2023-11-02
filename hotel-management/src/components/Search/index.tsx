import { memo, useEffect, useState } from 'react';
import { StyledSearch } from './styled';

interface ISearch {
  setPlaceHolder: string;
  setValueSearch: (phone: string) => void;
}

const Search = memo(({ setValueSearch, setPlaceHolder }: ISearch) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setValueSearch(query);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [setValueSearch, query]);

  return (
    <StyledSearch
      onChange={(e) => setQuery(e.target.value)}
      placeholder={setPlaceHolder}
    />
  );
});

export default Search;
