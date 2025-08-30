import React, { useState } from 'react';

const SearchBar = ({ onSearch, models }) => {
    const [query, setQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState(models[0]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query, selectedModel);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter company name or stock ticker"
                required
            />
            <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
            >
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;