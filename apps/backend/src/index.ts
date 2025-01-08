import express from 'express';
import {Reqest,Response} from 'express';

const app = express();

app.get('/', (req:Reqest, res:Response) => {
  res.send('Hello World');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});