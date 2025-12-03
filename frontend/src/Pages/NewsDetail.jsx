import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

const NewsDetail = () => {
  const { id } = useParams();
  const { articles } = useContext(NewsContext);
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="news-detail-container">
      <h1 className="news-detail-title">{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} className="news-detail-image" />
      <div className="news-detail-content">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
