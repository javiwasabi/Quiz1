const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { userEmail, score, checklist1, checklist2 } = req.body;

    // Confirm required fields
    if (!userEmail) {
        return res.status(400).json({ message: 'userEmail is required' });
    }

    const existingUser = await User.findOne({ userEmail }).exec();
    if (existingUser) {
        return res.status(409).json({ message: 'Duplicate userEmail' });
    }

    const userObject = { userEmail, score, checklist1, checklist2 };

    const newUser = await User.create(userObject);
    if (newUser) {
        res.status(201).json({
            message: `New user created: ${userEmail}`,
            user: newUser,
        });
    } else {
        res.status(400).json({ message: 'Error creating the user' });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, userEmail, score } = req.body;

    if (!id || !userEmail || score === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const duplicate = await User.findOne({ userEmail }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate userEmail' });
    }

    user.userEmail = userEmail;
    user.score = score;

    const updatedUser = await user.save();
    res.status(200).json({
        message: `User with email ${updatedUser.userEmail} updated`,
        user: updatedUser,
    });
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
};
