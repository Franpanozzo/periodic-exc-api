function validateString(obj) {
  return validateType(obj, 'string');
} 

function validateNumber(obj) {
  return validateType(obj, 'number');
}

function validateType(obj, type) {
  return typeof obj !== type;
}

module.exports = {
  validateNumber,
  validateString
}