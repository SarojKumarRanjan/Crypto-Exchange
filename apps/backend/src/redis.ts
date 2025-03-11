import { RedisClientType,createClient } from "redis";



export class redis{
    private client: RedisClientType;
    private publisher: RedisClientType;
   private static instance: redis;


   private constructor(){

    //for subscribing and receiving messages
         this.client = createClient();
         this.client.connect();
     //for publishing messages
         this.publisher = createClient();
        this.publisher.connect();

   }


    public static getInstance(): redis{
         if(!redis.instance){
              redis.instance = new redis();
         }
         return redis.instance;
    }

    


    public getClientId(){
        //this return a random clinet id
        return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);
    }
}