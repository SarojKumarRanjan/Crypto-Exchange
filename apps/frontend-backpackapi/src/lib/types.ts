export interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}




    export interface Ticker{
        symbol: string,
        firstPrice: string,
        lastPrice: string,
        priceChange: string,
        priceChangePercent: string,
        high: string,
        low: string,
        volume: string,
        quoteVolume: string,
        trades: string
    }



    export interface Depth{
        
        bids: Array<[string, string]>,
        asks: Array<[string, string]>,
        lastUpdateId: string,
        timestamp: number

    }


 

    export interface Trade{
        id: number,
        isBuyerMaker: boolean,
        price: string,
        quantity: string,
        quoteQuantity: string,
        timestamp: number
    }