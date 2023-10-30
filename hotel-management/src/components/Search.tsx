import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-size: var(--fs-sm-x);
  padding: 5px 10px;
`;

interface ISearch {
  setPhoneSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ setPhoneSearch }: ISearch) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPhoneSearch(query);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [setPhoneSearch, query]);

  return (
    <StyledSearch
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by phone..."
    />
  );
};

export default Search;
