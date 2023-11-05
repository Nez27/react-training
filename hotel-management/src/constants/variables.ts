// prettier-ignore
const USER_PAGE = {
  SORTBY_OPTIONS: [
    { 
      value: 'id',
      label: 'Sort by id',
    },
    { 
      value: 'name',
      label: 'Sort by name',
    },
    {
      value: 'identifiedCode',
      label: 'Sort by identified code',
    },
    { 
      value: 'phone',
      label: 'Sort by phone',
    },
    { 
      value: 'roomId',
      label: 'Sort by room',
    },
  ],
};

const ORDERBY_OPTIONS = [
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
];

// prettier-ignore
const ROOM_PAGE = {
  SORTBY_OPTIONS: [
    { 
      value: 'id',
      label: 'Sort by id',
    },
    { 
      value: 'name',
      label: 'Sort by name',
    },
    { 
      value: 'price',
      label: 'Sort by price',
    },
  ],
}


const VALUE = 'value';
const ERROR = 'error';

const INIT_VALUE_USER_FORM = {
  name: '',
  id: 0,
  identifiedCode: '',
  phone: '',
};

export {
  USER_PAGE,
  ROOM_PAGE,
  VALUE,
  ERROR,
  ORDERBY_OPTIONS,
  INIT_VALUE_USER_FORM
};
