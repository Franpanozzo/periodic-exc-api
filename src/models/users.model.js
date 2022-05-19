const usersDatabase = require('./users.mongo');
const {
  validateNumber,
  validateString
} = require('../helpers/helpers')

const SEX = ['M', 'F'];

const mockUsers = [
  {
    first_name: "Francisco",
    last_name: "Panozzo",
    email: "francisco.panozzosf@gmail.com",
    sex: "M",
    age: 21,
    phone: 1121621178
  },
  {
    first_name: "Leandro",
    last_name: "Benavídez",
    email: "leabena@gmail.com",
    sex: "M",
    age: 24,
    phone: 1121645165
  }
]

const fields = [
  {
    label: 'First Name',
    value: 'first_name'
  },
  {
    label: 'Last Name',
    value: 'last_name'
  },
  {
   label: 'Email Address',
    value: 'email'
  },
  {
   label: 'Phone Number',
    value: 'phone'
  },
  {
   label: 'Sex',
    value: 'sex'
  },
  {
   label: 'Age',
   value: 'age'
  }
];

async function loadUsersData() {
  const firstUser = await findUser({
    email: "francisco.panozzosf@gmail.com"
  });

  if (firstUser) {
    console.log('User data already loaded');
  } else {
    await populateUsers();
  }
}

async function populateUsers() {
  console.log('Downloading users data...');
  for (const user of mockUsers) {
    await saveUser(user);
  }
}

async function getAllUsers() {
  return await usersDatabase.find({}, {
    '__v': 0,
    '_id': 0
  });
}

async function getUser(userEmail) {
  return await findUser({
    email: userEmail
  });
}

async function findUser(filter) {
  return await usersDatabase.findOne(filter);
}

async function saveUser(user) {
  await usersDatabase.findOneAndUpdate({  
    email: user.email
  }, user, {
    upsert: true
  })
}

function validateUser(user) {
  if(typeof user !== 'object') return 'We recieve a JSON to post a user';

  if(!user.email || !user.phone || !user.first_name || !user.last_name || !user.sex || !user.age) {
    return 'Missing required player properties';
  }

  if(Object.keys(user).length > 6) return 'Unnecesary properties';

  if(validateString(user.first_name) || validateString(user.last_name) || validateString(user.email) || validateString(user.sex) ||
  validateNumber(user.phone) || validateNumber(user.age)) {
    return 'Except for the phone and age, all fields should be strings'
  }

  if(!SEX.includes(user.sex)) user.sex = 'Not defined';

  const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if(!emailRegEx.test(user.email)) return 'invalid email';

  return null;
}

module.exports = {
  getAllUsers,
  getUser,
  loadUsersData,
  validateUser,
  saveUser,
  fields
};