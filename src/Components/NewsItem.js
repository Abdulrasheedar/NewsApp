import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex:'1'}}>
                {source}
              </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://dims.apnews.com/dims4/default/ea75a87/2147483647/strip/true/crop/3120x1755+0+1165/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fd5%2F22%2F620dd07994204d570064b7315bfa%2F13d344064f254b5b9a734c79d758492b"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="ca rd-body">
            <h5 className="card-title">
              {title}...
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
