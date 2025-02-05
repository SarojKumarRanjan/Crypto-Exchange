"use client";

import { useEffect, useRef } from "react";
import { ChartManager } from "../lib/ChartManager";
import { getKlines } from "../lib/Apicalls";
import { KLine } from "../lib/types";
import { log } from "console";
import { WebsocketManager } from "@/lib/Websocket";

export default function KlinesChart({
  market,
}: {
  market: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);

  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000)); 
        
        //console.log(klineData);
        
        
      } catch (e) { }

      if (chartRef) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy();
        }

        const chartManager = new ChartManager(
          chartRef.current,
          [
            ...klineData?.map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: Math.floor(new Date(x.end).getTime() / 1000),
            })),
          ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
          {
            background: "#0e0f14",
            color: "white",
          }
        );
        //@ts-ignore
        chartManagerRef.current = chartManager;
      }
    };
    init();

    const callbackId = `Kline-${market}`;

    WebsocketManager.getInstance().pushCallbacks("kline", (data: any) => {
     // console.log(data);
      if(chartManagerRef.current)
       
      chartManagerRef.current.update(data);
    }, callbackId);

    WebsocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`kline.1h.${market}`],
    });

    return () => {
      WebsocketManager.getInstance().popCallbacks("kline", callbackId);
      WebsocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`kline.1h.${market}`],
      });
    }

  }, [market, chartRef]);

  return (
    <>
      <div className="h-[560px] w-full rounded-md" ref={chartRef} ></div>
    </>
  );
}