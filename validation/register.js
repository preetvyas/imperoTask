const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = function validateCompanyInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = function validateEmpInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
  data.joiningDate = !isEmpty(data.joiningDate) ? data.joiningDate : "";
  data.resignationDate = !isEmpty(data.resignationDate) ? data.resignationDate : "";
  data.iCompanyID = !isEmpty(data.iCompanyID) ? data.iCompanyID : "";


  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Name checks
  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is required";
  }
  if (Validator.isEmpty(data.birthDate)) {
    errors.birthDate = "Birth Date field is required";
  }
  if (Validator.isEmpty(data.joiningDate)) {
    errors.joiningDate = "Joining Date field is required";
  }
  if (Validator.isEmpty(data.iCompanyID)) {
    errors.iCompanyID = "Company id field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
