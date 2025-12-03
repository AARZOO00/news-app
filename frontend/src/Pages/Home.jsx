import React, { useContext, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { NewsContext } from '../context/NewsContext';

const categories = ['general', 'world', 'technology', 'business', 'sports', 'health', 'science', 'entertainment'];

const Home = () => {
  const { articles, loading, error, category, setCategory, searchQuery, setSearchQuery } = useContext(NewsContext);
  const [currentSearchInput, setCurrentSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(currentSearchInput);
  };

  if (loading) {
    return <div className="loading-state">Loading news...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Top Headlines</h1>

      {/* Category Filters */}
      <div className="categories-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn category-btn ${category === cat ? 'active' : ''}`}
            onClick={() => {
                setCategory(cat);
                setSearchQuery(''); // Clear search when category changes
                setCurrentSearchInput('');
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for news..."
          value={currentSearchInput}
          onChange={(e) => setCurrentSearchInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {articles.length === 0 ? (
        <div className="no-news-found">No news articles found for your selection.</div>
      ) : (
        <div className="news-grid">
          {articles.map((article) => (
            // NewsAPI articles might not always have an ID, using a fallback for key
            <NewsCard key={article.url || article.title} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
