import express from 'express';
import {Response} from 'express';
import cors from 'cors';



const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res:Response) => {
  res.send('Hello World');
});


//importing all the routes 
import { depthRouter } from './routes/depth';
import { orderRouter } from './routes/order';
import { tradesRouter } from './routes/trades';
import { tickersRouter } from './routes/ticker';
import { klineRouter } from './routes/kline';

//using the routes
app.use('/api/v1/depth', depthRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/trades', tradesRouter); 
app.use('/api/v1/ticker', tickersRouter);
app.use('/api/v1/kline', klineRouter);

//starting the server

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});