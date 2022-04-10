import { config, SOLAR_SYSTEM_GROUP } from "./constants";
import getOrbit from "./orbit";
import { getPlanet, getPlanetFilter } from "./planet";
import getStarField from "./starsField";
import getSun from "./sun";

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
