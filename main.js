// Rotating phrase in the headline. Edit this list to change what it cycles through.
const PHRASES = [
  "protein structure search",
  "viral immunology",
  "tools for messy data",
];

const target = document.querySelector(".type");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (target) {
  if (reduced) {
    target.textContent = PHRASES[0];
  } else {
    let phrase = 0;
    let chars = 0;
    let erasing = false;

    const tick = () => {
      const current = PHRASES[phrase];
      chars += erasing ? -1 : 1;
      target.textContent = current.slice(0, chars);

      let wait = erasing ? 40 : 70;
      if (!erasing && chars === current.length) {
        erasing = true;
        wait = 1800;
      } else if (erasing && chars === 0) {
        erasing = false;
        phrase = (phrase + 1) % PHRASES.length;
        wait = 400;
      }
      setTimeout(tick, wait);
    };
    tick();
  }
}

// Mobile menu
const burger = document.querySelector(".burger");
const menu = document.getElementById("mobile-menu");

burger?.addEventListener("click", () => {
  const open = menu.hasAttribute("data-open");
  if (open) {
    menu.removeAttribute("data-open");
    menu.hidden = true;
  } else {
    menu.hidden = false;
    menu.setAttribute("data-open", "");
  }
  burger.setAttribute("aria-expanded", String(!open));
  burger.setAttribute("aria-label", open ? "Open menu" : "Close menu");
});

menu?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.removeAttribute("data-open");
    menu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
  })
);
