import { useSearchParams } from 'react-router-dom';
import Select from './Select';

interface ISortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

const SortBy = ({ options }: ISortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  };

  // prettier-ignore
  return (
    <Select 
      options={options} 
      value={sortBy} 
      onChange={handleChange} 
    />
  );
};

export default SortBy;
