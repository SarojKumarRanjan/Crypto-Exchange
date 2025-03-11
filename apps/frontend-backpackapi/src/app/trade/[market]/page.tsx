import MarketBar from "@/components/marketbar";
import KlinesChart from "@/components/klineschart";
import OrderBook from "@/components/orderbook";
import OrderSwap from "@/components/orderSwap";

export default async function TradePage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  return (
    <div className="font-['Clash_Display'] flex flex-col lg:flex-row flex-1 p-4 gap-4">
      {/* Left Section */}
      <div className="flex flex-col flex-1 w-full lg:w-auto">
        <div className="mb-4">
          <MarketBar market={market as string} />
        </div>
        <div className="flex flex-col lg:flex-row flex-1 gap-4">
          <div className="flex-1">
            <KlinesChart market={market as string} />
          </div>
          <div className="w-full lg:w-1/4">
            <OrderBook market={market as string} />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/5 min-w-[300px]">
        <OrderSwap market={market as string} />
      </div>
    </div>
  );
}