const circle = document.querySelector(".circle");
const svg = document.querySelector(".svg");

svg.addEventListener("mousemove", (e) => {
  const { left, top } = svg.getBoundingClientRect();
  circle.setAttribute("cx", e.clientX - left);
  circle.setAttribute("cy", e.clientY - top);
});
