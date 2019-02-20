import React, { Component, Fragment } from 'react'

export default class QuoteMachine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      url: 'https://jsonplaceholder.typicode.com/comments/',
      href: ''  

    }
  }



  async getQuote() {

    try {
      const data = await fetch(this.state.url);
      // console.log(data)
      const jsonData = await data.json();
      // console.log(jsonData);
      const number = Math.floor((Math.random() * jsonData.length));

      const author = jsonData[number].name;
      const quote = jsonData[number].body;
      // console.log(jsonData[number].name);


      this.setState(() => {
        return {
          quote,
          author,
          href: `https://twitter.com/intent/tweet?text=${quote} - ${author}` 

        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getQuote();
  }




  render() {
    // console.log(this.state)
    const { quote, author, href } = this.state;

    return (
      <Fragment>
        <div className=" d-flex align-items-center flex-column h-100">
          <div className="container text-center" id="quote-box">
            <h1 className="text-primary my-3">Quote Machine</h1>
            <div className="bg-light my-3 p-3 shadow-sm rounded " >
              <p id="text">{this.state.quote !== null && quote}</p>
              <p id="author">{this.state.quote !== null && author}</p>
            </div>
            <button onClick={this.getQuote.bind(this)} className="btn btn-primary" id="new-quote">New Quote</button>
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={this.tweetQuote.bind(this)} className="btn btn-secondary mx-2" id="tweet-quote">Tweet Quote</a>

          </div>
        </div>
      </Fragment>
    )
  }
}

