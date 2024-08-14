class Root extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayText: "Press the keys on your keyboard!"
      };
      
      this.playNote = this.playNote.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    playNote(note) {
      const audio = note.target.childNodes[1];
      audio.play();
      this.setState({
        displayText: note.target.childNodes[1].id + " pressed!"
      });
    }
    
    handleKeyPress(event) {
      const noteKey = event.key.toUpperCase();
      
      switch(noteKey) {
        case "Q":
        case "W":
        case "E":
        case "A":
        case "S":
        case "D":
        case "Z":
        case "X":
        case "C":
          const audio = document.getElementById(noteKey);
          audio.play();
          this.setState({
            displayText: noteKey + " pressed!"
          });
        default:
          break;
      }
    }
    
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    render() {
      return (<div id="drum-machine">
          <div id="button-grid">
            <button class="drum-pad" id="buttonQ" onClick={this.playNote}>Q<audio class="clip" id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" /></button>
            <button class="drum-pad" id="buttonW" onClick={this.playNote}>W<audio class="clip" id="W" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" /></button>
            <button class="drum-pad" id="buttonE" onClick={this.playNote}>E<audio class="clip" id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" /></button>
            <button class="drum-pad" id="buttonA" onClick={this.playNote}>A<audio class="clip" id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" /></button>
            <button class="drum-pad" id="buttonS" onClick={this.playNote}>S<audio class="clip" id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" /></button>
            <button class="drum-pad" id="buttonD" onClick={this.playNote}>D<audio class="clip" id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" /></button>
            <button class="drum-pad" id="buttonZ" onClick={this.playNote}>Z<audio class="clip" id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" /></button>
            <button class="drum-pad" id="buttonX" onClick={this.playNote}>X<audio class="clip" id="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" /></button>
            <button class="drum-pad" id="buttonC" onClick={this.playNote}>C<audio class="clip" id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" /></button>
            </div>
        <div id="display">{this.state.displayText}</div>
      </div>);
    }
  }
  
  ReactDOM.render(<Root />, document.getElementById("root"));
  