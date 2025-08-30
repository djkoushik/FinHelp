import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MindMap from './MindMap';
import './SearchResults.css';

// View mode toggle component
const ViewToggle = ({ activeView, onViewChange }) => (
    <div className="view-toggle">
        <button 
            className={`toggle-btn ${activeView === 'cards' ? 'active' : ''}`}
            onClick={() => onViewChange('cards')}
        >
            Card View
        </button>
        <button 
            className={`toggle-btn ${activeView === 'mindmap' ? 'active' : ''}`}
            onClick={() => onViewChange('mindmap')}
        >
            Mind Map View
        </button>
    </div>
);

ViewToggle.propTypes = {
    activeView: PropTypes.oneOf(['cards', 'mindmap']).isRequired,
    onViewChange: PropTypes.func.isRequired
};

// Metric Card Component
const MetricCard = ({ title, value, benchmark, status }) => (
    <div className={`metric-card ${status || ''}`}>
        <h4>{title}</h4>
        <div className="metric-value">{value}</div>
        {benchmark && <div className="benchmark">Benchmark: {benchmark}</div>}
    </div>
);

MetricCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    benchmark: PropTypes.string,
    status: PropTypes.oneOf(['good', 'warning', 'alert', ''])
};

// Sector Analysis Component
const SectorAnalysis = ({ metrics, sector }) => {
    if (!metrics || !sector) return null;

    return (
        <div className="sector-analysis">
            <h3>{sector} Sector Analysis</h3>
            <div className="metrics-grid">
                {Object.entries(metrics).map(([key, value]) => (
                    <MetricCard
                        key={key}
                        title={key}
                        value={value.value}
                        benchmark={value.benchmark}
                        status={value.status}
                    />
                ))}
            </div>
        </div>
    );
};

SectorAnalysis.propTypes = {
    metrics: PropTypes.object,
    sector: PropTypes.string
};

// Main SearchResults Component
const SearchResults = ({ results, loading, error }) => {
    const [viewMode, setViewMode] = useState('cards');

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!results) {
        return null;
    }

    const { rawResponse, analysis, metrics, sector, sources } = results;

    return (
        <div className="search-results">
            <ViewToggle activeView={viewMode} onViewChange={setViewMode} />
            
            <div className="summary-section">
                <h2>Financial Analysis</h2>
                <div className="ai-response">{rawResponse}</div>
            </div>

            {viewMode === 'mindmap' ? (
                <MindMap data={{ ...results, companyName: results.searchQuery }} />
            ) : (
                <>
                    {analysis && (
                        <div className="analysis-section">
                            <div className="health-score">
                                <h3>Overall Health Score</h3>
                                <div className={`score ${analysis.overallHealth}`}>
                                    {analysis.overallHealth.toUpperCase()}
                                </div>
                            </div>

                            <SectorAnalysis metrics={metrics} sector={sector} />

                            {analysis.recommendations?.length > 0 && (
                                <div className="recommendations">
                                    <h3>Key Recommendations</h3>
                                    <ul>
                                        {analysis.recommendations.map((rec, index) => (
                                            <li key={index}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {metrics && !analysis && (
                        <div className="metrics-section">
                            <h3>Key Metrics</h3>
                            <div className="metrics-grid">
                                {Object.entries(metrics).map(([key, value]) => (
                                    <MetricCard
                                        key={key}
                                        title={key}
                                        value={value}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {sources && sources.length > 0 && (
                        <div className="sources-section">
                            <h3>Sources:</h3>
                            <ul>
                                {sources.map((source, index) => (
                                    <li key={index}>
                                        <a 
                                            href={source.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {source.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

SearchResults.propTypes = {
    results: PropTypes.shape({
        rawResponse: PropTypes.string,
        analysis: PropTypes.shape({
            overallHealth: PropTypes.string,
            recommendations: PropTypes.arrayOf(PropTypes.string)
        }),
        metrics: PropTypes.object,
        sector: PropTypes.string,
        sources: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })),
        searchQuery: PropTypes.string
    }),
    loading: PropTypes.bool,
    error: PropTypes.string
};

export default SearchResults;
