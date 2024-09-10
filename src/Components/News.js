import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props) =>{
  
  const[articles,setArticles] = useState([]);
  const[loading,setLoading] = useState(true);
  const[page,setPage] = useState(1);
  const[totalResults,setTotalResults] = useState(0);
  const capFL = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    // articles: parsedData.articles ? parsedData.articles : [],
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capFL(props.category)} - NewsApp`;
    updateNews();
    // eslint-disable-next-line
  },[]);

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   await updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   await updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    //articles: articles.concat(parsedData.articles) ? articles.concat(parsedData.articles) : [],
  };
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop: "90px" }}>
          NewsApp - Top {capFL(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={loading && <Spinner />}
        >
          <div className="container">
          <div className="row">
            {articles.map((element,index) => {
              return (
                // <div className="col-md-3" key={element.url}>
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={
                      element.title !== null
                        ? element.title.slice(0, 45)
                        : element.title
                    }
                    description={
                      element.description !== null
                        ? element.description.slice(0, 88)
                        : element.description
                    }
                    imageUrl={
                      element.urlToImage !== null
                        ? element.urlToImage
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* Code for previous and Next buttons */}
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
