const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateCompanyInput = require("../../validation/register");
const validateEmpInput =require("../../validation/register")
// Load User model
const User = require("../../models/User");
const Company = require("../../models/Company");
const Employee = require("../../models/Employee");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
router.post("/company/add", (req, res) => {
  const { errors, isValid } = validateCompanyInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Company.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Name already exists" });
    } else {
      const newCompany = new Company({
        name: req.body.name
    
      });
      newCompany
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  
      
    }
  });
});
router.post("/employee/add", (req, res) => {
  const {name,
    email,
    salary,
    birthDate,
    joiningDate,
    resignationDate,
    iCompanyID}= req.body
  const { errors, isValid } = validateEmpInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var doc={
    name:name,
    email:email,
    salary:salary,
    birthDate:new Date(birthDate),
    joiningDate:new Date(joiningDate),
    resignationDate:(resignationDate === '' ? null : new Date(resignationDate)),
    iCompanyID:ObjectId(iCompanyID)
  }
  Employee.create(doc).then(user => {
    res.json(user)
  }) .catch(err => console.log(err));;
});
router.get("/employee/list", (req, res) => {
  Employee.aggregate([
    {
                           $lookup: {
                               from: "companys",
                               localField: "iCompanyID", //storeuser storid
                               foreignField: "_id", //store id
                               as: "companyData",
   
                           }
                       },
                       {
                           $unwind: {
                               path: "$companyData",
                               preserveNullAndEmptyArrays: true
                           }
                       },
                        {
                           $project: {
                               id:1,
                               name:1,
                               companyName:"$companyData.name",
                               email:1,
                               birthDate:1,
                               joiningDate:1,
                               resignationDate:1,
                               iCompanyID:1
                               
                              
                               }}
   ]).then(user => {
    res.json(user)
  }) .catch(err => console.log(err));;
});
router.get("/company/list", (req, res) => {
  Employee.aggregate([   {
    $match: {
       iCompanyID:ObjectId(req.body.iCompanyID)
    }
},
{ $group : { _id : "$joiningDate", salary: { $sum: "$salary" },   totalEmployee: { $sum: 1 }

} } ]).then(user => {
    res.json(user)
  }) .catch(err => console.log(err));;
});
module.exports = router;
