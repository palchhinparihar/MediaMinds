import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const News = () => {
  const [news, setNews] = useState({
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0
  });

  useEffect(() => {
    fetchNews(news.page);
  }, []);

  const handlePreviousClick = () => {
    fetchNews(news.page - 1);
  }

  const handleNextClick = () => {
    if (news.page + 1 <= Math.ceil(news.totalResults / 10)) {
      fetchNews(news.page + 1);
    }
  }

  const fetchNews = async (page) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=243a0615c67c467f970712609f4a068b&page=${page}&pageSize=10`);
      const data = await response.json();
      
      setNews({
        articles: data.articles,
        loading: false,
        page: page,
        totalResults: data.totalResults
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

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

      <div className="container d-flex justify-content-between px-5 my-3">
        <button disabled={news.page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </div>
  )
}

export default News;
