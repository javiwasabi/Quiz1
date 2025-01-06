const User = require('../models/User')

const asyncHandler = require('express-async-handler')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { userEmail, score } = req.body

    // Confirm data
    if (!userEmail || !score) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate userEmail
    const duplicate = await User.findOne({ userEmail }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate userEmail' })
    }

    // Create new user object
    const userObject = { userEmail, score }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user with email ${userEmail} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, userEmail, score } = req.body

    // Confirm data 
    if (!id || !userEmail || score === undefined) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate userEmail
    const duplicate = await User.findOne({ userEmail }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate userEmail' })
    }

    user.userEmail = userEmail
    user.score = score

    const updatedUser = await user.save()

    res.json({ message: `User with email ${updatedUser.userEmail} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
}
