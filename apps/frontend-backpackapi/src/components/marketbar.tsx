import React from 'react';

// Define the type for the market data
type MarketData = {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
};



// Sub-component for the market pair button
const MarketPairButton: React.FC<{ symbol: string }> = ({ symbol }) => {
  // Split symbol into base and quote (e.g., BTC_USDC)
  const base = "BTC";
  const quote = "USDC";

  return (
    <button
      type="button"
      aria-expanded="false"
      className="flex items-center justify-between flex-row cursor-pointer rounded-xl bg-background hover:bg-accent p-2 hover:opacity-90"
    >
      <div className="flex flex-row mr-2">
        <a href={`/trade/${symbol}`}>
          <div className="flex items-center flex-row gap-2">
            <div className="flex flex-row relative shrink-0">
              <img
                alt={`${base} Logo`}
                loading="lazy"
                width={24}
                height={24}
                decoding="async"
                className="z-10 rounded-full"
                src="https://img.freepik.com/free-vector/bitcoin-currency-sign_1284-3685.jpg?ga=GA1.1.1409867057.1734181511&semt=ais_hybrid"
                style={{ color: 'transparent' }}
              />
            </div>
            <p className="font-medium text-nowrap text-foreground">
              {base}<span className="text-muted-foreground">/{quote}</span>
            </p>
          </div>
        </a>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-down text-muted-foreground"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
};

// Sub-component for displaying a market stat
const MarketStat: React.FC<{ label: string; value: string | number; isNegative?: boolean }> = ({
  label,
  value,
  isNegative = false,
}) => {
  return (
    <div className="flex justify-center flex-col relative">
      <p className="font-medium text-xs text-muted-foreground">{label}</p>
      <span
        className={`mt-1 text-sm font-normal tabular-nums leading-4 text-foreground ${
          isNegative ? 'text-destructive' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
};

// Main MarketBar component
const MarketBar = ({ market }: { market: string }) => {
  const symbol = "BTC_USDC";
  const price = 50000;
  const change24h = 0.5;
  const high24h = 60000;
  const low24h = 40000;
  const volume24h = 100000000;

  return (
    <div className="flex items-center flex-row no-scrollbar mr-4 h-[72px] w-full overflow-auto pl-4 bg-background border-b">
      <div className="flex justify-between flex-row w-full gap-4">
        <div className="flex flex-row shrink-0 gap-[32px]">
          <MarketPairButton symbol={symbol} />
          <div className="flex items-center flex-row flex-wrap space-x-6">
            <MarketStat label="Price" value={price.toLocaleString()} isNegative={price < 0} />
            <MarketStat label="24H Change" value={`${change24h.toFixed(2)}%`} isNegative={change24h < 0} />
            <MarketStat label="24H High" value={high24h.toLocaleString()} />
            <MarketStat label="24H Low" value={low24h.toLocaleString()} />
            <MarketStat label="24H Volume (USDC)" value={volume24h.toLocaleString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketBar;