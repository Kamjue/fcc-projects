const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let gameData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawTreeMap = () => {
  let hierarchy = d3.hierarchy(gameData, (node) => {
    return node["children"];
  }).sum((node) => {
    return node["value"];
  }).sort((node1, node2) => {
    return node2["value"] - node1["value"];
  });
  
  let createTreeMap = d3.treemap()
                        .size([1000,600]);
  
  createTreeMap(hierarchy);
  
  let block = canvas.selectAll("g")
                    .data(hierarchy.leaves())
                    .enter()
                    .append("g")
                    .attr("transform", (game) => {
                      return `translate(${game["x0"]},${game["y0"]})`;
                    });
  
  block.append("rect")
        .attr("class", "tile")
        .attr("fill", (game) => {
    
          switch(game["data"]["category"]) {
            case "Wii":
              return "orange";
              break;
            case "NES":
              return "lightgreen";
              break;
            case "GB":
              return "coral";
              break;
            case "DS":
              return "lightblue";
              break;
            case "X360":
              return "pink";
              break;
            case "PS3":
              return "khaki";
              break;
            case "PS2":
              return "tan";
              break;
            case "SNES":
              return "wheat";
              break;
            case "GBA":
              return "red";
              break;
            case "PS4":
              return "lightyellow";
              break;
            case "3DS":
              return "orange";
              break;
            case "N64":
              return "chocolate";
              break;
            case "PS":
              return "gray";
              break;
            case "XB":
              return "green";
              break;
            case "PC":
              return "yellow";
              break;
            case "PSP":
              return "blue";
              break;
            case "XOne":
              return "brown";
              break;
            case "2600":
              return "lightblue";
              break;
          }
        })
        .attr("data-name", (game) => {
          return game["data"]["name"];
        })
        .attr("data-category", (game) => {
          return game["data"]["category"];
        })
        .attr("data-value", (game) => {
          return game["data"]["value"];
        })
        .attr("width", (game) => {
          return game["x1"] - game["x0"];
        })
        .attr("height", (game) => {
          return game["y1"] - game["y0"];
        })
        .on("mouseover", (event, game) => {
          tooltip.transition()
                  .style("visibility", "visible");
    
          tooltip.html("$" + game["data"]["value"] + "<hr />" + game["data"]["name"]);
    
          tooltip.attr("data-value", game["data"]["value"]);
        })
        .on("mouseout", (game) => {
          tooltip.transition()
                  .style("visibility", "hidden");
        });
  
  block.append("text")
        .text((game) => {
          return game["data"]["name"];
        })
        .attr("x", 5)
        .attr("y", 20)
        .attr("font-size", "smaller");
};

d3.json(url).then(
  (data, error) => {
    if (error) {
      console.log(error);
    } else {
      gameData = data;
      //console.log(gameData);
      
      drawTreeMap();
    }
  }
);