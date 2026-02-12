import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Filter, RefreshCw, Leaf, BarChart3, DollarSign, Bell, BellOff, Briefcase, Newspaper, Settings } from 'lucide-react';

// Sample data - In production, this would come from a financial API
const mockStocks = [
  {
    id: 1,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Electric Vehicles',
    price: 248.50,
    change: 3.2,
    changePercent: 1.3,
    esgScore: 85,
    peRatio: 65.4,
    revenueGrowth: 18.5,
    marketCap: '789B',
    description: 'Leading EV manufacturer and clean energy company',
    sustainability: 'A-'
  },
  {
    id: 2,
    symbol: 'ENPH',
    name: 'Enphase Energy',
    sector: 'Solar Energy',
    price: 142.30,
    change: -1.8,
    changePercent: -1.2,
    esgScore: 92,
    peRatio: 48.2,
    revenueGrowth: 24.3,
    marketCap: '19.2B',
    description: 'Microinverter-based solar energy systems',
    sustainability: 'A+'
  },
  {
    id: 3,
    symbol: 'NEE',
    name: 'NextEra Energy',
    sector: 'Renewable Utilities',
    price: 78.90,
    change: 0.5,
    changePercent: 0.6,
    esgScore: 88,
    peRatio: 22.1,
    revenueGrowth: 12.7,
    marketCap: '158B',
    description: 'Largest renewable energy generator in North America',
    sustainability: 'A'
  },
  {
    id: 4,
    symbol: 'ICLN',
    name: 'iShares Clean Energy ETF',
    sector: 'Clean Energy ETF',
    price: 22.45,
    change: 0.8,
    changePercent: 3.7,
    esgScore: 90,
    peRatio: null,
    revenueGrowth: 15.2,
    marketCap: '4.8B',
    description: 'Diversified clean energy ETF with global exposure',
    sustainability: 'A'
  },
  {
    id: 5,
    symbol: 'FSLR',
    name: 'First Solar Inc.',
    sector: 'Solar Energy',
    price: 186.75,
    change: 5.2,
    changePercent: 2.9,
    esgScore: 89,
    peRatio: 32.5,
    revenueGrowth: 21.8,
    marketCap: '19.9B',
    description: 'Leading thin-film solar panel manufacturer',
    sustainability: 'A'
  },
  {
    id: 6,
    symbol: 'PLUG',
    name: 'Plug Power Inc.',
    sector: 'Hydrogen Energy',
    price: 3.82,
    change: -0.12,
    changePercent: -3.0,
    esgScore: 83,
    peRatio: null,
    revenueGrowth: 28.4,
    marketCap: '2.3B',
    description: 'Hydrogen fuel cell solutions provider',
    sustainability: 'B+'
  },
  {
    id: 7,
    symbol: 'VESTAS',
    name: 'Vestas Wind Systems',
    sector: 'Wind Energy',
    price: 24.15,
    change: 1.2,
    changePercent: 5.2,
    esgScore: 91,
    peRatio: 18.7,
    revenueGrowth: 14.6,
    marketCap: '24.8B',
    description: 'Global leader in wind turbine manufacturing',
    sustainability: 'A+'
  },
  {
    id: 8,
    symbol: 'RUN',
    name: 'Sunrun Inc.',
    sector: 'Solar Energy',
    price: 12.88,
    change: 0.45,
    changePercent: 3.6,
    esgScore: 86,
    peRatio: null,
    revenueGrowth: 19.3,
    marketCap: '2.9B',
    description: 'Residential solar installation and financing',
    sustainability: 'A-'
  }
];

const sectors = ['All', 'Solar Energy', 'Electric Vehicles', 'Wind Energy', 'Hydrogen Energy', 'Renewable Utilities', 'Clean Energy ETF'];

