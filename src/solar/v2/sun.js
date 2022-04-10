import { COLORS, COORDS } from "./constants";

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

export default getSun;
