$(document).ready(function(){
    let inputs = [];
    let totalString;
    
    const operators1 = ["+", "-", "/", "*"];
    
    function getValue(input){
      if(inputs.length > 0 && inputs[inputs.length-1].includes(".") && input === "."){
        console.log("Duplicate '.' ");
      } else if(inputs.length === 1 && inputs[0] === "0" && input === "0"){
        console.log("Duplicate '0' at beggining");
      } else if(inputs.length === 0 && operators1.includes(input)) {
        console.log("Solo operator at beggining");
      } else if(operators1.includes(inputs[inputs.length-1]) && operators1.includes(input) && input !== "-") {
        //If last is operator and new one is operator
        console.log("Double operator");
        inputs.pop();
        while(operators1.includes(inputs[inputs.length-1])) {
          inputs.pop();
        }
        inputs.push(input);
      } else if(inputs[inputs.length-1] === "-" && input === "-") {
        console.log("Double minus");
      } else if(inputs.length > 0 && !operators1.includes(inputs[inputs.length-1]) && !operators1.includes(input)) {
        //If last isn't operator and new one isn't operator
        inputs[inputs.length-1] = inputs[inputs.length-1] + input;
      } else {
        inputs.push(input);
      }
   
      //console.log(inputs);
      update();
    }
    
    function update(){
      totalString = inputs.join("");
      $("#display").html(totalString);
    }
    
    function getTotal(){
      totalString = inputs.join("");
      $("#display").html(Function('"use strict";return (' + totalString + ')')());
      //$("#display").html(eval(totalString));
      //eval changed to more secure version
      //console.log(Function('"use strict";return (' + totalString + ')')());
      inputs = [String(Function('"use strict";return (' + totalString + ')')())];
    }
    
    $("a").on("click", function(){
      if(this.id === "clear"){
        inputs = [];
        $("#display").html("0");
      } else if(this.id === "equals"){
        getTotal();
      } else {
        getValue(this.text);
      }
    });
  });