const COORDS = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
  SUN: "#ea7b21",
  MERCURY: "#8e8e8e",
  VENUS: "#d16730",
};

const SVG = document.querySelector("svg.solar-system");
const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

const config = [
  { size: 40, distance: 0, speed: 0, color: COLORS.SUN },
  { size: 20, distance: 80, speed: 5000, color: COLORS.MERCURY },
  { size: 10, distance: 120, speed: 7000, color: COLORS.VENUS },
];

const getPlanet = ({ size, distance, speed, color }) =>
  `
    <circle
      class="planet" 
      cx="${COORDS.WIDTH / 2 + distance}" 
      cy="${COORDS.HEIGHT / 2}" 
      r="${size}" 
      fill="${color}"
      style="
        --rotation-angle: ${Math.round(360 * Math.random())}deg;
        --rotation-speed: ${speed}ms;
    "
    />
  `;

const getOrbit = (distance) =>
  `
    <circle 
      cx="${COORDS.WIDTH / 2}" 
      cy="${COORDS.HEIGHT / 2}" 
      r="${distance}" 
      stroke="${COLORS.GREY}"
      fill="none"
    />
  `;

const draw = (markup) => {
  SOLAR_SYSTEM_GROUP.insertAdjacentHTML("beforeend", markup);
};

config.forEach(({ size, distance, speed, color }) => {
  draw(getOrbit(distance));
  draw(getPlanet({ size, distance, speed, color }));
});
