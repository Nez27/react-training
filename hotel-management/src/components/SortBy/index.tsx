import { useSearchParams } from 'react-router-dom';
import { memo } from 'react';

// Components
import Select from '../Select';

interface ISortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

const SortBy = memo(({ options }: ISortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select 
      options={options} 
      value={sortBy} 
      onChange={handleChange} 
      ariaLabel='Sort'
    />
  );
});

export default SortBy;
