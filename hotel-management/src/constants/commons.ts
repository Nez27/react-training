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
      value: 'phone',
      label: 'Sort by phone',
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
};

const INIT_VALUE_USER_FORM = {
  name: '',
  id: 0,
  identifiedCode: '',
  phone: '',
};

const INIT_VALUE_ROOM_FORM = {
  name: '',
  id: 0,
  price: 0,
  discount: 0,
};

const FORM = {
  EDIT: 'edit',
  DELETE: 'delete',
  USER: 'user-form',
  ROOM: 'room-form',
};

const REGEX = {
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  NAME: /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/gm,
  NUMBER: /^[0-9]*$/,
};

export {
  USER_PAGE,
  ROOM_PAGE,
  FORM,
  REGEX,
  ORDERBY_OPTIONS,
  INIT_VALUE_USER_FORM,
  INIT_VALUE_ROOM_FORM,
};
