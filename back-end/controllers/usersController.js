const User = require('../models/User');
const request = require('supertest');
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

// @desc Create or update user
// @route POST /users
// @access Private
const createOrUpdateUser = asyncHandler(async (req, res) => {
    const { userEmail, score, checklist1, checklist2 } = req.body;

    if (!userEmail) {
        return res.status(400).json({ message: 'userEmail is required' });
    }

    const existingUser = await User.findOne({ userEmail }).exec();

    if (existingUser) {
        existingUser.score = score;
        existingUser.checklist1 = checklist1;
        existingUser.checklist2 = checklist2;

        const updatedUser = await existingUser.save();
        return res.status(200).json({
            message: `User with email ${updatedUser.userEmail} updated`,
            user: updatedUser,
        });
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
    const { id, userEmail, score, checklist1, checklist2 } = req.body;

    if (!id || !userEmail || score === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

 
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const duplicate = await User.findOne({ userEmail }).lean().exec();
    const duplicateId = duplicate ? duplicate._id.toString() : null;

    if (duplicateId && duplicateId !== id) {
        const updatedDuplicate = await User.updateOne(
            { _id: duplicateId },
            { $set: { score, checklist1, checklist2 } } 
        );

        if (updatedDuplicate.modifiedCount === 0) {
            return res.status(500).json({ message: 'Error updating duplicate user' });
        }
    }

    user.score = score;
    user.checklist1 = checklist1;
    user.checklist2 = checklist2;

   
    if (user.userEmail !== userEmail) {
        user.userEmail = userEmail;
    }

    try {
        const updatedUser = await user.save();
        res.status(200).json({
            message: `User with email ${updatedUser.userEmail} updated`,
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

module.exports = {
    getAllUsers,
    createOrUpdateUser,
    updateUser,
};
