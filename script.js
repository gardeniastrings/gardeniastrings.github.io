const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".site-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("inquiry-form");
form?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Gardenia Strings inquiry — ${data.get("name") || "New event"}`);
  const body = encodeURIComponent(
`Hello Gardenia Strings,

My name is ${data.get("name") || ""}.
Email: ${data.get("email") || ""}
Event date: ${data.get("date") || "Not yet decided"}
Event type: ${data.get("event") || "Not specified"}
Venue or location: ${data.get("venue") || "Not yet decided"}

Event details:
${data.get("message") || ""}

Thank you.`
  );
  window.location.href = `mailto:gardeniastrings@gmail.com?subject=${subject}&body=${body}`;
});
