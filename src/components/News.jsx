import React from 'react';
import NewsItem from './NewsItem';

const News = () => {
  return (
    <div className="container my-4">
      <div className="row row-gap-5">
        <div className="col-md-4">
          <NewsItem title={"hello"} desc={"hello"} imageUrl={"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} newsUrl={"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} />
        </div>
      </div>
    </div>
  )
}

export default News;