// Mock portfolio data - would come from user's actual holdings
const mockPortfolio = [
  { stockId: 1, symbol: 'TSLA', shares: 10, avgPrice: 245.30 },
  { stockId: 3, symbol: 'NEE', shares: 25, avgPrice: 76.50 },
  { stockId: 4, symbol: 'ICLN', shares: 100, avgPrice: 21.80 }
];

// Mock news data - would come from news API
const mockNews = [
  {
    id: 1,
    stockId: 1,
    symbol: 'TSLA',
    headline: 'Tesla Reports Record Q4 Deliveries',
    source: 'Reuters',
    timeAgo: '2h ago',
    sentiment: 'positive'
  },
  {
    id: 2,
    stockId: 2,
    symbol: 'ENPH',
    headline: 'Enphase Energy Expands European Operations',
    source: 'Bloomberg',
    timeAgo: '4h ago',
    sentiment: 'positive'
  },
  {
    id: 3,
    stockId: 5,
    symbol: 'FSLR',
    headline: 'First Solar Wins Major Federal Contract',
    source: 'CNBC',
    timeAgo: '6h ago',
    sentiment: 'positive'
  },
  {
    id: 4,
    stockId: 6,
    symbol: 'PLUG',
    headline: 'Hydrogen Sector Faces Headwinds Amid Policy Uncertainty',
    source: 'WSJ',
    timeAgo: '1d ago',
    sentiment: 'negative'
  }
];

