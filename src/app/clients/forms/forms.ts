export const formFields = [
  {
    label: 'Имя',
    name: 'name',
    type: 'text',
    placeholder: 'Введите ваше имя',
    validation: { required: 'Имя обязательно' }
  },
  {
    label: 'Телефон',
    name: 'phone',
    type: 'text',
    placeholder: 'Введите ваш телефон',
    validation: { required: 'Телефон обязателен' }
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Введите ваш email',
    validation: { required: 'Email обязателен' }
  }
];


export const formFind = [
  {
    label: 'Номер телефона',
    name: 'number',
    type: 'text',
    placeholder: 'Введите номер',
    validation: { required: false }
  },
  {
    label: 'Почта',
    name: 'email',
    type: 'text',
    placeholder: 'Введите почту',
    validation: { required: false }
  }
]