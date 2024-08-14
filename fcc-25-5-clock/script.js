class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        breakLen: 5,
        sessionLen: 25,
        currentTime: [25,0],
        inBreak: false,
        timerInterval: false
      };
      
      this.modifyValue = this.modifyValue.bind(this);
      this.startStop = this.startStop.bind(this);
      this.resetTime = this.resetTime.bind(this);
    }
  
    modifyValue(counter, value) {
      if(counter == "b" && this.state.breakLen == 1 && value < 0){
        return;
      } else if (counter == "s" && this.state.sessionLen == 1 && value < 0) {
        return;
      } else if(counter == "b" && this.state.breakLen == 60 && value > 0){
        return;
      } else if (counter == "s" && this.state.sessionLen == 60 && value > 0) {
        return;
      }
  
      if(counter == "b") {
        this.setState((state) => {
          return {breakLen: state.breakLen + value,
                  sessionLen: state.sessionLen,
                  currentTime: state.currentTime,
                 inBreak: state.inBreak,
                 timerInterval: state.timerInterval} });
        console.log("b " + value);
      } else if(counter == "s") {
        this.setState((state) => {
          return {breakLen: state.breakLen,
                  sessionLen: state.sessionLen + value,
                  currentTime: [state.currentTime[0] + value, state.currentTime[1] ],
                  inBreak: state.inBreak,
                 timerInterval: state.timerInterval} });
        console.log("s " + value);
      }
    }
    
    startStop() {
      if(!this.state.timerInterval) {
        this.setState((state) => {
          return {breakLen: state.breakLen,
                 sessionLen: state.sessionLen,
                 currentTime: state.currentTime,
                 inBreak: state.inBreak,
                 timerInterval: setInterval(() => {
                   let currentT = this.state.currentTime;
                   let inB = this.state.inBreak;
                   const audio = document.getElementById("beep");
                   
                   currentT[1]--;
                   if(currentT[1] < 0 && currentT[0] >= 0) {
                     currentT[0]--;
                     currentT[1] = 59;
                   }
                   
                   if(currentT[0] < 0) {
                     if(inB) {
                       currentT = [this.state.sessionLen,0];
                       inB = false;
                     } else {
                       currentT = [this.state.breakLen,0]
                       inB = true;
                     }
                     audio.play();
                   }
                   
                   this.setState((state) => {
                    return {breakLen: state.breakLen,
                            sessionLen: state.sessionLen,
                            currentTime: currentT,
                            inBreak: inB,
                           timerInterval: state.timerInterval} });
                  }, 1000)} });
      } else {
        clearInterval(this.state.timerInterval);
        this.setState((state) => {
          return {breakLen: state.breakLen,
                  sessionLen: state.sessionLen,
                  currentTime: state.currentTime,
                  inBreak: state.inBreak,
                 timerInterval: false} });
      }
    }
    
    resetTime() {
      if(this.state.timerInterval) {
        clearInterval(this.state.timerInterval);
      }
      
      const audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
      
      this.setState((state) => {
          return {breakLen: 5,
                  sessionLen: 25,
                  currentTime: [25,0],
                  inBreak: false,
                  timerInterval: false
        } });
    }
   
    render() {
      return (<div id="clock">
        <h1 id="name">25+5 Clock</h1>
        <div id="buttons">
          <div id="breaks">
            <h3 id="break-label" class="labels">Break Length</h3>
            <div id="break-buttons">
              <button id="break-decrement" onClick={() => this.modifyValue("b",-1)}>-</button>
              <p id="break-length" class="lengths">{this.state.breakLen}</p>
              <button id="break-increment" onClick={() => this.modifyValue("b",1)}>+</button>
            </div>
          </div>
          <div id="sessions">
            <h3 id="session-label" class="labels">Session Length</h3>
            <div id="session-buttons">
              <button id="session-decrement" onClick={() => this.modifyValue("s",-1)}>-</button>
              <p id="session-length" class="lengths">{this.state.sessionLen}</p>
              <button id="session-increment" onClick={() => this.modifyValue("s",1)}>+</button>
            </div>
          </div>
        </div>
        <div id="clock-box">
          <h2 id="timer-label">{(this.state.inBreak) ? "Break" : "Session"}</h2>
          <h1 id="time-left">{(this.state.currentTime[0] >= 10 ? this.state.currentTime[0] : "0" + this.state.currentTime[0]) + ':' + (this.state.currentTime[1] >= 10 ? this.state.currentTime[1] : "0" + this.state.currentTime[1])}</h1>
        </div>
        <div id="controls">
          <button id="start_stop" onClick={this.startStop}>Play</button>
          <button id="reset" onClick={this.resetTime}>Reset</button>
          <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/wav" />
        </div>
      </div>);
    }
  }
  
  ReactDOM.render(<Clock />, document.getElementById("root"));