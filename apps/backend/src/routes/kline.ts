import pg from 'pg';
import { Router } from 'express';

export const klineRouter = Router();
import { depthtype } from '../types';

const {Client} = pg;


const pgClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
  })

pgClient.connect()

klineRouter.get('/', async (req, res) => {
    const {market,interval,startTime,endTime} = req.query;

    if (!market || !interval || !startTime || !endTime) {
         res.status(400).json({Error: 'Market, interval, startTime and endTime are required'});
    }

    let query;

    switch (interval) {
        case '1m':
            query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '5m':
            query = `SELECT * FROM klines_5m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '15m':
            query = `SELECT * FROM klines_15m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '30m':
            query = `SELECT * FROM klines_30m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1h':
            query = `SELECT * FROM klines_1h WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '4h':
            query = `SELECT * FROM klines_4h WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1d':
            query = `SELECT * FROM klines_1d WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1w':
            query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <=
            $2`;
            break;
        default:
             res.status(400).json({Error: 'Invalid interval'});
    }

    try {


           //@ts-ignore
        const result = await pgClient.query(query, [new Date(startTime * 1000 as string), new Date(endTime * 1000 as string)]);

        if (!result || !result.rows) {
             res.status(500).json({ error: "Invalid response from Postgres" });
        }


        
        res.json(result.rows.map((x: any) => ({
            close: x.close,
            end: x.bucket,
            high: x.high,
            low: x.low,
            open: x.open,
            quoteVolume: x.quoteVolume,
            start: x.start,
            trades: x.trades,
            volume: x.volume,
        })));
        
    } catch (error) {
        console.error("Error fetching kline data:", error);
         res.status(500).json({ error: "Internal Server Error" });
        
    }
   
});


