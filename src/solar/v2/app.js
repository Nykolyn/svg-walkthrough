const COORDS = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

const COLORS = {
  WHITE: "#fff",
  GREY: "#ccc",
  BLACK: "hsla(0, 0%, 0%, 1)",
  TRANSPARENT: "hsla(0, 0%, 0%, 0)",
  SUN: {
    color: "hsl(44, 98.00970234176057%, 69.37126938664194%)",
    light: "hsl(44, 100%, 60%)",
    backGlow: "hsl(58, 87.77599441810247%, 47.88947090999893%)",
    frontGlow: "hsl(58, 100%, 56.178054291537364%)",
  },
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

const generateRandomInt = (min, max) => Math.round(Math.random() * (max - min) + min);
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

const sunFilters = ({ size }) => {
  const blurFilterSize = 300;
  return `
        <defs>
          <filter id="star-main">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="${size / 5000}" 
              numOctaves="5" 
              seed="${100 * Math.random()}" />
            <feDiffuseLighting 
              lighting-color="${COLORS.SUN.light}" 
              surfaceScale="${size / 20}">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite operator="in" in2="SourceGraphic"/>
            <feGaussianBlur stdDeviation="${size / 100}"/>
          </filter>
  
          <filter
            id="star-glow" 
            filterUnits="userSpaceOnUse"
            x="0" 
            y="0" 
            height="${COORDS.HEIGHT}" 
            width="${COORDS.WIDTH}">
          >
            <feGaussianBlur stdDeviation="${size / 5}"/>
          </filter>
  
          <filter
            id="star-secondary-glow" 
            filterUnits="userSpaceOnUse"
            x="${COORDS.WIDTH / 2 - size * blurFilterSize}" 
            y="${COORDS.HEIGHT / 2 - size * blurFilterSize}" 
            height="${size * 2 * blurFilterSize}" 
            width="${size * 2 * blurFilterSize}"
          >
            <feGaussianBlur stdDeviation="${size / 5}"/>
          </filter>
  
          <filter id="star-turbulent-glow">
            <feTurbulence 
              baseFrequency="${(0.75 / size) * 10}" 
              seed="${100 * Math.random()}" />
            <feDiffuseLighting 
            lighting-color="${COLORS.SUN.light}" 
            surfaceScale="${(1 * size) / 20}">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite operator="in" in2="SourceGraphic"/>
            <feGaussianBlur stdDeviation="${size / 30}"/>
          </filter>
        </defs>
    `;
};

const sunGlow = ({ size }) => {
  const cx = COORDS.WIDTH / 2;
  const cy = COORDS.HEIGHT / 2;

  return `
      <circle r="${size}" cx="${cx}" cy="${cy}" filter="url(#star-glow)" 
        fill="${COLORS.SUN.backGlow}" 
        opacity="0.7"/ class="star-glow"/>
      <circle 
        r="${size * 0.85}" 
        cx="${cx}" cy="${cy}" filter="url(#star-turbulent-glow)" 
        fill="${COLORS.SUN.backGlow}" 
        opacity="0.7" class="turbulent-glow"/>
      <circle 
        r="${size * 0.8}" 
        cx="${cx}" cy="${cy}" fill="${COLORS.SUN.light}"  class="flat"/>
        <circle 
        r="${size * 0.75}" 
        cx="${cx}" cy="${cy}" filter="url(#star-main)" opacity="0.9" class="main-turbulence"/>
        <circle 
        r="${size * 0.74}" 
        cx="${cx}" cy="${cy}" filter="url(#star-secondary-glow)" 
        fill="${COLORS.SUN.frontGlow}" opacity="0.7" class="inner-glow" />
  `;
};

const getSun = ({ size }) => {
  return `
        ${sunFilters({ size })}
        ${sunGlow({ size })}
    `;
};

const getPlanet = ({ size, distance, speed, name }) => {
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
      stroke-width="1"
    />
  `;

const getStarField = () => {
  const id = `star-field-`;
  return `
      <defs>
        <radialGradient id="${id}-gradient-1">
          <stop offset="0%" stop-color="hsla(${generateRandomFloat(190, 230)}, 100%, 20%, 1)" />
          <stop offset="100%" stop-color="hsla(${generateRandomFloat(290, 360)}, 100%, 20%, 1)" />
        </radialGradient>
      </defs>
      <rect x="0%" y="0%" width="150%" height="200%" fill="url(#${id}-gradient-1)"/>
      <defs>
        <radialGradient id="${id}-gradient-2">
          <stop offset="0%" stop-color="hsla(${generateRandomFloat(190, 230)}, 100%, 20%, 1)" />
          <stop offset="100%" stop-color="hsla(${generateRandomFloat(290, 360)}, 100%, 20%, 1)" />
        </radialGradient>
      </defs>
      <rect x="100%" y="150%" width="150%" height="200%" fill="url(#${id}-gradient-2)" opacity="0.75"/>
  
      <filter id="${id}-bg">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" seed="${generateRandomFloat(0, 100)}"/> 
          <feGaussianBlur stdDeviation="10"/>       
      </filter>
      <rect width="100%" height="100%" filter="url(#${id}-bg)" opacity="0.3"/>
  
      <filter id="${id}-stars">
        <feTurbulence baseFrequency="0.2" seed="${generateRandomFloat(0, 100)}"/>
        <feColorMatrix values="0 0 0 9 -4
                              0 0 0 9 -4
                              0 0 0 9 -4
                              0 0 0 0 0.5"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#${id}-stars)"/>
    `;
};

const draw = (markup) => {
  SOLAR_SYSTEM_GROUP.insertAdjacentHTML("beforeend", markup);
};

// draw(getStarField());
draw(getSun({ size: 40 }));
config.forEach(({ size, distance, speed, color, name }) => {
  draw(getOrbit(distance));
  draw(getPlanetFilter({ name, size, color, distance }));
  draw(getPlanet({ size, distance, speed, name }));
});
