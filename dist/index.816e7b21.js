const svg = document.querySelector('svg.solar-system');
console.log('svg', svg);
const addPlanet = ({})=>{};
const addOrbit = ({ r  })=>{
    const coord = 200;
    const orbit = `<path
    id="curve"
    stroke="black"
    fill="none"
    stroke-width="2"
    d="
        M ${coord - r}, ${coord}
        a ${r},${r} 0 1,0 ${r * 2},0
        a ${r},${r} 0 1,0 -${r * 2},0
    "
  />`;
    svg.insertAdjacentHTML('beforeend', orbit);
};
addOrbit({
    r: 20
});
console.log('init');

//# sourceMappingURL=index.816e7b21.js.map
