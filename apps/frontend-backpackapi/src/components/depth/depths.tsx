"use client";

import { getDepth, getTicker } from "@/lib/Apicalls";
import AsksTable from "../depth/asks";
import { Depth, Ticker } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import BidsTable from "./bids";
import { WebsocketManager } from "@/lib/Websocket";

interface DepthEvent {
          // Symbol (e.g., "SOL_USDC")
  asks: [string, string][]; // Asks array: [price, quantity][]
  bids: [string, string][]; // Bids array: [price, quantity][]
         // Engine timestamp in microseconds
}

export default function Depths({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Ticker>();
  const [ask, setAsks] = useState<[string, string][]>();
  const [bids, setBids] = useState<[string, string][]>();
  useEffect(() => {
    getDepth(market).then((data: Depth) => {
      
  const releventAsks = data.asks.slice(0, 20);
  
  const releventBids = data.bids.slice(0, 20);
      setAsks(releventAsks);
      setBids(releventBids.reverse());
    });
    getTicker(market).then((data: Ticker) => {
      setTicker(data);
    });

    //websocket streams for price, asks , bids

    WebsocketManager.getInstance().pushCallbacks(
      "depth",
      (data: DepthEvent) => {
        
      if(data.bids.length>0){
        
        
        if(parseFloat(data.bids[0][0])!=0 && parseFloat(data.bids[0][1])!=0){
        
        
         setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          let newArray = bidsAfterUpdate.slice(1); 
        newArray = [...newArray,data.bids[0]];
          return newArray;
        });
      }}
      if(data.asks.length>0){ if(parseFloat(data.asks[0][0])!=0 && parseFloat(data.asks[0][1])!=0){
     
          
          
        setAsks((originalAsks) => {
          
          
          const asksAfterUpdate = [...(originalAsks || [])];
          let newArray = asksAfterUpdate.slice(1); 
          newArray = [...newArray,data.bids[0]];
            return newArray;
        });
      }}
      },
      `depth-${market}`
    );

    WebsocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    return () => {
      WebsocketManager.getInstance().popCallbacks("depth", `depth-${market}`);
      WebsocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });
    };
  }, [market]);

  //console.log(depth);

  return (
    <div>
      <TableHeader market={market} />
      <ScrollArea className="w-full h-[480px] px-3">
        {ask && <AsksTable asks={ask} market={market} />}
        {ticker && (
          <div className="text-sm font-bold  text-left px-2">
            {" "}
            {ticker.lastPrice}
          </div>
        )}
        {bids && <BidsTable bids={bids} />}
      </ScrollArea>
    </div>
  );
}

function TableHeader({ market }: { market: string }) {
  const [base, quote] = market.split("_");
  return (
    <div className="flex justify-between mx-2 text-xs font-semibold px-2 py-2">
      <div> Price ({quote})</div>
      <div>Size ({base})</div>
      <div>Total ({base})</div>
    </div>
  );
}
