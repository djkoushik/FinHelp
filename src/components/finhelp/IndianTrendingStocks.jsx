import React from 'react';

const IndianTrendingStocks = () => {
    // Sample data for trending stocks in India
    const trendingStocks = [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: '₹2,500.00' },
        { symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹3,200.00' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: '₹1,600.00' },
        { symbol: 'INFY', name: 'Infosys Ltd.', price: '₹1,500.00' },
        { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: '₹2,200.00' },
    ];

    return (
        <div className="trending-stocks">
            <h2>Trending Stocks in India</h2>
            <ul>
                {trendingStocks.map(stock => (
                    <li key={stock.symbol}>
                        <span>{stock.name} ({stock.symbol})</span>: <strong>{stock.price}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndianTrendingStocks;