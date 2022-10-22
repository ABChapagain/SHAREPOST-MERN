import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register new user
// route    POST /api/users/register
// Access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(401)
    throw new Error('Email already exists.😄')
  }
  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data.😞')
  }
})

// @desc    Auth user and get a token
// route    POST /api/users/login
// Access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials.😞')
  }
})

export { registerUser, authUser }
