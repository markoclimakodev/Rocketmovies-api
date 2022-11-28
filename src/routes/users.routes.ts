import { Router } from 'express';
import { UserController } from '../controllers/users/UserController'; 

const userController = new UserController()
export const usersRoutes = Router();

usersRoutes.post('/users', userController.create);
usersRoutes.put('/users/:userId', userController.update);



