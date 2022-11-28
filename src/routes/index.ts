import { Router } from 'express';
import { moviesRoutes } from './movies.routes';
import { usersRoutes } from './users.routes';

const router = Router();

export const routes = [
  router.use('/', moviesRoutes),
  router.use('/', usersRoutes)
];
