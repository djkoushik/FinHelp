import React, { useEffect, useState } from 'react';

const TrendingStocks = () => {
    const [trendingStocks, setTrendingStocks] = useState([]);

    useEffect(() => {
        const fetchTrendingStocks = async () => {
            // Placeholder for API call to fetch trending stocks
            const response = await fetch('API_ENDPOINT_FOR_TRENDING_STOCKS');
            const data = await response.json();
            setTrendingStocks(data.stocks);
        };

        fetchTrendingStocks();
    }, []);

    return (
        <div className="trending-stocks">
            <h2>Trending Stocks in the US</h2>
            <ul>
                {trendingStocks.map((stock) => (
                    <li key={stock.ticker}>
                        {stock.name} ({stock.ticker}): ${stock.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingStocks;