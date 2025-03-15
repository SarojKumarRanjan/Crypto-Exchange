import { Router } from "express";
import { redis } from "../redis";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types";

export const orderRouter = Router();

orderRouter.post('/create', async(req, res) => {

    const { market, side, price, quantity, userId } = req.body;

    if (!market || !side || !price || !quantity || !userId) {
        res.status(400).json({Error: 'Market, side, price, quantity and userId are required'});
    }

    try {
        const redisInstance = redis.getInstance();
        if (!redisInstance) {
            res.status(500).json({ error: "Redis instance is not available" });
        }

        const response = await redisInstance.sendAndAwait({
            type: CREATE_ORDER,
            data: {
                market: market as string,
                side: side as "BUY" | "SELL",
                price: price as string,
                quantity: quantity as number,
                userId: userId as string
            }
        });

        if (!response || !response.payload) {
            res.status(500).json({ error: "Invalid response from Redis" });
        }

        res.json(response.payload);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


orderRouter.delete('/cancel', async(req, res) => {

    const { orderId, market } = req.body;

    if (!orderId || !market) {
        res.status(400).json({Error: 'orderId and market are required'});
    }

    try {
        const redisInstance = redis.getInstance();
        if (!redisInstance) {
            res.status(500).json({ error: "Redis instance is not available" });
        }

        const response = await redisInstance.sendAndAwait({
            type: CANCEL_ORDER,
            data: {
                orderId: orderId as string,
                market: market as string
            }
        });

        if (!response || !response.payload) {
            res.status(500).json({ error: "Invalid response from Redis" });
        }

        res.json(response.payload);
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


orderRouter.get('/open', async(req, res) => {

    const { userId, market } = req.body;

    if (!userId || !market) {
        res.status(400).json({Error: 'userId and amount are required'});
    }

    try {
        const redisInstance = redis.getInstance();
        if (!redisInstance) {
            res.status(500).json({ error: "Redis instance is not available" });
        }

        const response = await redisInstance.sendAndAwait({
            type: GET_OPEN_ORDERS,
            data: {
                userId: userId as string,
                market: market as string
            }
        });

        if (!response || !response.payload) {
            res.status(500).json({ error: "Invalid response from Redis" });
        }

        res.json(response.payload);
    } catch (error) {
        console.error("Error getting open orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/* orderRouter.post('/onramp', async(req, res) => {

    const { userId, amount, transactionId } = req.body;

    if (!userId || !amount || !transactionId) {
        res.status(400).json({Error: 'userId, amount and transactionId are required'});
    }

    try {
        const redisInstance = redis.getInstance();
        if (!redisInstance) {
            res.status(500).json({ error: "Redis instance is not available" });
        }

        const response = await redisInstance.sendAndAwait({
            type: ON_RAMP,
            data: {
                userId: userId as string,
                amount: amount as string,
                transactionId: transactionId as string
            }
        });

        if (!response || !response.payload) {
            res.status(500).json({ error: "Invalid response from Redis" });
        }

        res.json(response.payload);
    } catch (error) {
        console.error("Error onramping:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); */

