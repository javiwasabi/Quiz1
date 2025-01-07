const request = require('supertest');
const app = require('../app'); // Ruta a tu archivo principal donde configuras express
const User = require('../../models/User');
const mongoose = require('mongoose');

// Simula el modelo User
jest.mock('../../models/User');

describe('Users Controller', () => {

  // Test para obtener todos los usuarios
  describe('GET /users', () => {
    it('should return all users', async () => {
      const users = [{ userEmail: 'test@example.com', score: 10 }];
      User.find.mockResolvedValue(users); // Simula la respuesta de la base de datos

      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(users);
    });

    it('should return an error if no users found', async () => {
      User.find.mockResolvedValue([]); // Simula que no hay usuarios

      const res = await request(app).get('/users');

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('No users found');
    });
  });

  // Test para crear un nuevo usuario
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { userEmail: 'test@example.com', score: 10 };
      User.create.mockResolvedValue(newUser); // Simula la creación del usuario

      const res = await request(app).post('/users').send(newUser);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe(`New user with email test@example.com created`);
    });

    it('should return an error if required fields are missing', async () => {
      const res = await request(app).post('/users').send({ userEmail: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('All fields are required');
    });

    it('should return an error if userEmail is duplicate', async () => {
      const newUser = { userEmail: 'test@example.com', score: 10 };
      User.findOne.mockResolvedValue(newUser); // Simula que el correo ya existe

      const res = await request(app).post('/users').send(newUser);

      expect(res.status).toBe(409);
      expect(res.body.message).toBe('Duplicate userEmail');
    });
  });

  // Test para actualizar un usuario
  describe('PATCH /users', () => {
    it('should update an existing user', async () => {
      const updatedUser = { id: '123', userEmail: 'updated@example.com', score: 20 };
      const existingUser = { _id: '123', userEmail: 'test@example.com', score: 10 };
      User.findById.mockResolvedValue(existingUser); // Simula que el usuario existe
      User.findOne.mockResolvedValue(null); // Simula que no hay un correo duplicado
      User.prototype.save.mockResolvedValue(updatedUser); // Simula la actualización

      const res = await request(app).patch('/users').send(updatedUser);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe(`User with email updated@example.com updated`);
    });

    it('should return an error if user not found', async () => {
      const updatedUser = { id: '123', userEmail: 'updated@example.com', score: 20 };
      User.findById.mockResolvedValue(null); // Simula que el usuario no existe

      const res = await request(app).patch('/users').send(updatedUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User not found');
    });

    it('should return an error if required fields are missing', async () => {
      const res = await request(app).patch('/users').send({ userEmail: 'updated@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('All fields are required');
    });

    it('should return an error if userEmail is duplicate', async () => {
      const updatedUser = { id: '123', userEmail: 'updated@example.com', score: 20 };
      const duplicateUser = { userEmail: 'updated@example.com' };
      User.findOne.mockResolvedValue(duplicateUser); // Simula que el correo ya existe

      const res = await request(app).patch('/users').send(updatedUser);

      expect(res.status).toBe(409);
      expect(res.body.message).toBe('Duplicate userEmail');
    });
  });

  // Cerrar la conexión a la base de datos después de las pruebas
  afterAll(() => {
    mongoose.connection.close();
  });
});
