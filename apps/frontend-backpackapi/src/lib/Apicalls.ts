import axios from "axios";
import {  KLine,Ticker,Depth,Trade} from "./types";



const BASE_URL = "http://localhost:3001/api/v1";



export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}



export async function getTickers(): Promise<Ticker[]> {
    const response = await axios.get(`${BASE_URL}/tickers`);
    const data: Ticker[] = response.data;
    return data;
}

export async function getTicker(market: string): Promise<Ticker> {
    const response = await axios.get(`${BASE_URL}/ticker?symbol=${market}`);
    const data: Ticker = response.data;
    return data;
}

export async function getDepth(market: string): Promise<Depth> {
    console.log("api called");
    
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    console.log(response);
    const data: Depth = response.data;
    
    return data;
}

export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}&limit=100`);
    const data: Trade[] = response.data;
    
    
    return data;
}












