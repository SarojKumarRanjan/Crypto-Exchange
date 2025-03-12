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

// singlton pattern so that we have only one instance of redis
    public static getInstance(): redis{
         if(!redis.instance){
              redis.instance = new redis();
         }
         return redis.instance;
    }


    public sendAndAwait(message){
        return new Promise((resolve)=>{
            //generate a random client id
            const clientId = this.getClientId();
            //subscribe to the client id
            this.client.subscribe(clientId,(message)=>{
                //once we receive the message we unsubscribe from the client id
                this.client.unsubscribe(clientId);
                //resolve the promise
                resolve(message);
            });
            //publish the message to the client id
           
            this.publisher.lPush("message",JSON.stringify({clientId,message}));
        });


    }



    public getClientId(){
        //this return a random clinet id
        return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);
    }
}