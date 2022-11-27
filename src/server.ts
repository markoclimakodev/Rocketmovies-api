import express from 'express';
import { router } from './routes/movies.routes';

const app = express();
app.use(express.json());

app.use(router)

const port = 3003;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
