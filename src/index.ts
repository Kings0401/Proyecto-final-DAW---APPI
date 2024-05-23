import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoutes from './routes/authRoutes';
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world, holi');
})

app.listen(3000, () => {
    console.log('Esta vivito en localhost:3000');
})