



import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  import TradesTable from "./depth/trades";
  import Depths from "./depth/depths";

export default function OrderBook({market}: {market: string}) {
  


    return (
        <Tabs className="w-full h-[560px]" defaultValue="orderbook">
        <TabsList className="w-full flex justify-around">
            <TabsTrigger value="orderbook">Order Book</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
        </TabsList>
        <TabsContent value="orderbook">
            <Depths market={market}/>
        </TabsContent>
        <TabsContent value="trades">
            <TradesTable market={market}/>
        </TabsContent>
        </Tabs>
    );
}


 

