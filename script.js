function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const mybutton = document.getElementById("myBtn");
  const pillTrack = document.querySelector(".pill-track");

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (mybutton) {
        const scrolled = document.body.scrollTop > 400 || document.documentElement.scrollTop > 400;
        mybutton.style.display = scrolled ? "flex" : "none";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  const sections = document.querySelectorAll(".category");
  const pills = document.querySelectorAll(".pill");
  if (!sections.length || !pills.length) return;

  const pillById = {};
  pills.forEach((pill) => {
    const id = pill.getAttribute("href").slice(1);
    pillById[id] = pill;
  });

  function isPillFullyVisible(pill) {
    if (!pillTrack) return true;
    const trackRect = pillTrack.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    return pillRect.left >= trackRect.left && pillRect.right <= trackRect.right;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pill = pillById[entry.target.id];
          if (!pill) return;
          pills.forEach((p) => p.classList.remove("active"));
          pill.classList.add("active");
          if (!isPillFullyVisible(pill)) {
            pill.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
          }
        }
      });
    },
    { rootMargin: "-100px 0px -70% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
});
