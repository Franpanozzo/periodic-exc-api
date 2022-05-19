const usersDatabase = require('./users.mongo');

const sex = ["M","F"];

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
  // .sort({ flightNumber: 1 })  //Con menos uno estaria ordenando por valor descendente
  // .skip(skip)
  // .limit(limit);
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

module.exports = {
  getAllUsers,
  loadUsersData
};