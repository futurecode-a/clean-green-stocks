# Green Stocks Platform 🌱

A sustainable investing platform for discovering and tracking clean energy stocks with ESG ratings, growth indicators, and portfolio management.

## 🚀 Live Demo

Visit the live app: `https://YOUR-USERNAME.github.io/green-stocks/`

## ✨ Features

### Core Features
- **ESG Ratings**: Filter stocks by environmental, social, and governance scores (80-100 scale)
- **Sector Filtering**: Solar, Wind, EV, Hydrogen, Renewable Utilities, Clean Energy ETFs
- **Growth Indicators**: Revenue growth, P/E ratios, market cap, price changes
- **Real-time Prices**: Mock price updates with change indicators

### Advanced Features
- **Portfolio Tracking**: Track your holdings with cost basis and profit/loss calculations
- **Price Alerts**: Set notifications when stocks reach target prices
- **Watchlist**: Star your favorite stocks for quick access
- **News Integration**: Latest news articles linked to specific stocks
- **Persistent Storage**: All data saved locally (localStorage)

## 📱 Two Versions

### Mobile App (`mobile.html`)
- Optimized for phones and tablets
- Touch-friendly interface
- Compact card layouts
- 4 tabs: Discover, Watch, Portfolio, News
- Bottom modal interactions

### Web App (`web.html`)
- Full desktop experience
- Wide-screen layouts
- Grid and table views
- Sidebar navigation
- Advanced data visualization

## 🛠️ Tech Stack

- **React 18**: UI framework
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **localStorage**: Data persistence
- **GitHub Pages**: Hosting

## 📦 Project Structure

```
green-stocks/
├── index.html              # Landing page
├── mobile.html             # Mobile app wrapper
├── web.html                # Web app wrapper
├── green-stocks-app.jsx    # Mobile React component
├── green-stocks-web.jsx    # Web React component
└── README.md               # This file
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `green-stocks` (or any name you prefer)
3. Make it **Public**
4. Don't initialize with README (we have one)

### Step 2: Push Code to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Green Stocks Platform"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/green-stocks.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

### Step 4: Access Your Site

After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/green-stocks/
```

## 🔧 Local Development

To run locally, you need a local server (the apps won't work with `file://` protocol):

### Option 1: Python
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 2: Node.js
```bash
npx serve

# Then visit: http://localhost:3000
```

### Option 3: VS Code
Install the "Live Server" extension and click "Go Live"

## 🔌 API Integration

Currently uses mock data. To integrate real APIs:

### Stock Data APIs
- [Alpha Vantage](https://www.alphavantage.co/) - Free tier available
- [Finnhub](https://finnhub.io/) - Stock prices and financials
- [Yahoo Finance API](https://www.yahoofinanceapi.com/)

### ESG Data APIs
- [MSCI ESG](https://www.msci.com/esg-ratings) - Industry standard
- [Sustainalytics](https://www.sustainalytics.com/) - ESG risk ratings
- [Bloomberg ESG](https://www.bloomberg.com/professional/solution/esg-data/)

### News APIs
- [NewsAPI](https://newsapi.org/) - News aggregation
- [Alpha Vantage News](https://www.alphavantage.co/documentation/#news-sentiment)

### Integration Steps

1. Sign up for API keys
2. Replace the `fetchStockData()` function in both JSX files
3. Add your API endpoints and keys
4. Update the mock data structure to match API responses

Example:
```javascript
const fetchStockData = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=YOUR_API_KEY`
    );
    const data = await response.json();
    // Process and set stocks
    setStocks(processedData);
    setLastUpdate(new Date());
  } catch (error) {
    console.error('Error fetching stock data:', error);
  } finally {
    setIsLoading(false);
  }
};
```

## 📝 Customization

### Add More Stocks
Edit the `mockStocks` array in both JSX files:
```javascript
{
  id: 11,
  symbol: 'SPWR',
  name: 'SunPower Corporation',
  sector: 'Solar Energy',
  price: 15.75,
  // ... other properties
}
```

### Modify ESG Thresholds
Change the default minimum ESG score:
```javascript
const [minESG, setMinESG] = useState(80); // Change 80 to your preferred default
```

### Add New Sectors
Update the sectors array:
```javascript
const sectors = ['All', 'Solar Energy', 'Your New Sector', ...];
```

## ⚠️ Disclaimer

This is a demo application with mock data. It is **not financial advice** and should not be used for actual investment decisions. Always consult with a qualified financial advisor before making investment choices.

## 📄 License

MIT License - feel free to use and modify for your projects!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Support

For questions or issues, please open a GitHub issue.

---

**Built with ❤️ for sustainable investing**
