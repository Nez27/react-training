import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

// Components
import Select from '@component/Select';

interface ISortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

const SortBy = ({ options }: ISortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      ariaLabel="Sort"
    />
  );
};

export default SortBy;
