import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const News = () => {
  const [news, setNews] = useState({
    articles: [],
    loading: false,
    page: 1
  });

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch(' https://newsapi.org/v2/top-headlines?country=us&apiKey=243a0615c67c467f970712609f4a068b');
          const data = await response.json();
          
          setNews({
            articles: data.articles,
            loading: false,
            page: 1
          });
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">MediaMinds Top Headlines</h1>

      <div className="row row-gap-4">
        {news.articles.map((article, index) => {
          return (
          <div className="col-md-4 d-flex justify-content-center text-center" key={index}>
            <NewsItem title={article.title} desc={article.description} imageUrl={article.urlToImage} newsUrl={article.url} />
          </div>
        )})}
      </div>
    </div>
  )
}

export default News;
