let { CSSTransition, TransitionGroup } = ReactTransitionGroup

function QuoteBox(props) {
	return (
		<div id="quote-box">
			<CSSTransition
				classNames="qbox"
				appear={true}
				in={true}
				timeout={800}
				unmountOnExit>
					<div class="box"><h1 id="text">{props.quote}</h1>
					<h5 id="author">{"- " + props.author}</h5></div>
			</CSSTransition>
			<div id="buttons">
				<button id="new-quote" onClick={() => props.newQ()}
					type="button" class="btn btn-success">New quote</button>
				<a id="tweet-quote" href={"https://twitter.com/intent/tweet?text=" + encodeURI(props.quote)} target="_blank">
					<button type="button" class="btn btn-primary"><i class="fab fa-twitter"/> Tuit</button></a>
			</div>
		</div>
	);
}

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: [
				{quote:"el awa es azul", author:"awazulnapo"},
				{quote:"el awa es roja", author:"awarojanapo"},
				{quote:"el awa es amarilla", author:"awamarillanapo"},
				{quote:"el awa es verde", author:"awaverdenapo"}
			],
			currentI: 0,
			currentQ: "",
			currentA: "",
			firstLoad: true
		};
	}
	
	handleClick() {
		let i = this.state.currentI;
		while(i == this.state.currentI){
			i = Math.round(Math.random() * 3);
		}

		this.setState((state) => {
			return {
				quotes: state.quotes,
				currentI: i,
				currentQ: state.quotes[i].quote,
				currentA: state.quotes[i].author,
				firstLoad: false
			};
		});
	}
	
	render() {
		if(this.state.firstLoad) {
			this.handleClick();
		}

		return (
			<div>
				<QuoteBox quote={this.state.currentQ} author={this.state.currentA} newQ={() => this.handleClick()}/>
			</div>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));