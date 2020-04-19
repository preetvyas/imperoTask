const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  salary: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Date,
    default: Date.now
  },

  joiningDate: {
    type: Date,
    default: Date.now
  },
  resignationDate: {
    type: Date,
    default: null
  },
  iCompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'companys' },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("employees", EmployeeSchema);
