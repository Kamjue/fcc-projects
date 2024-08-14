//import * as d3 from "https://cdn.skypack.dev/d3@7.6.1";

const countyUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawMap = () => {
	canvas.selectAll("path")
			.data(countyData)
			.enter()
			.append("path")
			.attr("d", d3.geoPath())
			.attr("class", "county")
			.attr("fill", (countyItem) => {
				let county = educationData.find((item) => {
					return item["fips"] === countyItem["id"];
				})
				if(county["bachelorsOrHigher"] <= 15) {
					return "tomato";
				} else if (county["bachelorsOrHigher"] <= 30) {
					return "orange";
				} else if (county["bachelorsOrHigher"] <= 45) {
					return "lightgreen";
				} else {
					return "limegreen";
				}
			})
			.attr("data-fips", (countyItem) => {
				return countyItem["id"];
			})
			.attr("data-education", (countyItem) => {
				let county = educationData.find((item) => {
					return item["fips"] === countyItem["id"];
				})
				return county["bachelorsOrHigher"];
			})
			.on("mouseover", (event, countyItem) => {
				tooltip.transition()
						.style("visibility", "visible");
		
				let county = educationData.find((item) => {
					return item["fips"] === countyItem["id"];
				});
		
				tooltip.text(`${county["fips"]} - ${county["area_name"]}, ${county["state"]} : ${county["bachelorsOrHigher"]}%`);
		
				tooltip.attr("data-education", county["bachelorsOrHigher"]);
			})
			.on("mouseout", (countyItem) => {
				tooltip.transition()
						.style("visibility", "hidden");
			});
};

d3.json(countyUrl).then(
	(data, error) => {
		if(error) {
			console.log(error);
		} else {
			countyData = topojson.feature(data, data.objects.counties).features;
			//console.log(countyData);
			
			d3.json(educationUrl).then(
				(data, error) => {
					if(error) {
						console.log(error);
					} else {
						educationData = data;
						//console.log(educationData);
						
						drawMap();
					}
			});
		}
});