import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Filter, RefreshCw, Leaf, BarChart3, DollarSign, Search, X, Plus, Activity, PieChart, Bell, BellOff, Briefcase, Newspaper } from 'lucide-react';

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
    volume: '124.5M',
    yearHigh: 299.29,
    yearLow: 138.80,
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
    volume: '8.3M',
    yearHigh: 185.45,
    yearLow: 81.72,
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
    volume: '12.1M',
    yearHigh: 85.32,
    yearLow: 65.21,
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
    volume: '15.2M',
    yearHigh: 28.90,
    yearLow: 18.34,
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
    volume: '3.8M',
    yearHigh: 215.60,
    yearLow: 136.42,
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
    volume: '45.6M',
    yearHigh: 9.88,
    yearLow: 2.31,
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
    volume: '2.1M',
    yearHigh: 29.45,
    yearLow: 18.92,
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
    volume: '11.4M',
    yearHigh: 19.87,
    yearLow: 8.42,
    description: 'Residential solar installation and financing',
    sustainability: 'A-'
  },
  {
    id: 9,
    symbol: 'ORSTED',
    name: 'Ørsted A/S',
    sector: 'Renewable Utilities',
    price: 45.30,
    change: 1.8,
    changePercent: 4.1,
    esgScore: 94,
    peRatio: 28.3,
    revenueGrowth: 16.7,
    marketCap: '19.1B',
    volume: '1.8M',
    yearHigh: 58.23,
    yearLow: 38.45,
    description: 'Leading offshore wind developer',
    sustainability: 'A+'
  },
  {
    id: 10,
    symbol: 'BEP',
    name: 'Brookfield Renewable',
    sector: 'Renewable Utilities',
    price: 27.65,
    change: -0.35,
    changePercent: -1.2,
    esgScore: 87,
    peRatio: 19.4,
    revenueGrowth: 13.2,
    marketCap: '17.2B',
    volume: '2.9M',
    yearHigh: 32.89,
    yearLow: 24.12,
    description: 'Diversified renewable energy portfolio',
    sustainability: 'A'
  }
];

const sectors = ['All', 'Solar Energy', 'Electric Vehicles', 'Wind Energy', 'Hydrogen Energy', 'Renewable Utilities', 'Clean Energy ETF'];

// Mock portfolio data
const mockPortfolio = [
  { stockId: 1, symbol: 'TSLA', shares: 10, avgPrice: 245.30 },
  { stockId: 3, symbol: 'NEE', shares: 25, avgPrice: 76.50 },
  { stockId: 4, symbol: 'ICLN', shares: 100, avgPrice: 21.80 }
];

// Mock news data
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
  },
  {
    id: 5,
    stockId: 7,
    symbol: 'VESTAS',
    headline: 'Vestas Secures Major Offshore Wind Contract',
    source: 'Financial Times',
    timeAgo: '8h ago',
    sentiment: 'positive'
  },
  {
    id: 6,
    stockId: 9,
    symbol: 'ORSTED',
    headline: 'Ørsted Announces Record Renewable Energy Output',
    source: 'Bloomberg',
    timeAgo: '12h ago',
    sentiment: 'positive'
  }
];

