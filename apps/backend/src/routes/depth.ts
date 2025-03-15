import { Router, Request, Response } from "express";
import { redis } from "../redis";
import { GET_DEPTH } from "../types";

export const depthRouter = Router();

depthRouter.get('/', async(req: Request, res: Response) => {

    const { symbol } = req.query;

    if (!symbol) {
         res.status(400).json({Error: 'Symbol is required'});
    }

    try {
        const redisInstance = redis.getInstance();
        if (!redisInstance) {
             res.status(500).json({ error: "Redis instance is not available" });
        }

        const response = await redisInstance.sendAndAwait({
            type: GET_DEPTH,
            data: {
                market: symbol as string
            }
        });

        if (!response || !response.payload) {
             res.status(500).json({ error: "Invalid response from Redis" });
        }

         res.json(response.payload);
    } catch (error) {
        console.error("Error fetching depth data:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
});


