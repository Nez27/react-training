import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-size: var(--fs-sm-x);
  padding: 5px 10px;
`;

interface ISearch {
  setKeyPhone: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ setKeyPhone }: ISearch) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setKeyPhone(query);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [setKeyPhone, query]);

  return (
    <StyledSearch
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by phone..."
    />
  );
};

export default Search;
