"use client";

import { getDepth } from "@/lib/Apicalls";
import AsksTable from "../depth/asks";
import { Depth } from "@/lib/types";
import React, { useEffect, useState } from "react";



export default function Depths({market}: {market: string}){





    const [depth, setDepth] = useState<Depth>();
    const [ask, setAsks] = useState<[string, string][]>();
    const [bids, setBids] = useState<[string, string][]>();
    useEffect(() => {
        getDepth(market).then((data) => {
            setDepth(data);
            setAsks(data.asks);
            setBids(data.bids);
           
            
        });
    }, [market]);

    console.log(depth);
    









    return (
        <div>
            <h1>Depths</h1>
        </div>
    )
}