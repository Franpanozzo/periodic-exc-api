const sex = ["M","F"];

const users = [
  {
    name: "Francisco",
    lastName: "Panozzo",
    email: "fran@gmail.com",
    sex: "M",
    age: 21,
    phone: 1121621178
  },
  {
    name: "Leandro",
    lastName: "Coca",
    email: "gege@gmail.com",
    sex: "F",
    age: 24,
    phone: 1121645178
  }
]

function getAllUsers() {
  return users;
}

module.exports = {
  getAllUsers
};