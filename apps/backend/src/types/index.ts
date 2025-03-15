

export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const ON_RAMP = "ON_RAMP";

export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS";

export const GET_DEPTH = "GET_DEPTH";

export type messageFromOrderBook={
    type: "DEPTH",
    payload: {
        market: string,
        asks: Array<[string,string]>,
        bids: Array<[string,string]>
    }
} | 

{
    type: "ORDER_PLACED",
    payload: {
        orderId: string,
        excutedQuantity: number,
        fills:[
            {
                price: string,
                quantity: number
                tradeId: number
            }
        ]
    }
} |

{
    type: "ORDER_CANCELLED",
    payload: {
        orderId: string,
        filledQuantity: number,
        remainingQuantity: number
    }
} | 

{
    type:"OPEN_ORDERS",
    payload: {
        orders: Array<{
            orderId: string,
            side: "BUY" | "SELL",
            price: string,
            quantity: number,
            filledQuantity: number,
           
        }>
    }
}





export type messageToEngine = {
    type: typeof CREATE_ORDER,
    data:
    {
        market: string,
        side: "BUY" | "SELL",
        price: string,
        quantity: number
        userId: string
    }
} | 

{
    type: typeof CANCEL_ORDER,
    data: {
        orderId: string,
        market: string
    }   
} | 
{
    type: typeof ON_RAMP,
    data: {
        userId: string,
        amount: string
        trancactionId: string
    }
} | 
{
    type: typeof GET_OPEN_ORDERS,
    data: {
        userId: string,
        market: string
    }
} | 
{
    type: typeof GET_DEPTH,
    data: {
        market: string
    }
}


export type depthtype = {
    start: string,
end: string,
open: string,
high: string,
low: string,
close: string,
volume: string,
quoteVolume: string,
trades: string
}