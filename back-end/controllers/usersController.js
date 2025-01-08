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
    const { userEmail, score, checklist1, checklist2 } = req.body;

    // Confirmar que los datos requeridos están presentes
    if (!userEmail || score === undefined) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }


    const existingUser = await User.findOne({ userEmail }).exec();

    if (existingUser) {

        existingUser.score = score;
        existingUser.checklist1 = checklist1 !== undefined ? checklist1 : existingUser.checklist1;
        existingUser.checklist2 = checklist2 !== undefined ? checklist2 : existingUser.checklist2;

        const updatedUser = await existingUser.save();

        return res.status(200).json({ 
            message: `Usuario con email ${updatedUser.userEmail} actualizado`, 
            user: updatedUser 
        });
    }

    const userObject = { userEmail, score, checklist1, checklist2 };

    const newUser = await User.create(userObject);

    if (newUser) {
        res.status(201).json({ 
            message: `Nuevo usuario con email ${userEmail} creado`, 
            user: newUser 
        });
    } else {
        res.status(400).json({ message: 'Error al crear el usuario' });
    }
});

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
