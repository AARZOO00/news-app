import React, { createContext, useState, useEffect, useCallback } from 'react';

// IMPORTANT: Replace 'YOUR_NEWSAPI_KEY' with your actual NewsAPI key.
// For local development, consider adding VITE_NEWSAPI_KEY="your_key_here" to a .env file
// in your project root, and then access it via import.meta.env.VITE_NEWSAPI_KEY.
const API_KEY = import.meta.env.VITE_NEWSAPI_KEY || 'YOUR_NEWSAPI_KEY';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general'); // Default category
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    let url = `${BASE_URL}?apiKey=${API_KEY}&language=en&from=${dateString}&to=${dateString}`;

    if (category && category !== 'all') { // NewsAPI uses 'category' parameter
      url += `&category=${category}`;
    } else {
      url += `&country=us`; // Default country for 'general' or 'all' category to get world news
    }

    if (searchQuery) {
      url += `&q=${encodeURIComponent(searchQuery)}`; // NewsAPI uses 'q' for search
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'ok') {
        // NewsAPI returns 'articles' array
        setArticles(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]); // Dependencies for useCallback

  // Initial fetch and fetch when category or search query changes
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Automatic updates every hour
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchNews]);

  return (
    <NewsContext.Provider value={{ articles, loading, error, category, setCategory, searchQuery, setSearchQuery }}>
      {children}
    </NewsContext.Provider>
  );
};