"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

import { getTrades } from "@/lib/Apicalls";
import { Trade } from "@/lib/types";
import { WebsocketManager } from "@/lib/Websocket";

export default function TradesTable({ market }: { market: string }) {
  const [trades, setTrades] = useState<Trade[]>();
  const [base, quote] = market.split("_");
  
  useEffect(() => {
    getTrades(market).then((data) => {
      setTrades(data);
      //console.log(data);
    });
  
    const callbackId = `Trade-${market}`;
  
    
    WebsocketManager.getInstance().pushCallbacks("trade", (data: Partial<Trade>) => {
      setTrades((prevTrades: Trade[] | undefined) => {
        //console.log(data);
        
        const newTrade: Trade = {
          id: data?.id ?? 0,
          isBuyerMaker: data?.isBuyerMaker ?? false,
          price: data?.price ?? "",
          quantity: data?.quantity ?? "",
          quoteQuantity: data?.quoteQuantity ?? "",
          timestamp: data?.timestamp?? 0,
        };
        
        return [newTrade, ...(prevTrades || [])].slice(0, 100);
      });
    }, callbackId);

    WebsocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${market}`],
    });
  
    return () => {
      WebsocketManager.getInstance().popCallbacks("trade", callbackId);
      WebsocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });

    }
  }, [market]);
  if (!trades) return <div>Loading...</div>;

  return (
    <ScrollArea className="w-full h-[520px] px-3">
      <table className="w-full ">
        <thead className="text-xs">
          <tr className="border-b ">
            <th className="py-2 text-left">Price ({quote})</th>
            <th className="py-2 text-left">Qty ({base})</th>
            <th className="py-2 text-left">Time</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade: Trade) => (
            <tr key={trade.id} className="text-xs mx-2">
              <td
                className={`py-1  ${
                  trade.isBuyerMaker == false
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {parseFloat(trade.price).toFixed(2)}
              </td>
              <td className="py-1 ">{trade.quantity}</td>
              <td className="py-1 ">
                {getTimestamp(trade.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

function getTimestamp(timestamp: number) {
  const istTime = new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Ensures 24-hour format
    timeZone: "Asia/Kolkata", // IST TimeZone
  });

  return istTime;
}
