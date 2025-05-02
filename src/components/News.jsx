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
    // Clear previous news and reset everything
    setNews({
      articles: [],
      totalResults: 0,
      page: 1
    });
    setHasMore(true);
    fetchNews(1, props.searchQuery);
  }, [props.searchQuery, props.category]);

  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = news.page + 1;
      fetchNews(nextPage, props.searchQuery);
    }
  };

  const fetchNews = async (pageNo, query) => {
    try {
      // Update title
      document.title = query
        ? `MediaMinds - Results for ${capitalize(query)}`
        : `MediaMinds - ${capitalize(props.category)}`;

      const url = query
        ? `https://newsapi.org/v2/top-headlines?q=${query}&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;

      if (pageNo === 1) props.setProgress(40);

      const response = await fetch(url);
      const data = await response.json();

      if (pageNo === 1) props.setProgress(80);

      setNews((prev) => ({
        articles: pageNo === 1 ? data.articles : [...prev.articles, ...data.articles],
        totalResults: data.totalResults,
        page: pageNo
      }));

      if (pageNo === 1) props.setProgress(100);

      if (data.articles.length === 0 || (news.articles.length + data.articles.length) >= data.totalResults) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  return (
    <div className="py-4 min-vh-100" style={{ backgroundColor: "#76a176" }}>
      <h1 className="text-center px-3 fw-semibold" style={{ margin: "80px 0px 35px 0px", fontFamily: "Poppins, san-serif" }}>
        {props.searchQuery
          ? `Search Results for ${capitalize(props.searchQuery)}`
          : `MediaMinds Top ${capitalize(props.category)} Headlines`}
      </h1>

      {news.articles.length === 0 && !hasMore && (
        <div className="text-center">
          <img className="rounded-1 my-2 shadow-lg" style={{ width: "20rem" }} src="/error.jpeg" alt="Not Found results" />
          <p className="text-center fs-4 fw-medium mt-1">No results found for <span className="text-decoration-underline">{props.searchQuery}</span></p>
        </div>
      )}

      <InfiniteScroll dataLength={news.articles.length} next={fetchMoreData} hasMore={hasMore} loader={<Spinner />}>
        <div className="container">
          <div className="row row-gap-4">
            {news.articles.map((article, index) => (
              <div className="col-md-4 d-flex justify-content-center text-center" key={index}>
                <NewsItem title={article.title} desc={article.description} imageUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
  setProgress: PropTypes.func,
  apiKey: PropTypes.string
};

export default News;
