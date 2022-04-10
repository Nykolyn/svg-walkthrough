const COORD_WIDTH = 1000;
const COORD_HEIGHT = 1000;

const SVG = document.querySelector("svg.solar-system");
const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
};

const drawPlanet = ({ size, distance }) =>
  `
    <circle 
      cx="${COORD_WIDTH / 2 + distance}" 
      cy="${COORD_HEIGHT / 2}" 
      r="${size}" 
      fill="${COLORS.WHITE}"
    />
  `;

const drawOrbit = (distance) =>
  `
    <circle 
      cx="${COORD_WIDTH / 2}" 
      cy="${COORD_HEIGHT / 2}" 
      r="${distance}" 
      stroke="${COLORS.GREY}"
      fill="none"
    />
  `;

const draw = (markup) => {
  SOLAR_SYSTEM_GROUP.insertAdjacentHTML("beforeend", markup);
};

console.log("draw");
draw(drawOrbit(100));
draw(drawPlanet({ size: 50, distance: 100 }));
