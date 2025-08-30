import React, { useEffect, useState } from 'react';

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://api.example.com/latest-financial-news'); // Replace with actual API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data.articles); // Adjust based on actual API response structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading news...</div>;
    }

    if (error) {
        return <div>Error fetching news: {error}</div>;
    }

    return (
        <div className="news-feed">
            <h2>Latest Financial News</h2>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsFeed;