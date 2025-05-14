// Mobile menu toggle
const toggleButton = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleButton.addEventListener("click", function (e) {
  e.stopPropagation(); // Prevent click from bubbling to document
  mobileMenu.classList.toggle("hidden");
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const isClickInsideMenu = mobileMenu.contains(e.target);
  const isClickOnToggle = toggleButton.contains(e.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    mobileMenu.classList.add("hidden");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const menu = document.getElementById("mobile-menu");
      menu.classList.add("hidden");
    }
  });
});

// Back to top button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animate project cards on hover
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const imgOverlay = this.querySelector(".absolute.inset-0");
    const content = this.querySelector(".project-content");

    imgOverlay.classList.remove("opacity-0");
    imgOverlay.classList.add("opacity-100");

    content.classList.remove("opacity-0");
    content.classList.add("opacity-100");
  });

  card.addEventListener("mouseleave", function () {
    const imgOverlay = this.querySelector(".absolute.inset-0");
    const content = this.querySelector(".project-content");

    imgOverlay.classList.remove("opacity-100");
    imgOverlay.classList.add("opacity-0");

    content.classList.remove("opacity-100");
    content.classList.add("opacity-0");
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Set active navigation link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-nav");
    }
  });
});
