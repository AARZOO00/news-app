const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req,res)=>{
  const {name,email,password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({name,email,password:hashed});
  await user.save();
  res.json({message:'registered'});
});

// Login
router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({error:'Invalid credentials'});
  const valid = await bcrypt.compare(password, user.password);
  if(!valid) return res.status(400).json({error:'Invalid credentials'});
  const token = jwt.sign({id:user._id,email:user.email}, process.env.JWT_SECRET, {expiresIn:'7d'});
  res.json({token, user:{id:user._id, name:user.name, email:user.email}});
});

module.exports = router;
