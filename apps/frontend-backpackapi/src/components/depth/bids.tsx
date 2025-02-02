
export default function BidsTable({
  bids,
 
}: {
  bids: [string, string][];
 
}) {
 
    if (!bids) {
        return <div>Loading...</div>;
      }

      let currentTotal = 0; 
      const relevantBids = bids.slice(0, 20);
      const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => [price, quantity, currentTotal += Number(quantity)]);
      const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

  //console.log(bidsWithTotal);

  

  
  return (
  
       
       
            <div className="">
                {bidsWithTotal.map(([price, size, total], index) => (
                    <div key={index} className="flex justify-between mx-2 text-xs font-light my-1">
                        <div className="text-green-500">{price}</div>
                        <div>{size}</div>
                        <div>{parseFloat(total.toString()).toFixed(5)}</div>
                    </div>
                ))}
           
            </div>
       
     
    
  );
}

