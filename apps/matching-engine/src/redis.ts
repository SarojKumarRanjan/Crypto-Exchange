

import { createClient,RedisClientType } from "redis";

import { ORDER_UPDATE,TRADE_ADDED } from "./types";

import { messageToWs } from "./types";

import { messageToApi } from "./types";


type Dbmessage = {
    type: typeof TRADE_ADDED,
    data:{
        id:string,
        isBUyerMaker:boolean,
        price: string,
        quantity: string,
        quoteQuantity: string,
        timestamp: number,
        market: string,
    }
} | {
    type: typeof ORDER_UPDATE,
    data:{
        orderId: string,
        excutedQuantity: string,
        market?: string,
        price?: string,
        quantity?: string,
        side?:"buy" | "sell",
    }
}


export class Redis {

    private client: RedisClientType;
   private static instance: Redis;

   constructor(){
    this.client = createClient();
    this.client.connect();
   }


   public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }

    return Redis.instance;


}

//this will push for the db to process
public pushToDb(message: Dbmessage){
    this.client.lPush("db", JSON.stringify(message));
}


//this will push for the ws to process
public pushToWs(channel:string,message: messageToWs){
    this.client.publish(channel, JSON.stringify(message));
}

//this will push for the api to process
public pushToApi(channel:string,message: messageToApi){
    this.client.publish(channel, JSON.stringify(message));

}

}
