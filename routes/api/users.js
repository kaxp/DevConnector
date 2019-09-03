const express = require('express');
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs')

const router = express.Router();

const User = require('../../models/Users');

// const { check, validationResult } = require('express-validator/check');

//@route POST api/users
//@desc Register User
//@access Public

router.post(
  '/',
  async(req, res) => {

    console.log('req.body', req.body)

    checkError(req.body,res);
    
    let {name, email, password} = req.body;


    try{

    //see if user already exists

    let user = await User.findOne({email});

    if(user){
      return res.status(400).json({msg : "User already exists"});
    }
  
    //get users gravatar

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
  
    user = new User({
      email,
      name,
      avatar,
      password
    })
    //encrypt password


    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //return jwt
      
    res.json('User Registered');

    }catch(err){
      console.log(err);
       res.status(500).json({msg : "Server Error"});
    }


    
  }
);

function checkError (body,res)  {
  if(!body.name){
    return res.status(400).json({msg : "Enter Name"});
  }else if(!body.email){
    return res.status(400).json({msg : "Enter Email"});
  }else if(!body.password){
    return res.status(400).json({msg : "Enter Password"});
  }else{
    return true
  }
}

//const errors = validationResult(req);
module.exports = router;
