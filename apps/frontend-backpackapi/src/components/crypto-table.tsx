"use client";
import { useEffect, useState } from "react";
import { Ticker } from "@/lib/types";
import { getTickers } from "@/lib/Apicalls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CryptoMarket() {
  const [cryptoData, setCryptoData] = useState<Ticker[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTickers();
        setCryptoData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              Spot Crypto Market
            </CardTitle>
            <CardDescription>
              Live prices and market data for top cryptocurrencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingState />
            ) : (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3 md:w-1/4 p-4">
                          Name
                        </TableHead>
                        <TableHead className="text-right p-4">Price</TableHead>
                        <TableHead className="text-right p-4 hidden sm:table-cell">
                          <div className="flex items-center justify-end">
                            Market Cap
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right p-4 hidden md:table-cell">
                          <div className="flex items-center justify-end">
                            24h Volume
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right p-4">
                          <div className="flex items-center justify-end">
                            24h Change
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cryptoData &&
                        cryptoData.map((crypto) => (
                          <TableRow
                            key={crypto.symbol}
                            className="hover:bg-muted/50"
                          >
                            <TableCell className="font-medium p-4">
                              <Link
                                href={`/trade/${crypto.symbol}`}
                                className="block"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                                    {crypto.symbol.split("_")[0].charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {crypto.symbol.split("_")[0]}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {crypto.symbol}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right p-4">
                              <Link
                                href={`/trade/${crypto.symbol}`}
                                className="block"
                              >
                                ${crypto.lastPrice.toLocaleString()}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right p-4 hidden sm:table-cell">
                              <Link
                                href={`/trade/${crypto.symbol}`}
                                className="block"
                              >
                                ${crypto.volume.toLocaleString()}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right p-4 hidden md:table-cell">
                              <Link
                                href={`/trade/${crypto.symbol}`}
                                className="block"
                              >
                                ${crypto.quoteVolume.toLocaleString()}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right p-4">
                              <Link
                                href={`/trade/${crypto.symbol}`}
                                className="block"
                              >
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                                    parseFloat(crypto.priceChangePercent) >= 0
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {parseFloat(crypto.priceChangePercent) >= 0
                                    ? "+"
                                    : ""}
                                  {crypto.priceChangePercent}%
                                </span>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
