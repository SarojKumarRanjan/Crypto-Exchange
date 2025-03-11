"use client";
import { useEffect,useState } from "react";
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
} from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";





export default function CryptoMarket() {


    const [cryptoData, setCryptoData] = useState<Ticker[]>();

    useEffect(() => {
        getTickers().then((data) => {
            setCryptoData(data);
        });
    }, []);

    if (!cryptoData) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-none">
          <CardHeader className="mb-4 p-4">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Spot Crypto Market
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3 md:w-1/4 lg:w-1/5">Name</TableHead>
                      <TableHead className="text-right min-w-[100px]">Price</TableHead>
                      <TableHead className="text-right min-w-[100px] hidden sm:table-cell">
                        Market Cap
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      </TableHead>
                      <TableHead className="text-right min-w-[100px] hidden md:table-cell">
                        24h Volume
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      </TableHead>
                      <TableHead className="text-right min-w-[100px]">
                        24h Change
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map((crypto) => (
                        
                      <TableRow key={crypto.symbol} className="hover:bg-muted/50">
                        <Link href={`/trade/${crypto.symbol}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-xl md:text-2xl">{crypto.symbol.split("_")[0]}</span>
                            <div>
                              <div className="font-medium text-sm md:text-base lg:text-lg">{crypto.symbol}</div>
                              <div className="text-xs md:text-sm text-muted-foreground">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm md:text-base">
                          ${crypto.lastPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm md:text-base hidden sm:table-cell">
                          ${crypto.volume.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm md:text-base hidden md:table-cell">
                          ${crypto.quoteVolume.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={`text-right text-sm md:text-base ${
                            parseInt(crypto.priceChange) >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {crypto.priceChangePercent}%
                        </TableCell>
                        </Link>
                      </TableRow>
                        
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}