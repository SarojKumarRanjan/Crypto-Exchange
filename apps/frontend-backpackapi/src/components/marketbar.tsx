"use client";

import React, { useState } from "react";
import { Ticker } from "@/lib/types";
import { getTicker } from "@/lib/Apicalls";
import { useEffect } from "react";

const MarketPairButton: React.FC<{ symbol: string }> = ({ symbol }) => {
  // Split symbol into base and quote (e.g., BTC_USDC)

  const [base, quote] = symbol.split("_");

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
                style={{ color: "transparent" }}
              />
            </div>
            <p className="font-medium text-nowrap text-foreground">
              {base}
              <span className="text-muted-foreground">/{quote}</span>
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

const MarketStat: React.FC<{
  label: string;
  value: string | number;
  isNegative?: boolean;
}> = ({ label, value, isNegative = false }) => {
  return (
    <div className="flex justify-center flex-col relative">
      <p className="font-medium text-xs text-muted-foreground">{label}</p>
      <span
        className={`mt-1 text-sm font-normal tabular-nums leading-4 text-foreground ${
          isNegative ? "text-destructive" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};

const MarketBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Ticker>();

  useEffect(() => {
    getTicker(market).then((ticker: Ticker) => {
      setTicker(ticker);
    });
  }, [market]);

  if (!ticker) {
    return <div>loading.....</div>;
  }

  return (
    <div className="flex items-center flex-row no-scrollbar mr-4 h-[72px] w-full overflow-auto pl-4 bg-background border-b">
      <div className="flex justify-between flex-row w-full gap-4">
        <div className="flex flex-row shrink-0 gap-[32px]">
          <MarketPairButton symbol={ticker.symbol} />
          <div className="flex flex-col h-full justify-center">
            <p className={`   text-md text-green-500`}>{ticker?.lastPrice}</p>
            <p className="  text-sm ">${ticker?.lastPrice}</p>
          </div>
          <div className="flex items-center flex-row flex-wrap space-x-6">
            <div>
              <div className="flex flex-col">
                <p className={`font-medium text-xs text-muted-foreground`}>
                  24H Change
                </p>
                <p
                  className={`  font-medium tabular-nums leading-5 text-sm  ${Number(ticker?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {Number(ticker?.priceChange) > 0 ? "+" : ""}{" "}
                  {ticker?.priceChange}{" "}
                  {Number(ticker?.priceChangePercent)?.toFixed(2)}%
                </p>
              </div>
              <div className="flex flex-col"></div>
            </div>

            <MarketStat label="24H High" value={ticker.high} />
            <MarketStat label="24H Low" value={ticker.low} />
            <MarketStat
              label="24H Volume (USDC)"
              value={parseInt(ticker.quoteVolume).toFixed(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketBar;
