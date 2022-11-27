import { Router } from 'express';
import { createMovies } from '../app/useCases/movies/createMovie';
import { deleteMovies } from '../app/useCases/movies/deleteMovie';
import { listMovies } from '../app/useCases/movies/listMovies';
import { updateMovies } from '../app/useCases/movies/updateMovie';

export const router = Router();

router.post('/users/:userId/movies', createMovies);
router.get('/movies/:userId', listMovies);
router.put('/movies/:userId/:movieId/',updateMovies)
router.delete('/movies/:userId/:movieId/',deleteMovies)

