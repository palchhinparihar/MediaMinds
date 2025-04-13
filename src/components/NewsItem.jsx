import React from 'react'

const NewsItem = (props) => {
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={props.imageUrl} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.desc}</p>
        <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-success">Read more</a>
      </div>
    </div>
  )
}

export default NewsItem;
