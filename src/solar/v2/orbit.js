import { COLORS, COORDS } from "./constants";

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

export default getOrbit;