export default function GreenStocksWeb() {
  const [stocks, setStocks] = useState(mockStocks);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [news, setNews] = useState(mockNews);
  const [selectedSector, setSelectedSector] = useState('All');
  const [sortBy, setSortBy] = useState('esgScore');
  const [minESG, setMinESG] = useState(80);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [view, setView] = useState('grid');
  const [activeSection, setActiveSection] = useState('discover'); // 'discover', 'portfolio', 'news'
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
        console.log(`Alert triggered for ${stock.symbol}: Price is ${alert.type} $${alert.targetPrice}`);
      }
    });
  }, [stocks, priceAlerts]);

  // Filter and sort stocks
  const filteredStocks = stocks
    .filter(stock => selectedSector === 'All' || stock.sector === selectedSector)
    .filter(stock => stock.esgScore >= minESG)
    .filter(stock => 
      searchTerm === '' || 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'esgScore') return b.esgScore - a.esgScore;
      if (sortBy === 'revenueGrowth') return b.revenueGrowth - a.revenueGrowth;
      if (sortBy === 'changePercent') return b.changePercent - a.changePercent;
      return 0;
    });

  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.id));

  const toggleWatchlist = (stockId) => {
    setWatchlist(prev => 
      prev.includes(stockId) 
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId]
    );
  };

  const refreshPrices = () => {
    setStocks(prev => prev.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 2,
      change: (Math.random() - 0.5) * 3,
      changePercent: (Math.random() - 0.5) * 4
    })));
    setLastUpdate(new Date());
  };

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

  const portfolioCostBasis = portfolio.reduce((total, holding) => {
    return total + (holding.avgPrice * holding.shares);
  }, 0);

  const gainLossPercent = portfolioCostBasis > 0 
    ? ((portfolioValue - portfolioCostBasis) / portfolioCostBasis) * 100 
    : 0;

  const createPriceAlert = (stockId, targetPrice, type) => {
    const newAlert = {
      id: Date.now(),
      stockId,
      targetPrice,
      type,
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
      setPortfolio(prev => prev.map(p => 
        p.stockId === stockId 
          ? { ...p, shares: p.shares + shares, avgPrice: ((p.avgPrice * p.shares) + (avgPrice * shares)) / (p.shares + shares) }
          : p
      ));
    } else {
      const stock = stocks.find(s => s.id === stockId);
      setPortfolio(prev => [...prev, { stockId, symbol: stock.symbol, shares, avgPrice }]);
    }
    setShowPortfolioModal(false);
  };

  const removeFromPortfolio = (stockId) => {
    setPortfolio(prev => prev.filter(p => p.stockId !== stockId));
  };

  // Calculate portfolio stats
  const avgESG = watchlistStocks.length > 0
    ? (watchlistStocks.reduce((sum, s) => sum + s.esgScore, 0) / watchlistStocks.length).toFixed(1)
    : 0;
  const avgGrowth = watchlistStocks.length > 0
    ? (watchlistStocks.reduce((sum, s) => sum + s.revenueGrowth, 0) / watchlistStocks.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <Leaf size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Green Stocks Platform</h1>
                <p className="text-sm text-gray-600">Sustainable investing for a better future</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity size={16} className="text-green-600" />
                <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={refreshPrices}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 space-y-6">
            {/* Section Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveSection('discover')}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    activeSection === 'discover'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 size={16} className="mx-auto mb-1" />
                  Discover
                </button>
                <button
                  onClick={() => setActiveSection('portfolio')}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all relative ${
                    activeSection === 'portfolio'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Briefcase size={16} className="mx-auto mb-1" />
                  Portfolio
                  {portfolio.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {portfolio.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveSection('news')}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    activeSection === 'news'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Newspaper size={16} className="mx-auto mb-1" />
                  News
                </button>
              </div>
            </div>

            {/* Watchlist Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star size={20} className="text-yellow-500" />
                <h2 className="font-bold text-gray-900">My Watchlist</h2>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Stocks Tracked</p>
                  <p className="text-2xl font-bold text-green-600">{watchlistStocks.length}</p>
                </div>
                
                {watchlistStocks.length > 0 && (
                  <>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Avg ESG Score</p>
                      <p className="text-2xl font-bold text-blue-600">{avgESG}/100</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Avg Revenue Growth</p>
                      <p className="text-2xl font-bold text-purple-600">+{avgGrowth}%</p>
                    </div>
                  </>
                )}
              </div>

              {watchlistStocks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-600 mb-2">RECENT</h3>
                  <div className="space-y-2">
                    {watchlistStocks.slice(0, 3).map(stock => (
                      <div 
                        key={stock.id}
                        onClick={() => setSelectedStock(stock)}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm">{stock.symbol}</p>
                          <p className="text-xs text-gray-500">${stock.price.toFixed(2)}</p>
                        </div>
                        <div className={`text-xs font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-gray-700" />
                <h2 className="font-bold text-gray-900">Filters</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-2">SECTOR</label>
                  <div className="space-y-1">
                    {sectors.map(sector => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedSector === sector
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-2">
                    MIN ESG SCORE: {minESG}
                  </label>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    value={minESG}
                    onChange={(e) => setMinESG(Number(e.target.value))}
                    className="w-full accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>70</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-2">SORT BY</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="esgScore">ESG Score (High to Low)</option>
                    <option value="revenueGrowth">Revenue Growth</option>
                    <option value="changePercent">Price Change</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-9">
            {/* Discover Section */}
            {activeSection === 'discover' && (
              <>
                {/* Search and View Controls */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stocks by symbol or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'grid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <PieChart size={20} />
                  </button>
                  <button
                    onClick={() => setView('table')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'table' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <BarChart3 size={20} />
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  {filteredStocks.length} stocks
                </div>
              </div>
            </div>

            {/* Grid View */}
            {view === 'grid' && (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredStocks.map(stock => (
                  <div
                    key={stock.id}
                    onClick={() => setSelectedStock(stock)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors">
                            {stock.symbol}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
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

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">${stock.price.toFixed(2)}</span>
                        <div className={`flex items-center gap-1 text-sm font-medium ${
                          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ESG</p>
                        <p className="font-bold text-green-600 flex items-center gap-1">
                          <Leaf size={14} />
                          {stock.esgScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Growth</p>
                        <p className="font-bold text-blue-600">+{stock.revenueGrowth}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">P/E</p>
                        <p className="font-bold text-gray-700">{stock.peRatio || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {view === 'table' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sector</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Change</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">ESG</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Growth</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">P/E</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Watch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStocks.map(stock => (
                        <tr 
                          key={stock.id}
                          onClick={() => setSelectedStock(stock)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-gray-900">{stock.symbol}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  stock.sustainability.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {stock.sustainability}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{stock.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{stock.sector}</td>
                          <td className="px-4 py-4 text-right">
                            <span className="font-semibold text-gray-900">${stock.price.toFixed(2)}</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className={`inline-flex items-center gap-1 font-medium ${
                              stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.changePercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center gap-1 font-bold text-green-600">
                              <Leaf size={14} />
                              {stock.esgScore}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-semibold text-blue-600">+{stock.revenueGrowth}%</td>
                          <td className="px-4 py-4 text-right font-semibold text-gray-700">{stock.peRatio || 'N/A'}</td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWatchlist(stock.id);
                              }}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <Star 
                                size={18} 
                                className={watchlist.includes(stock.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
              </>
            )}

            {/* Portfolio Section */}
            {activeSection === 'portfolio' && (
              <>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg">
                  <h2 className="text-sm font-medium mb-2 opacity-90">Total Portfolio Value</h2>
                  <div className="text-5xl font-bold mb-3">${portfolioValue.toFixed(2)}</div>
                  <div className={`flex items-center gap-2 text-lg ${portfolioGainLoss >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                    {portfolioGainLoss >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                    <span className="font-semibold">
                      {portfolioGainLoss >= 0 ? '+' : ''}${portfolioGainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {portfolio.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Holdings Yet</h3>
                    <p className="text-gray-600">Start tracking your green investments</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {portfolio.map(holding => {
                      const stock = stocks.find(s => s.id === holding.stockId);
                      if (!stock) return null;
                      
                      const currentValue = stock.price * holding.shares;
                      const costBasis = holding.avgPrice * holding.shares;
                      const gainLoss = currentValue - costBasis;
                      const gainLossPercent = ((currentValue - costBasis) / costBasis) * 100;

                      return (
                        <div key={holding.stockId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-2xl text-gray-900">{stock.symbol}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  stock.sustainability.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {stock.sustainability}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{stock.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{holding.shares} shares @ ${holding.avgPrice.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => removeFromPortfolio(holding.stockId)}
                              className="text-red-500 text-sm px-3 py-1 hover:bg-red-50 rounded transition-colors"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Current Value</p>
                              <p className="font-bold text-lg text-gray-900">${currentValue.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Cost Basis</p>
                              <p className="font-bold text-lg text-gray-700">${costBasis.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Gain/Loss</p>
                              <p className={`font-bold text-lg ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className={`flex items-center gap-2 pt-3 border-t border-gray-100 font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainLoss >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                            <span>{gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}% Return</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* News Section */}
            {activeSection === 'news' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {news.map(article => {
                  const stock = stocks.find(s => s.id === article.stockId);
                  return (
                    <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                          article.sentiment === 'positive' ? 'bg-green-500' : 
                          article.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg text-green-600">{article.symbol}</span>
                            <span className="text-xs text-gray-500">{article.timeAgo}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">{article.headline}</h3>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-600 font-medium">{article.source}</span>
                            {stock && (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">${stock.price.toFixed(2)}</span>
                                <div className={`flex items-center gap-1 text-sm font-medium ${
                                  stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {stock.changePercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                  <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Stock Detail Modal */}
      {selectedStock && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStock(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">{selectedStock.symbol}</h2>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      selectedStock.sustainability.startsWith('A') 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {selectedStock.sustainability} Rating
                    </span>
                  </div>
                  <p className="text-green-100 text-lg">{selectedStock.name}</p>
                  <p className="text-green-200 text-sm mt-1">{selectedStock.sector}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(selectedStock.id);
                    }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <Star 
                      size={24} 
                      className={watchlist.includes(selectedStock.id) ? 'fill-yellow-300 text-yellow-300' : 'text-white'}
                    />
                  </button>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-5xl font-bold">${selectedStock.price.toFixed(2)}</span>
                <div className={`flex items-center gap-2 text-xl font-medium ${
                  selectedStock.changePercent >= 0 ? 'text-green-200' : 'text-red-200'
                }`}>
                  {selectedStock.changePercent >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  <span>{selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%</span>
                  <span className="text-sm">({selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)})</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-6">{selectedStock.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="text-green-600" size={20} />
                    <p className="text-xs text-gray-600 font-medium">ESG Score</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{selectedStock.esgScore}</p>
                  <p className="text-xs text-green-700 mt-1">out of 100</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-blue-600" size={20} />
                    <p className="text-xs text-gray-600 font-medium">Revenue Growth</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">+{selectedStock.revenueGrowth}%</p>
                  <p className="text-xs text-blue-700 mt-1">Year over Year</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="text-purple-600" size={20} />
                    <p className="text-xs text-gray-600 font-medium">P/E Ratio</p>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{selectedStock.peRatio || 'N/A'}</p>
                  <p className="text-xs text-purple-700 mt-1">Price to Earnings</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-orange-600" size={20} />
                    <p className="text-xs text-gray-600 font-medium">Market Cap</p>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">${selectedStock.marketCap}</p>
                  <p className="text-xs text-orange-700 mt-1">Total Value</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Volume</span>
                    <span className="font-semibold">{selectedStock.volume}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">52-Week High</span>
                    <span className="font-semibold">${selectedStock.yearHigh}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Sector</span>
                    <span className="font-semibold">{selectedStock.sector}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">52-Week Low</span>
                    <span className="font-semibold">${selectedStock.yearLow}</span>
                  </div>
                </div>
              </div>

              {/* Price Alerts for this stock */}
              {priceAlerts.filter(a => a.stockId === selectedStock.id).length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Active Alerts</h3>
                  {priceAlerts.filter(a => a.stockId === selectedStock.id).map(alert => (
                    <div key={alert.id} className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg mb-2">
                      <div className="flex items-center gap-2">
                        <Bell size={18} className="text-yellow-600" />
                        <span className="text-sm font-medium">
                          Alert when price goes {alert.type} ${alert.targetPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePriceAlert(alert.id);
                        }}
                        className="text-red-500 text-sm hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlertStock(selectedStock);
                    setShowAlertModal(true);
                  }}
                  className="py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Bell size={20} />
                  Set Price Alert
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPortfolioModal(true);
                  }}
                  className="py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase size={20} />
                  Add to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Alert Modal */}
      {showAlertModal && alertStock && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAlertModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Price Alert</h2>
              <p className="text-gray-600 mb-6">Get notified when {alertStock.symbol} reaches your target price</p>
              
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                      <input type="radio" name="alertType" value="above" defaultChecked className="text-green-600" />
                      <span className="text-sm font-medium">Price goes above</span>
                    </label>
                    <label className="flex items-center gap-2 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                      <input type="radio" name="alertType" value="below" className="text-green-600" />
                      <span className="text-sm font-medium">Price goes below</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAlertModal(false)}
                    className="py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Create Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add to Portfolio Modal */}
      {showPortfolioModal && selectedStock && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPortfolioModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add to Portfolio</h2>
              <p className="text-gray-600 mb-6">Track your holdings in {selectedStock.symbol}</p>
              
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPortfolioModal(false)}
                    className="py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add Holding
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
