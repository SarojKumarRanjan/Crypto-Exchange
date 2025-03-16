
export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const ON_RAMP = "ON_RAMP";

export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS";

export const GET_DEPTH = "GET_DEPTH";



//types for engine to send to the ws and api

export const TRADE_ADDED = "TRADE_ADDED";
export const ORDER_UPDATE = "ORDER_UPDATE";

//eventually these types will be bundled in a packages module in turborepo
//and will be imported from there single types will be shared between the engine and the api
//for now, we will just copy and paste them
//this is the type that the engine will use to communicate with the backend



//engine will recive the data from api in this format only 


export type messageFromApi = {
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



//this the union the engine will send to api
//the api will have to handle these types
//engine will send data to the api in this format 

export type messageToApi={
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


//currently websocket is only handling depth,ticker and trades
//will add kline and positions update in the future


export type tickerUpdate  = {
    stream: string,
    data: {
        id: number, //id
        e:"ticker", //event type
        E?: number, //event time in ms
        s?: string, //symbol
        o?: string, //open price
        h?: string, //high price
        l?: string, //low price
        c?: string, //close price
        v?: string, //volume
        V?: string, //quote asset volume
        n?: number, //number of trades
    }
}


export type depthUpdate = {
    stream: string,
    data: {
        e: "depth", //event type
        E?: number, //event time in ms
        s: string, //symbol
        a?: Array<[string,string]>, //asks
        b?: Array<[string,string]> //bids
        
    }
}


export type tradeUpdate = {
    stream: string,
    data: {
        e: "trade", //event type
        E?: number, //event time in ms
        s: string, //symbol
        t: number, //trade id
        p: string, //price
        q: string, //quantity
        b?: number, //buyer order id
        a?: number, //seller order id
        m?: boolean, //is buyer the market maker
    }
}


export type messageToWs = tickerUpdate | depthUpdate | tradeUpdate