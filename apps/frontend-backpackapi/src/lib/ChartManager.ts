import {
    ColorType,
    createChart as createLightWeightChart,
    CrosshairMode,
    ISeriesApi,
    UTCTimestamp,
    CandlestickSeries,
   
    
  } from "lightweight-charts";
  
  
  export class ChartManager {
    private candleSeries: ISeriesApi<"Candlestick">;
    private lastUpdateTime: number = 0;
    private chart: any;
    private currentBar: {
      open: number | null;
      high: number | null;
      low: number | null;
      close: number | null;
      
    } = {
      open: null,
      high: null,
      low: null,
      close: null,
     
    };
  
    constructor(
      ref: any,
      initialData: any[],
      layout: { background: string; color: string }
    ) {
      const chart = createLightWeightChart(ref, {
        autoSize: true,
        overlayPriceScales: {
          ticksVisible: true,
          borderVisible: true,
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          visible: true,
          ticksVisible: true,
          entireTextOnly: true,
        },
        grid: {
          horzLines: {
            visible: false,
          },
          vertLines: {
            visible: false,
          },
        },
        layout: {
          background: {
            type: ColorType.Solid,
            color: layout.background,
          },
          textColor: "white",
        },
      });
      this.chart = chart;
      this.candleSeries = chart.addSeries(CandlestickSeries);
  //console.log("candle data stream",initialData);
  
      this.candleSeries.setData(
        initialData.map((data) => ({
          ...data,
          time: data.timestamp as UTCTimestamp,
        }))
      );
    }
    public update(klineData: {
      t: number; // K-Line start time (Seconds)
      T: number; // K-Line close time (Seconds)
      o: string; // Open price
      c: string; // Close price
      h: string; // High price
      l: string; // Low price
      X: boolean; // Is this k-line closed?
    }) {
     // console.log("candle data stream",klineData);
      
     const candleStartTime = new Date(klineData.t).getTime(); 
    //console.log("candleStartTime", klineData);

    //console.log("candleStartTime", klineData.t);
    
    
      if (this.lastUpdateTime === 0 || candleStartTime > this.lastUpdateTime) {
        // New Candle
        this.currentBar = {
          open: parseFloat(klineData.o),
          high: parseFloat(klineData.h),
          low: parseFloat(klineData.l),
          close: parseFloat(klineData.c),
        };
        this.candleSeries.update({
          time: candleStartTime as UTCTimestamp,
          ...this.currentBar,
        });

       /*  console.log("candle data stream",{
          time: (candleStartTime ) as UTCTimestamp,
          ...this.currentBar,
        }); */
        
        this.lastUpdateTime = candleStartTime;
      } else {
        // Update existing candle
        if (this.currentBar.open !== null) {
          this.currentBar.high = Math.max(this.currentBar.high!, parseFloat(klineData.h));
          this.currentBar.low = Math.min(this.currentBar.low!, parseFloat(klineData.l));
          this.currentBar.close = parseFloat(klineData.c);
    
          this.candleSeries.update({
            time: (candleStartTime) as UTCTimestamp,
            ...this.currentBar,
          });
        }
      }
    
     // console.log("cndle data stream",this.currentBar);
      
      // If candle is closed, move to the next candle
      if (klineData.X) {
        this.lastUpdateTime = candleStartTime;
      }
    }
    
    public destroy() {
      this.chart.remove();
    }
  }