export default function GreenStocksApp() {
  const [stocks, setStocks] = useState(mockStocks);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [news, setNews] = useState(mockNews);
  const [selectedSector, setSelectedSector] = useState('All');
  const [sortBy, setSortBy] = useState('esgScore');
  const [showFilters, setShowFilters] = useState(false);
  const [minESG, setMinESG] = useState(80);
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState('discover');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [alertStock, setAlertStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('greenStocksWatchlist');
    const savedPortfolio = localStorage.getItem('greenStocksPortfolio');
    const savedAlerts = localStorage.getItem('greenStocksPriceAlerts');
    
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedAlerts) setPriceAlerts(JSON.parse(savedAlerts));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('greenStocksWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('greenStocksPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('greenStocksPriceAlerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  // Check price alerts
  useEffect(() => {
    priceAlerts.forEach(alert => {
      const stock = stocks.find(s => s.id === alert.stockId);
      if (!stock) return;

      if (
        (alert.type === 'above' && stock.price >= alert.targetPrice) ||
        (alert.type === 'below' && stock.price <= alert.targetPrice)
      ) {
        // In production, this would trigger a notification
        console.log(`Alert triggered for ${stock.symbol}: Price is ${alert.type} $${alert.targetPrice}`);
      }
    });
  }, [stocks, priceAlerts]);

  // Filter and sort stocks
  const filteredStocks = stocks
    .filter(stock => selectedSector === 'All' || stock.sector === selectedSector)
    .filter(stock => stock.esgScore >= minESG)
    .sort((a, b) => {
      if (sortBy === 'esgScore') return b.esgScore - a.esgScore;
      if (sortBy === 'revenueGrowth') return b.revenueGrowth - a.revenueGrowth;
      if (sortBy === 'changePercent') return b.changePercent - a.changePercent;
      return 0;
    });

  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.id));

  // Calculate portfolio value
  const portfolioValue = portfolio.reduce((total, holding) => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (!stock) return total;
    return total + (stock.price * holding.shares);
  }, 0);

  const portfolioGainLoss = portfolio.reduce((total, holding) => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (!stock) return total;
    return total + ((stock.price - holding.avgPrice) * holding.shares);
  }, 0);

  const portfolioGainLossPercent = portfolio.reduce((total, holding) => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (!stock) return total;
    const cost = holding.avgPrice * holding.shares;
    return total + cost;
  }, 0);

  const gainLossPercent = portfolioGainLossPercent > 0 
    ? ((portfolioValue - portfolioGainLossPercent) / portfolioGainLossPercent) * 100 
    : 0;

  const toggleWatchlist = (stockId) => {
    setWatchlist(prev => 
      prev.includes(stockId) 
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId]
    );
  };

  // API Integration - Replace with real API calls
  const fetchStockData = async () => {
    setIsLoading(true);
    try {
      // Example API call structure:
      // const response = await fetch('https://api.example.com/stocks');
      // const data = await response.json();
      // setStocks(data);
      
      // For now, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate price updates
      setStocks(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: (Math.random() - 0.5) * 3,
        changePercent: (Math.random() - 0.5) * 4
      })));
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPrices = () => {
    fetchStockData();
  };

  const createPriceAlert = (stockId, targetPrice, type) => {
    const newAlert = {
      id: Date.now(),
      stockId,
      targetPrice,
      type, // 'above' or 'below'
      createdAt: new Date().toISOString()
    };
    setPriceAlerts(prev => [...prev, newAlert]);
    setShowAlertModal(false);
  };

  const removePriceAlert = (alertId) => {
    setPriceAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const addToPortfolio = (stockId, shares, avgPrice) => {
    const existing = portfolio.find(p => p.stockId === stockId);
    if (existing) {
      // Update existing holding
      setPortfolio(prev => prev.map(p => 
        p.stockId === stockId 
          ? { ...p, shares: p.shares + shares, avgPrice: ((p.avgPrice * p.shares) + (avgPrice * shares)) / (p.shares + shares) }
          : p
      ));
    } else {
      // Add new holding
      const stock = stocks.find(s => s.id === stockId);
      setPortfolio(prev => [...prev, { stockId, symbol: stock.symbol, shares, avgPrice }]);
    }
    setShowPortfolioModal(false);
  };

  const removeFromPortfolio = (stockId) => {
    setPortfolio(prev => prev.filter(p => p.stockId !== stockId));
  };

  const StockCard = ({ stock, compact = false }) => (
    <div 
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      onClick={() => !compact && setSelectedStock(stock)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-900">{stock.symbol}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              stock.sustainability.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {stock.sustainability}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">{stock.name}</p>
          <p className="text-xs text-gray-500 mt-1">{stock.sector}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(stock.id);
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Star 
            size={20} 
            className={watchlist.includes(stock.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
          />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {stock.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
          <span className="text-xs">({stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)})</span>
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">ESG Score</p>
            <p className="font-semibold text-green-600 flex items-center gap-1">
              <Leaf size={14} />
              {stock.esgScore}/100
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Revenue Growth</p>
            <p className="font-semibold text-blue-600">+{stock.revenueGrowth}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">P/E Ratio</p>
            <p className="font-semibold text-gray-700">{stock.peRatio ? stock.peRatio : 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf size={28} />
              Green Stocks
            </h1>
            <p className="text-green-100 text-sm mt-1">Sustainable investing made simple</p>
          </div>
          <button 
            onClick={refreshPrices}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        <div className="text-xs text-green-100 mt-2">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-4 gap-2 px-4 -mt-4 mb-4">
        <button
          onClick={() => setActiveTab('discover')}
          className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
            activeTab === 'discover' 
              ? 'bg-white text-green-600 shadow-md' 
              : 'bg-white/50 text-gray-600'
          }`}
        >
          <BarChart3 size={16} className="inline mb-1" />
          <div>Discover</div>
        </button>
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`py-3 px-2 rounded-xl font-semibold transition-all relative text-sm ${
            activeTab === 'watchlist' 
              ? 'bg-white text-green-600 shadow-md' 
              : 'bg-white/50 text-gray-600'
          }`}
        >
          <Star size={16} className="inline mb-1" />
          <div>Watch</div>
          {watchlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {watchlist.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`py-3 px-2 rounded-xl font-semibold transition-all relative text-sm ${
            activeTab === 'portfolio' 
              ? 'bg-white text-green-600 shadow-md' 
              : 'bg-white/50 text-gray-600'
          }`}
        >
          <Briefcase size={16} className="inline mb-1" />
          <div>Portfolio</div>
          {portfolio.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {portfolio.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
            activeTab === 'news' 
              ? 'bg-white text-green-600 shadow-md' 
              : 'bg-white/50 text-gray-600'
          }`}
        >
          <Newspaper size={16} className="inline mb-1" />
          <div>News</div>
        </button>
      </div>

      {/* Filters */}
      {activeTab === 'discover' && (
        <div className="px-4 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100"
          >
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <Filter size={18} />
              Filters & Sort
            </span>
            <span className="text-xs text-gray-500">
              {selectedSector !== 'All' && `${selectedSector} • `}
              ESG ≥{minESG}
            </span>
          </button>

          {showFilters && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-2">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">Sector</label>
                <div className="flex flex-wrap gap-2">
                  {sectors.map(sector => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedSector === sector
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Min ESG Score: {minESG}
                </label>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={minESG}
                  onChange={(e) => setMinESG(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="esgScore">ESG Score</option>
                  <option value="revenueGrowth">Revenue Growth</option>
                  <option value="changePercent">Price Change</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stock List */}
      <div className="px-4 pb-6">
        {activeTab === 'discover' && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedSector === 'All' ? 'All Stocks' : selectedSector}
              </h2>
              <span className="text-sm text-gray-500">{filteredStocks.length} stocks</span>
            </div>
            {filteredStocks.map(stock => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </>
        )}

        {activeTab === 'watchlist' && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">My Watchlist</h2>
              <span className="text-sm text-gray-500">{watchlistStocks.length} stocks</span>
            </div>
            {watchlistStocks.length === 0 ? (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No stocks in your watchlist</p>
                <p className="text-sm text-gray-400 mt-2">Tap the star icon to add stocks</p>
              </div>
            ) : (
              watchlistStocks.map(stock => (
                <StockCard key={stock.id} stock={stock} />
              ))
            )}
          </>
        )}

        {activeTab === 'portfolio' && (
          <>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-5 mb-4 shadow-lg">
              <h2 className="text-sm font-medium mb-2 opacity-90">Total Portfolio Value</h2>
              <div className="text-4xl font-bold mb-2">${portfolioValue.toFixed(2)}</div>
              <div className={`flex items-center gap-2 ${portfolioGainLoss >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {portfolioGainLoss >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="text-lg font-semibold">
                  {portfolioGainLoss >= 0 ? '+' : ''}${portfolioGainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">Holdings</h2>
              <span className="text-sm text-gray-500">{portfolio.length} positions</span>
            </div>

            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No holdings in your portfolio</p>
                <p className="text-sm text-gray-400 mt-2">Track your investments here</p>
              </div>
            ) : (
              portfolio.map(holding => {
                const stock = stocks.find(s => s.id === holding.stockId);
                if (!stock) return null;
                
                const currentValue = stock.price * holding.shares;
                const costBasis = holding.avgPrice * holding.shares;
                const gainLoss = currentValue - costBasis;
                const gainLossPercent = ((currentValue - costBasis) / costBasis) * 100;

                return (
                  <div key={holding.stockId} className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{stock.symbol}</h3>
                        <p className="text-sm text-gray-600">{holding.shares} shares @ ${holding.avgPrice.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromPortfolio(holding.stockId)}
                        className="text-red-500 text-xs px-2 py-1 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="font-bold text-lg">${currentValue.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gain/Loss</p>
                        <p className={`font-bold text-lg ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 text-sm font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gainLoss >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {activeTab === 'news' && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">Latest News</h2>
              <span className="text-sm text-gray-500">{news.length} articles</span>
            </div>

            {news.map(article => {
              const stock = stocks.find(s => s.id === article.stockId);
              return (
                <div key={article.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      article.sentiment === 'positive' ? 'bg-green-500' : 
                      article.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-green-600">{article.symbol}</span>
                        <span className="text-xs text-gray-500">{article.timeAgo}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{article.headline}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.source}</span>
                        {stock && (
                          <div className={`text-xs font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${stock.price.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Price Alert Modal */}
      {showAlertModal && alertStock && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end z-50"
          onClick={() => setShowAlertModal(false)}
        >
          <div 
            className="bg-white rounded-t-3xl p-6 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Set Price Alert</h2>
            <p className="text-gray-600 mb-4">Get notified when {alertStock.symbol} reaches your target price</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const targetPrice = parseFloat(formData.get('targetPrice'));
              const type = formData.get('alertType');
              createPriceAlert(alertStock.id, targetPrice, type);
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Price</label>
                <input
                  type="number"
                  name="targetPrice"
                  step="0.01"
                  required
                  defaultValue={alertStock.price.toFixed(2)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="alertType" value="above" defaultChecked />
                    <span className="text-sm">Price goes above</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="alertType" value="below" />
                    <span className="text-sm">Price goes below</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowAlertModal(false)}
                  className="py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add to Portfolio Modal */}
      {showPortfolioModal && selectedStock && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end z-50"
          onClick={() => setShowPortfolioModal(false)}
        >
          <div 
            className="bg-white rounded-t-3xl p-6 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add to Portfolio</h2>
            <p className="text-gray-600 mb-4">Track your holdings in {selectedStock.symbol}</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const shares = parseFloat(formData.get('shares'));
              const avgPrice = parseFloat(formData.get('avgPrice'));
              addToPortfolio(selectedStock.id, shares, avgPrice);
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                <input
                  type="number"
                  name="shares"
                  step="0.01"
                  required
                  min="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Purchase Price</label>
                <input
                  type="number"
                  name="avgPrice"
                  step="0.01"
                  required
                  min="0.01"
                  defaultValue={selectedStock.price.toFixed(2)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowPortfolioModal(false)}
                  className="py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                >
                  Add Holding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Detail Modal */}
      {selectedStock && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end z-50"
          onClick={() => setSelectedStock(null)}
        >
          <div 
            className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedStock.symbol}</h2>
                <p className="text-gray-600">{selectedStock.name}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(selectedStock.id);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Star 
                  size={24} 
                  className={watchlist.includes(selectedStock.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">${selectedStock.price.toFixed(2)}</span>
                <div className={`flex items-center gap-1 text-lg font-medium ${
                  selectedStock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedStock.changePercent >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span>{selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{selectedStock.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf size={18} className="text-green-600" />
                  <p className="text-xs text-gray-600">ESG Score</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{selectedStock.esgScore}/100</p>
                <p className="text-xs text-green-700 mt-1">Rating: {selectedStock.sustainability}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={18} className="text-blue-600" />
                  <p className="text-xs text-gray-600">Revenue Growth</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">+{selectedStock.revenueGrowth}%</p>
                <p className="text-xs text-blue-700 mt-1">YoY Growth</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Sector</span>
                <span className="font-semibold">{selectedStock.sector}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-semibold">${selectedStock.marketCap}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">P/E Ratio</span>
                <span className="font-semibold">{selectedStock.peRatio || 'N/A'}</span>
              </div>
            </div>

            {/* Price Alerts for this stock */}
            {priceAlerts.filter(a => a.stockId === selectedStock.id).length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Active Alerts</h3>
                {priceAlerts.filter(a => a.stockId === selectedStock.id).map(alert => (
                  <div key={alert.id} className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg mb-2">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-yellow-600" />
                      <span className="text-sm">
                        Alert when price goes {alert.type} ${alert.targetPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePriceAlert(alert.id);
                      }}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAlertStock(selectedStock);
                  setShowAlertModal(true);
                }}
                className="py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
              >
                <Bell size={18} />
                Price Alert
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPortfolioModal(true);
                }}
                className="py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Briefcase size={18} />
                Add Holding
              </button>
            </div>

            <button
              onClick={() => setSelectedStock(null)}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
