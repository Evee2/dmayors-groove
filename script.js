function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const mybutton = document.getElementById("myBtn");
  if (mybutton) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    });
  }

  const sections = document.querySelectorAll(".category");
  const pills = document.querySelectorAll(".pill");
  if (!sections.length || !pills.length) return;

  const pillById = {};
  pills.forEach((pill) => {
    const id = pill.getAttribute("href").slice(1);
    pillById[id] = pill;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pill = pillById[entry.target.id];
          if (!pill) return;
          pills.forEach((p) => p.classList.remove("active"));
          pill.classList.add("active");
          pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      });
    },
    { rootMargin: "-100px 0px -70% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
});
