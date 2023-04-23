const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const bcrypt = require('bcryptjs');
const UserModel = require('./models/User');

dotenv.config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}))

app.get('/test', (req, res) => {
  res.json('test ok');
})

app.get('/profile', (req,res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (error, userData) => {
      if (error) {
        throw error
      }
      res.json(userData);
    })
  } else {
    res.status(401).json('no token');
  }
})

app.post('/login', async (req,res) => {
  const {username, password} = req.body;
  const foundUser = await UserModel.findOne({username})
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password)
    if (passOk) {
      jwt.sign({userId:foundUser._id,username}, jwtSecret, {}, (error, token) => {
        res.cookie('token', token, {sameSite:'none', secure:true}).json({
          id: foundUser._id
        })
      });
    }
  }
});

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await UserModel.create({
      username:username,
      password:hashedPassword,
    });
    jwt.sign({userId:createdUser._id,username}, jwtSecret, {}, (error, token) => {
    if (error) {
      throw error;
    }
    res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
      id: createdUser._id,
    });
  })
  } catch (error) {
    
  }  
})

app.listen(4000)