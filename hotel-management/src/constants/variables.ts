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
  ORDERBY_OPTIONS: [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    },
  ],
};

// prettier-ignore
const ROOM_PAGE = {
  ORDERBY_OPTIONS: [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    },
  ],
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
    { 
      value: 'discount',
      label: 'Sort by discount',
    },
    { 
      value: 'status',
      label: 'Sort by status',
    },
  ],
}

const INITIAL_STATE_SCHEMA = {
  id: '',
  name: '',
  identifiedCode: '',
  phone: '',
  roomId: 'undefined',
  address: '',
};

const VALUE = 'value';
const ERROR = 'error';

export { USER_PAGE, ROOM_PAGE, VALUE, ERROR, INITIAL_STATE_SCHEMA };
