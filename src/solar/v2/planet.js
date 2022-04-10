import { COLORS, COORDS } from "./constants";
import { generateRandomFloat, generateRandomInt } from "./utils";

export const getPlanetFilter = ({ color, name, size, distance }) => {
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

export const getPlanet = ({ size, distance, speed, name }) => {
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
