import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(){
        super();
        console.log("hey I am constructor from news component")
        this.state ={
            page:1,
            articles: [],
            loading: false,
            totalResults: 0
        }
    }
    //componentDidMount is a lifecycle method that is excecuted after render method
    async componentDidMount(){ 
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=93e50345f8ef4843a72b1e99082b24fe&page=$${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
     handlePreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=93e50345f8ef4843a72b1e99082b24fe&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
        this.setState({
            page:this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }
    handleNextClick = async ()=>{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=93e50345f8ef4843a72b1e99082b24fe&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page:this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            })
    }
  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">News24x7 - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePreviousClick} className="btn btn-dark"> &larr; Previous</button>
            <button disabled ={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
