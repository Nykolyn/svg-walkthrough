const COORDS = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
  BLACK: "hsla(0, 0%, 0%, 1)",
  TRANSPARENT: "hsla(0, 0%, 0%, 0)",
  SUN: "hsl(27, 83%, 52%)",
  MERCURY: "	hsl(0, 0%, 56%)",
  VENUS: "hsl(20, 64%, 50%)",
};

const SVG = document.querySelector("svg.solar-system");
const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

const config = [
  {
    name: "mercury",
    size: 10,
    distance: 80,
    speed: 5000,
    color: COLORS.MERCURY,
  },
  { name: "venus", size: 15, distance: 120, speed: 7000, color: COLORS.VENUS },
];

const generateRandomInt = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
const generateRandomFloat = (min, max) => Math.random() * (max - min) + min;

const getPlanetFilter = ({ color, name, size, distance }) => {
  const turbulenceType = "fractalNoise"; //"turbulence";

  const baseFrequencyX = generateRandomFloat(0.5, 2) / size;
  const baseFrequencyY = generateRandomFloat(2, 4) / size;
  const numOctaves = generateRandomInt(3, 10);
  const seed = Math.random();

  const elevation = generateRandomInt(30, 100);
  const surfaceScale = generateRandomInt(5, 10);

  return `
    <clipPath id="${name}-shadow-clip-path">
      <circle 
        cx="${COORDS.WIDTH / 2 + distance}" 
        cy="${COORDS.HEIGHT / 2}"
        r="${size + 2}" />
      </clipPath>
    <radialGradient id="${name}-shadow">
      <stop offset="0%" stop-color="${COLORS.TRANSPARENT}"></stop>
      <stop offset="90%" stop-color="${COLORS.BLACK}"></stop>
    </radialGradient>
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

const getSun = () => `
    <circle 
      cx="${COORDS.WIDTH / 2}" 
      cy="${COORDS.HEIGHT / 2}" 
      r="40" 
      fill="${COLORS.SUN}"
    />
  `;

const getPlanet = ({ size, distance, speed, color, name }) => {
  const cx = COORDS.WIDTH / 2 + distance;
  const cy = COORDS.HEIGHT / 2;

  return `
    <g
      class="planet"
      style="
        --rotation-angle: ${Math.round(360 * Math.random())}deg;
        --rotation-speed: ${speed}ms;
    "
    >
      <circle r="${size}" cx="${cx - 0.4}" cy="${cy}" fill="#fff" />
      <circle r="${size}" cx="${cx}" cy="${cy}" filter="url(#${name}-texture)" />
      <circle 
        cx="${cx - size}" 
        cy="${cy}" 
        r="${size * 2 + 2}" 
        fill="url(#${name}-shadow)"
        clip-path="url(#${name}-shadow-clip-path)"/>
    </g>
  `;
};

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

draw(getSun());
config.forEach(({ size, distance, speed, color, name }) => {
  draw(getOrbit(distance));
  draw(getPlanetFilter({ name, size, color, distance }));
  draw(getPlanet({ size, distance, speed, color, name }));
});
