import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import allRoutes from './routes';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import { PORT } from './utils/dbConfig';
const app = express(); // for secure HTTP headers :)

app.use(helmet());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.disable('etag');
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/v1', allRoutes);
app.get('/', (req, res) => {
    res.send(`<h3 style='text-align:center;'>Culture Intelligence APIs Server :)</h3>`);
});
app.use('/static', express.static(__dirname + '/uploads/'));
app.use('*', (req, res) => {
    console.log('ROUTE NOT FOUND');
    res.status(404).send('ROUTE NOT FOUND');
});

app.listen(PORT, () => {
    console.info(`Server is online on port : ${PORT}`);
});

export default app;
