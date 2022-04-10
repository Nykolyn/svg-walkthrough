const COORD_WIDTH = 1000;
const COORD_HEIGHT = 1000;

const SVG = document.querySelector("svg.solar-system");
const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
};

const config = [
  { size: 40, distance: 0 },
  { size: 20, distance: 100 },
  { size: 10, distance: 200 },
];

const getPlanet = ({ size, distance }) =>
  `
    <circle 
      cx="${COORD_WIDTH / 2 + distance}" 
      cy="${COORD_HEIGHT / 2}" 
      r="${size}" 
      fill="${COLORS.WHITE}"
    />
  `;

const getOrbit = (distance) =>
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

config.forEach(({ size, distance }) => {
  draw(getOrbit(distance));
  draw(getPlanet({ size, distance }));
});
