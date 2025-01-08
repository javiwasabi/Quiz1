const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User'); 
const { getAllUsers, createNewUser, updateUser } = require('../../controllers/usersController');

const app = express();
app.use(express.json());
app.get('/users', getAllUsers);
app.post('/users', createNewUser);
app.patch('/users', updateUser);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Controller', () => {
    it('should fetch all users', async () => {
        await User.create({ userEmail: 'test1@example.com', score: '100' });
        await User.create({ userEmail: 'test2@example.com', score: '200' });

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('should create a new user', async () => {
        const newUser = { userEmail: 'test3@example.com', score: '300' };

        const response = await request(app).post('/users').send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.user.userEmail).toBe(newUser.userEmail);
        expect(response.body.user.score).toBe(newUser.score);
    });

    it('should update an existing user', async () => {
        const user = await User.create({ userEmail: 'test4@example.com', score: '400' });

        const updatedData = { id: user._id, userEmail: 'test4@example.com', score: '500' };

        const response = await request(app).patch('/users').send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`User with email ${updatedData.userEmail} updated`);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.score).toBe('500');
    });
});
