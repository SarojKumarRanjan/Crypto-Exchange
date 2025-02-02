import { Ticker } from "./types";

export const BASE_URL = "wss://ws.backpack.exchange/";

export class WebsocketManager {
  private ws: WebSocket;
  private static instance: WebsocketManager;
  private bufferedMessages: any[] = [];
  private callbacks: any = {};
  private id: number;
  private initialized: boolean = false;

  constructor() {
    this.ws = new WebSocket(BASE_URL);
    this.bufferedMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance(): WebsocketManager {
    if (!WebsocketManager.instance) {
      WebsocketManager.instance = new WebsocketManager();
    }
    return WebsocketManager.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((msg) => {
        this.ws.send(JSON.stringify(msg));
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const type = message.data.e;
      //type can be ticker, orderbook, trade, kline, order

      if (this.callbacks[type]) {
       // console.log("callbacks , " , this.callbacks);
        
       // console.log("callbacks found for type", type);
        this.callbacks[type].forEach(({ callback }: { callback: any }) => {
          if (type === "ticker") {
            const newTicker: Partial<Ticker> = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };
            callback(newTicker);
          }
          if (type === "depth") {
            const updatedasks = message.data.a;
            const updatedbids = message.data.b;
            callback({ asks: updatedasks, bids: updatedbids });
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async pushCallbacks(type: string, callback: any, id: string) {
    //"depth" => callback
    //"ticker" => callback
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async popCallbacks(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback: any) => callback.id === id
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}

/*

callbacks={
    "ticker": [callback1, callback2],
    "orderbook": [callback1, callback2],
    "trade": [callback1, callback2],
    "kline": [callback1, callback2],
    "order": [callback1, callback2],
    }



*/
