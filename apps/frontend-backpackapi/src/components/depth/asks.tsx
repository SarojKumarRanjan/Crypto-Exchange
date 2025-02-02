/*
depth structure 


export interface Depth{
        
        bids: Array<[string, string]>,
        asks: Array<[string, string]>,
        lastUpdateId: string,
        timestamp: number

    }

    //dummy data defining this structure

    const depth: Depth = {
        bids: [
            ["1", "2"],
            ["3", "4"],
        ],
        asks: [
            ["5", "6"],
            ["7", "8"],
        ],
        lastUpdateId: "1",
        timestamp: 123456789,


*/



export default function AsksTable({
  asks,
  
}: {
  asks: [string, string][];
  market: string;
}) {
  //console.log(asks);
  /* 

    1-> slice the asks array to get only the first 20 elements
    2-> Calculate cumulative totals from worst to best price
    3-> Reverse iteration without modifying array
    4-> Prepare final data structure

    
    */

    if (!asks) {
        return <div>Loading...</div>;
      }

  const releventAsks = asks.slice(0, 20);
  let currentTotal = 0;
  const totals: number[] = [];

  for (let i = releventAsks.length - 1; i >= 0; i--) {
    const quantity = Number(releventAsks[i][1]);
    currentTotal += quantity;
    totals.push(currentTotal);
  }

  const maxTotal = currentTotal;
  releventAsks.reverse();
  const asksWithTotal = releventAsks.map(([price, quantity], index) => [
    price,
    quantity,
    totals[totals.length - 1 - index], // Gets reversed  total
  ]);

  //console.log(asksWithTotal);

  

  
  return (
  
       
       
            <div className="">
                {asksWithTotal.map(([price, size, total], index) => (
                    <div key={index} className="flex justify-between mx-2 text-xs font-light my-1">
                        <div className="text-destructive">{price}</div>
                        <div>{size}</div>
                        <div>{parseFloat(total.toString()).toFixed(5)}</div>
                    </div>
                ))}
           
            </div>
       
     
    
  );
}

