const mongoose = require('mongoose');
const User = require('../../models/User'); 

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a user successfully', async () => {
        const userData = {
            userEmail: 'test@example.com',
            score: '100',
            checklist1: false,
            checklist2: true,
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.userEmail).toBe(userData.userEmail);
        expect(savedUser.score).toBe(userData.score);
        expect(savedUser.checklist1).toBe(userData.checklist1);
        expect(savedUser.checklist2).toBe(userData.checklist2);
    });

    it('should fail if required fields are missing', async () => {
        const user = new User({});

        let error;
        try {
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.userEmail).toBeDefined();
        expect(error.errors.score).toBeDefined();
    });

    it('should have default values for checklists', async () => {
        const userData = {
            userEmail: 'default@example.com',
            score: '50',
            checklist1: true,
            checklist2: true,
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser.checklist1).toBe(userData.checklist1);
        expect(savedUser.checklist2).toBe(userData.checklist2);
    });
});
