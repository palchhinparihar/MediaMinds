import React from 'react'

const NewsItem = (props) => {
  return (
    <div className="card bg-light" style={{width: "21rem"}}>
      <img src={props.imageUrl} className="card-img-top" style={{height: "180px"}} alt={props.title} />

      <div className="card-body">
        <h5 className="card-title">{props.title.split(" - ")[0]}</h5>
        <span className="badge text-dark bg-danger-subtle my-1 text-wrap">{props.source}</span>
        <p className="card-text">{props.desc}</p>
        <p className="card-text"><small className="text-body-secondary">By <i>{props.author ? props.author : "Unknown"}</i> on {new Date(props.date).toGMTString()}</small></p>
        <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-success">Read more</a>
      </div>
    </div>
  )
}

export default NewsItem;
