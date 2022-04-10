const COORDS = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
  SUN: "hsl(27, 83%, 52%)",
  MERCURY: "	hsl(0, 0%, 56%)",
  VENUS: "hsl(20, 64%, 50%)",
};

const SVG = document.querySelector("svg.solar-system");
const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

const config = [
  { name: "sun", size: 40, distance: 0, speed: 0, color: COLORS.SUN },
  {
    name: "mercury",
    size: 20,
    distance: 80,
    speed: 5000,
    color: COLORS.MERCURY,
  },
  { name: "venus", size: 10, distance: 120, speed: 7000, color: COLORS.VENUS },
];

const generateRandomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
const generateRandomFloat = (min, max) => Math.random() * (max - min) + min;

const getPlanetFilter = ({ color, name, size }) => {
  const turbulenceType = "fractalNoise"; //"turbulence";

  const baseFrequencyX = generateRandomFloat(0.5, 2) / size;
  const baseFrequencyY = generateRandomFloat(2, 4) / size;
  const numOctaves = generateRandomInt(3, 10);
  const seed = Math.random();

  const elevation = generateRandomInt(30, 100);
  const surfaceScale = generateRandomInt(5, 10);

  return `
    <filter id="${name}-texture">
      <feTurbulence
        type="${turbulenceType}"
        baseFrequency="${baseFrequencyX} ${baseFrequencyY}"
        seed="${seed}"
        numOctaves="${numOctaves}"
      />
      <feDiffuseLighting lighting-color="${color}" surfaceScale="${surfaceScale}">
        <feDistantLight elevation="${elevation}" />
      </feDiffuseLighting>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  `;
};

const getPlanet = ({ size, distance, speed, color, name }) =>
  `
    <circle
      class="planet" 
      cx="${COORDS.WIDTH / 2 + distance}" 
      cy="${COORDS.HEIGHT / 2}" 
      r="${size}" 
      fill="${color}"
      filter="url(#${name}-texture)"
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

config.forEach(({ size, distance, speed, color, name }) => {
  draw(getOrbit(distance));
  draw(getPlanetFilter({ name, size, color }));
  draw(getPlanet({ size, distance, speed, color, name }));
});
