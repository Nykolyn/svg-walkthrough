const svg = document.querySelector("svg.solar-system");

const addPlanet = ({ r = 5, color = "black", dur = 2, id }) => {
  console.log("will  add planet");
  const planet = `
  <circle r="${r}" fill="${color}">
    <animateMotion dur="${dur}s" rotate="auto" repeatCount="indefinite">
      <mpath xlink:href="#${id}" />
    </animateMotion>
  </circle>`;

  svg.insertAdjacentHTML("beforeend", planet);
};

const addOrbit = ({ r, id }) => {
  const coord = 200;
  const orbit = `<path
    id="${id}"
    stroke="black"
    fill="none"
    stroke-width="2"
    d="
        M ${coord - r}, ${coord}
        a ${r},${r} 0 1,0 ${r * 2},0
        a ${r},${r} 0 1,0 -${r * 2},0
    "
  />`;
  svg.insertAdjacentHTML("beforeend", orbit);
};

const config = [
  { id: "mercury", orbit: { r: 20 }, planet: { r: 5, color: "black", dur: 4 } },
  { id: "venus", orbit: { r: 40 }, planet: { r: 7, color: "black", dur: 20 } },
  { id: "earth", orbit: { r: 60 }, planet: { r: 10, color: "black", dur: 10 } },
  { id: "mars", orbit: { r: 80 }, planet: { r: 8, color: "black", dur: 9 } },
  {
    id: "jupiter",
    orbit: { r: 100 },
    planet: { r: 15, color: "black", dur: 9 },
  },
  {
    id: "saturn",
    orbit: { r: 120 },
    planet: { r: 13, color: "black", dur: 8 },
  },
  {
    id: "uranus",
    orbit: { r: 140 },
    planet: { r: 11, color: "black", dur: 22 },
  },
  {
    id: "neptune",
    orbit: { r: 160 },
    planet: { r: 11, color: "black", dur: 21 },
  },
  { id: "pluto", orbit: { r: 180 }, planet: { r: 5, color: "black", dur: 25 } },
];
console.log("config", config);
config.forEach(({ id, orbit, planet }) => {
  addOrbit({ id, ...orbit });
  addPlanet({ id, ...planet });
});
