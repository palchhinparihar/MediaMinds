import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { capitalize } from '../utils';

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

  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = news.page + 1;
      setNews((prev) => ({ ...prev, page: nextPage }));
      fetchNews(nextPage);
    }
  };

  const fetchNews = async (pageNo) => {
    try {
      document.title = `MediaMinds - ${capitalize(props.category)}`;

      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`);
      if (pageNo === 1) props.setProgress(40);

      const data = await response.json();
      if (pageNo === 1) props.setProgress(80);

      setNews((prev) => ({
        articles: pageNo === 1 ? data.articles : [...prev.articles, ...data.articles],
        totalResults: data.totalResults,
        page: pageNo
      }));

      if (pageNo === 1) props.setProgress(100);

      if (data.articles.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  return (
    <div className="my-4">
      <h1 className="text-center px-3" style={{ margin: "80px 0px 35px 0px" }}>{`MediaMinds Top ${capitalize(props.category)} Headlines`}</h1>

      <InfiniteScroll dataLength={news.articles.length} next={fetchMoreData} hasMore={hasMore} loader={<Spinner />} >
        <div className="container">
          <div className="row row-gap-4">
            {news.articles.map((article, index) => {
              return (
                <div className="col-md-4 d-flex justify-content-center text-center" key={index}>
                  <NewsItem title={article.title} desc={article.description} imageUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                </div>
              )
            })}
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
