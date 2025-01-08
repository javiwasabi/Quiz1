const request = require('supertest');
const express = require('express');
const usersController = require('../../controllers/usersController');
const User = require('../../models/User');

jest.mock('../../models/User');

const app = express();
app.use(express.json());
app.get('/users', usersController.getAllUsers);
app.post('/users', usersController.createNewUser);
app.patch('/users', usersController.updateUser);

describe('Users Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return a list of users', async () => {
            User.find.mockResolvedValue([{ userEmail: 'test@example.com', score: '10' }]);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ userEmail: 'test@example.com', score: '10' }]);
        });

        it('should return 404 if no users are found', async () => {
            User.find.mockResolvedValue([]);

            const response = await request(app).get('/users');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No users found');
        });
    });

    describe('createNewUser', () => {
        it('should create a new user', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({ _id: '500', userEmail: 'test@example.com', score: '10' });

            const response = await request(app)
                .post('/users')
                .send({ userEmail: 'test@example.com', score: '10' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('New user created: test@example.com');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/users').send({ userEmail: '' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('userEmail is required');
        });

        it('should return 409 if duplicate userEmail exists', async () => {
            User.findOne.mockResolvedValue({ _id: '500', userEmail: 'test@example.com' });

            const response = await request(app)
                .post('/users')
                .send({ userEmail: 'test@example.com', score: '10' });

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('Duplicate userEmail');
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', async () => {
            User.findById.mockResolvedValue({
                _id: '123',
                save: jest.fn().mockResolvedValue({ userEmail: 'updated@example.com', score: '20' }),
            });
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .patch('/users')
                .send({ id: '123', userEmail: 'updated@example.com', score: '20' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('User updated: updated@example.com');
        });

        it('should return 404 if user not found', async () => {
            User.findById.mockResolvedValue(null);

            const response = await request(app)
                .patch('/users')
                .send({ id: '123', userEmail: 'updated@example.com', score: '20' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });

        it('should return 409 if duplicate userEmail exists', async () => {
            User.findById.mockResolvedValue({ _id: '123' });
            User.findOne.mockResolvedValue({ _id: '456' });

            const response = await request(app)
                .patch('/users')
                .send({ id: '123', userEmail: 'duplicate@example.com', score: '20' });

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('Duplicate userEmail');
        });
    });
});
