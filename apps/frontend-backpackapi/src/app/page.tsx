import Image from "next/image";
import { Apple, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Clash_Display']">
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Content Section */}
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Trade Crypto with Confidence
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Experience secure and seamless cryptocurrency trading on our powerful centralized exchange platform.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Bank-Grade Security</h3>
                  <p className="text-muted-foreground">Advanced encryption and multi-layer protection for your assets</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary rounded-lg shrink-0">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Lightning-Fast Trades</h3>
                  <p className="text-muted-foreground">Execute trades instantly with our high-performance matching engine</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                Start Trading
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative mt-4 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-background blur-3xl rounded-full" />
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <Image 
                src="/desktop.png" 
                alt="Trading Platform Mobile Interface"
                
                width={800}
                height={600}
                priority
              />
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}