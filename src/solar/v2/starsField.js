import { generateRandomFloat } from "./utils";

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

export default getStarField;
