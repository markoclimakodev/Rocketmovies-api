import { Router } from 'express';
import { MovieController } from '../controllers/movies/MovieController';

const movieController = new MovieController();
export const moviesRoutes = Router();

moviesRoutes.post('/movies/:userId', movieController.create);
moviesRoutes.get('/movies/:userId', movieController.list);
moviesRoutes.put('/movies/:userId/:movieId', movieController.update);
moviesRoutes.delete('/movies/:userId/:movieId', movieController.delete);
