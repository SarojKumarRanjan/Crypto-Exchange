"use client";

import { getDepth,getTicker } from "@/lib/Apicalls";
import AsksTable from "../depth/asks";
import { Depth,Ticker } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import BidsTable from "./bids";



export default function Depths({market}: {market: string}){





    const [ticker, setTicker] = useState<Ticker>();
    const [ask, setAsks] = useState<[string, string][]>();
    const [bids, setBids] = useState<[string, string][]>();
    useEffect(() => {
        getDepth(market).then((data:Depth) => {
            
            setAsks(data.asks);
            setBids(data.bids.reverse());
           
            
        });

        getTicker(market).then((data:Ticker)=>{
            setTicker(data);
        })


    }, [market]);

    //console.log(depth);
    

    return (
        <div>
            <TableHeader market={market} />
            <ScrollArea className="w-full h-[480px] px-3">
                
            {ask && <AsksTable asks={ask} market={market} />}
            {ticker && <div className="text-sm font-bold  text-left px-2"> {ticker.lastPrice}</div>}
            {bids && <BidsTable bids={bids}  />}

            </ScrollArea>
           
        </div>
    )
}


function TableHeader({market}: {market: string}) {
    const [base, quote] = market.split("_");
    return (
       <div className="flex justify-between mx-2 text-xs font-semibold px-2 py-2">
        <div> Price ({quote})</div>
        <div>Size ({base})</div>
        <div>Total ({base})</div>
       </div>
    )
}


