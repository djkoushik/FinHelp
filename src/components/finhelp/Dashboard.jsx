import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import TrendingStocks from './TrendingStocks';
import IndianTrendingStocks from './IndianTrendingStocks';
import NewsFeed from './NewsFeed';
import { generateFinancialContent } from '../../lib/financeApi';
import { models } from '../../models';

const SECTORS = {
    BANKING: 'banking',
    TECHNOLOGY: 'technology',
    MANUFACTURING: 'manufacturing',
    FMCG: 'fmcg',
    PHARMA: 'pharmaceutical',
    REAL_ESTATE: 'real_estate',
    RETAIL: 'retail',
    UTILITIES: 'utilities',
    ECOMMERCE: 'ecommerce'
};

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState(models.defaultModel);
    const [selectedSector, setSelectedSector] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Auto-detect sector from company name/query
    const detectSector = (query) => {
        const queryLower = query.toLowerCase();
        
        // Simple keyword-based detection
        if (queryLower.includes('bank') || queryLower.includes('finance')) return SECTORS.BANKING;
        if (queryLower.includes('tech') || queryLower.includes('software')) return SECTORS.TECHNOLOGY;
        if (queryLower.includes('manufacturing') || queryLower.includes('industrial')) return SECTORS.MANUFACTURING;
        // Add more sector detection logic...
        
        return ''; // Unknown sector
    };

    const handleSearch = async (query, model, sector) => {
        setSearchQuery(query);
        setLoading(true);
        setError(null);

        try {
            // Auto-detect sector if not specified
            const detectedSector = sector || detectSector(query);
            setSelectedSector(detectedSector);

            // Get financial analysis with sector-specific metrics
            const analysisResult = await generateFinancialContent(
                query,
                model || selectedModel,
                detectedSector
            );

            setSearchResults({
                ...analysisResult,
                sector: detectedSector
            });
        } catch (err) {
            setError(err.message);
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Only show trending/news when no search is active
    const showDefaultContent = !searchResults && !loading;

    return (
        <div className="dashboard">
            <SearchBar 
                onSearch={handleSearch}
                models={Object.keys(models)}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                sectors={Object.values(SECTORS)}
                selectedSector={selectedSector}
                onSectorChange={setSelectedSector}
            />
            
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner">Analyzing financial data...</div>
                </div>
            )}
            
            {error && (
                <div className="error-container">
                    <div className="error-message">
                        <h3>Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            )}
            
            {searchResults && (
                <SearchResults 
                    results={searchResults}
                    loading={loading}
                    error={error}
                />
            )}
            
            {showDefaultContent && (
                <div className="default-content">
                    <div className="markets-overview">
                        <TrendingStocks />
                        <IndianTrendingStocks />
                    </div>
                    <NewsFeed />
                </div>
            )}
        </div>
    );
};

export default Dashboard;