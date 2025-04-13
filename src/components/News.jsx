import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {
  const [news, setNews] = useState({
    articles: [],
    totalResults: 0,
    page: 1,
    loading: false
  });

  useEffect(() => {
    fetchNews(news.page);
  }, []);

  const handlePreviousClick = () => {
    fetchNews(news.page - 1);
  }

  const handleNextClick = () => {
    if (news.page + 1 <= Math.ceil(news.totalResults / props.pageSize)) {
      fetchNews(news.page + 1);
    }
  }

  const fetchNews = async (pageNo) => {
    try {
      setNews({...news, loading: true});

      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=243a0615c67c467f970712609f4a068b&page=${pageNo}&pageSize=${props.pageSize}`);
      const data = await response.json();
      
      setNews({
        articles: data.articles,
        totalResults: data.totalResults,
        page: pageNo,
        loading: false
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">MediaMinds Top Headlines</h1>
      {news.loading && <Spinner className="my-4" />}

      <div className="row row-gap-4">
        {!news.loading && news.articles.map((article, index) => {
          return (
          <div className="col-md-4 d-flex justify-content-center text-center" key={index}>
            <NewsItem title={article.title} desc={article.description} imageUrl={article.urlToImage} newsUrl={article.url} />
          </div>
        )})}
      </div>

      <div className="container d-flex justify-content-between px-5 my-3">
        <button disabled={news.page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
        <button disabled={(news.page + 1 > Math.ceil(news.totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </div>
  )
}

export default News;
