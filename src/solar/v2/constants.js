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
};

const SVG = document.querySelector("svg.solar-system");
export const SOLAR_SYSTEM_GROUP = SVG.querySelector(".solar-system__group");

export const config = [
  {
    name: "mercury",
    size: 10,
    distance: 80,
    speed: 5000,
    color: COLORS.MERCURY,
  },
  { name: "venus", size: 15, distance: 120, speed: 7000, color: COLORS.VENUS },
];
