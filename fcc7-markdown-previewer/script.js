class Root extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: ""
      };
      
      this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
      this.setState({
        text: `# Header1
  ## Header2
  [Google](http://google.com)
  ~~~
  awanapo
  ~~~
  \`code\`
  - element1
  - element2
  > yes
  ![GoogleImg](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
  
  **bold**`
      });
    }
  
    handleChange(event) {
      this.setState( {
        text: event.target.value
      } );
    }
   
    toMarkdown() {
      console.log(marked(this.state.text));
      return({__html: marked(this.state.text, {breaks: true})});
    }
    
    render() {
      return (
        <div id="container">
          <textarea id="editor" onChange={this.handleChange} value={this.state.text} />
          <div id="preview" dangerouslySetInnerHTML={this.toMarkdown()} />
        </div>
      );
    }
  }
  
  ReactDOM.render(<Root />, document.getElementById("root"));