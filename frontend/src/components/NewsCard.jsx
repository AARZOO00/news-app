import React from 'react';

const NewsCard = ({ article }) => {
  // Fallback for cases where image or title might be missing
  const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200.png?text=No+Image';
  const title = article.title || 'No Title Available';
  const description = article.description || 'No description available.';
  const sourceName = article.source?.name || 'Unknown Source';
  const publishedAt = article.publishedAt ? new Date(article.publishedAt).toLocaleString() : 'Unknown Date';

  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-card-image" />
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
        <p className="news-card-meta">
          <span className="news-card-source">{sourceName}</span> - <span className="news-card-date">{publishedAt}</span>
        </p>
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Read Full Article
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
