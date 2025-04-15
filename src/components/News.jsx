import React, { useEffect, useState } from 'react';
import { capitalize } from '../utils';
import InfiniteScroll from 'react-infinite-scroll-component';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [news, setNews] = useState({
    articles: [],
    totalResults: 0,
    page: 1
  });

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNews(news.page);
  }, []);

  const fetchNews = async (pageNo) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=243a0615c67c467f970712609f4a068b&page=${pageNo}&pageSize=${props.pageSize}`);
      const data = await response.json();
  
      setNews((prev) => ({
        articles: pageNo === 1 ? data.articles  : [...prev.articles, ...data.articles],
        totalResults: data.totalResults,
        page: pageNo
      }));

      document.title = `MediaMinds - ${capitalize(props.category)}`;

      if (data.articles.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };  
  
  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = news.page + 1;
      setNews((prev) => ({ ...prev, page: nextPage }));
      fetchNews(nextPage);
    }
  };
  
  return (
    <div className="my-4">
      <h1 className="text-center mb-5">{`MediaMinds Top ${capitalize(props.category)} Headlines`}</h1>

      <InfiniteScroll dataLength={news.articles.length} next={fetchMoreData} hasMore={hasMore} loader={<Spinner/>} > 
        <div className="container">
          <div className="row row-gap-4">
            {news.articles.map((article, index) => {
              return (
              <div className="col-md-4 d-flex justify-content-center text-center" key={index}>
                <NewsItem title={article.title} desc={article.description} imageUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
              </div>
            )})}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
