export const COORDS = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

export const COLORS = {
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
  EARTH: "hsl(76, 60%, 50%)",
  MARS: "hsl(18, 96%, 35%)",
  JUPITER: "hsl(25, 71%, 59%)",
  SATURN: "hsl(33, 78%, 79%)",
  URANUS: "hsl(196, 75%, 55%)",
  NEPTUNE: "hsl(197, 88%, 68%)",
  PLUTO: "hsl(32, 9%, 61%)",
};

export const STARS_SVG = document.querySelector("svg.stars-background");
export const SVG = document.querySelector("svg.solar-system");
export const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

export const config = [
  {
    name: "mercury",
    size: 4,
    distance: 60,
    speed: 10000,
    color: COLORS.MERCURY,
  },
  { name: "venus", size: 6, distance: 80, speed: 13000, color: COLORS.VENUS },
  { name: "earth", size: 8, distance: 100, speed: 15000, color: COLORS.EARTH },
  { name: "mars", size: 6, distance: 120, speed: 16000, color: COLORS.MARS },
  { name: "jupiter", size: 20, distance: 160, speed: 18000, color: COLORS.JUPITER },
  { name: "saturn", size: 18, distance: 220, speed: 20000, color: COLORS.SATURN },
  { name: "uranus", size: 14, distance: 270, speed: 22000, color: COLORS.URANUS },
  { name: "neptune", size: 14, distance: 320, speed: 25000, color: COLORS.NEPTUNE },
  { name: "pluto", size: 4, distance: 380, speed: 30000, color: COLORS.PLUTO },
];
