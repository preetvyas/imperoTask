const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("companys", CompanySchema);
