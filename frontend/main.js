// ========================
// CONFIGURATION
// ========================
// const API_BASE_URL = "http://localhost:5000"; // Not needed with EmailJS

// ========================
// SKILL ICONS & DATA
// ========================
const skillIcons = {
  HTML5: "📄",
  CSS3: "🎨",
  JavaScript: "🔧",
};

const projectImages = {
  "emergency-hotline-number": "./img/emergency.png",
  "payo-mobile-banking": "./img/payoo.png",
};

// ========================
// HAMBURGER MENU
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navOverlay = document.getElementById("nav-overlay");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  hamburger.addEventListener("click", toggleMenu);

  // Close menu when clicking on overlay
  navOverlay.addEventListener("click", closeMenu);

  // Close menu when clicking on nav links
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });
});

// ========================
// SMOOTH SCROLLING
// ========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================
// LOAD PROJECTS FROM API
// ========================
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const result = await response.json();

    const projectsGrid = document.getElementById("projects-grid");
    projectsGrid.innerHTML = "";

    if (result.success && result.data.length > 0) {
      result.data.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.innerHTML = `
          <img src="${project.image ? project.image : './img/default.png'}" alt="${project.title}" class="project-image">
          <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
              ${project.technologies.map((tech) => `<span class="tag">${tech}</span>`).join("")}
            </div>
            <div class="project-links">
              ${
                project.github
                  ? `<a href="${project.github}" target="_blank" class="project-link">
                      <i class="fab fa-github"></i> GitHub
                    </a>`
                  : ""
              }
            </div>
          </div>
        `;
        projectsGrid.appendChild(projectCard);
      });
    } else {
      showDefaultProjects();
    }
  } catch (error) {
    console.error("Error loading projects:", error);
    showDefaultProjects();
  }
}

function showDefaultProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = `
    <div class="project-card">
      <img src="./img/emergency.png" alt="Emergency Hotline" class="project-image">
      <div class="project-content">
        <h3>Emergency Hotline System</h3>
        <p class="project-description">Emergency hotline number system copy number and paste anywhere.</p>
        <div class="project-tags">
          <span class="tag">Html</span>
          <span class="tag">Tailwind CSS</span>
          <span class="tag">JavaScript</span>
        </div>
        <div class="project-links">
          <a href="https://naimul95.github.io/Emergency-Hotline/" target="_blank" class="project-link">
            <i class="fas fa-globe"></i> Live Demo
          </a>
        </div>
      </div>
    </div>

    <div class="project-card">
      <img src="./img/payoo.png" alt="Payo Mobile Banking" class="project-image">
      <div class="project-content">
        <h3>Payo Mobile Banking</h3>
        <p class="project-description">A modern mobile banking application with transactions, bill payments, and account management features.</p>
        <div class="project-tags">
          <span class="tag">Html</span>
          <span class="tag">Tailwind CSS</span>
          <span class="tag">JavaScript</span>
        </div>
        <div class="project-links">
          <a href="https://melodious-malasada-b73b25.netlify.app/" target="_blank" class="project-link">
            <i class="fas fa-globe"></i> Live Demo
          </a>
        </div>
      </div>
    </div>

     <div class="project-card">
      <img src="./img/flower-shop.png" alt="Flower shop" class="project-image">
      <div class="project-content">
        <h3>Flower shop</h3>
        <p class="project-description">A modern Flower Shop with a wide variety of fresh flowers and arrangements.</p>
        <div class="project-tags">
          <span class="tag">Html</span>
          <span class="tag">CSS</span>
          
        </div>
        <div class="project-links">
          <a href="https://naimul95.github.io/assignment-2/" target="_blank" class="project-link">
            <i class="fas fa-globe"></i> Live Demo
          </a>
        </div>
      </div>
    </div>
  `;
}

// ========================
// LOAD SKILLS FROM API
// ========================
async function loadSkills() {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`);
    const result = await response.json();

    const skillsGrid = document.getElementById("skills-grid");
    skillsGrid.innerHTML = "";

    if (result.success && result.data.length > 0) {
      result.data.forEach((skillGroup) => {
        const skillCard = document.createElement("div");
        skillCard.className = "skill-card";

        const getCategoryIcon = (category) => {
          const icons = {
            Frontend: "🎨",
            Backend: "⚙️",
            "Databases & Tools": "💾",
            Languages: "🌐", // Added Languages icon
          };
          return icons[category] || "💻";
        };

        const skillItems = skillGroup.skills
          .map(
            (skill) => `
              <div class="skill-item">
                <div class="skill-logo">${skillIcons[skill] || "✓"}</div>
                <span class="skill-name">${skill}</span>
                <div class="skill-level">
                  ${Array(3)
                    .fill(0)
                    .map(
                      (_, i) =>
                        `<div class="level-bar ${
                          i <
                          (skillGroup.level === "Advanced"
                            ? 3
                            : skillGroup.level === "Intermediate"
                            ? 2
                            : 1)
                            ? "active"
                            : ""
                        }"></div>`
                    )
                    .join("")}
                </div>
              </div>
            `
          )
          .join("");

        skillCard.innerHTML = `
          <h3>
            <div class="skill-category-icon">${getCategoryIcon(skillGroup.category)}</div>
            ${skillGroup.category}
          </h3>
          <div class="skill-items">
            ${skillItems}
          </div>
        `;

        skillsGrid.appendChild(skillCard);
      });
    } else {
      showDefaultSkills();
    }
  } catch (error) {
    console.error("Error loading skills:", error);
    showDefaultSkills();
  }
}

function showDefaultSkills() {
  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = `
    <div class="skill-card">
      <h3>
        <div class="skill-category-icon">🎨</div>
        Frontend
      </h3>
      <div class="skill-items">
        <div class="skill-item">
          <div class="skill-logo"><i class="fa-brands fa-html5"></i></div>
          <span class="skill-name">HTML5</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
        </div>
        <div class="skill-item">
          <div class="skill-logo"><i class="fa-brands fa-css3"></i></div>
          <span class="skill-name">CSS3</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
        </div>
        <div class="skill-item">
          <div class="skill-logo"><i class="fab fa-bootstrap"></i></div>
          <span class="skill-name">Tailwind CSS</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
        </div>
        
        </div>
       
        </div>
      </div>
    </div>

    <div class="skill-card">
      <h3>
        <div class="skill-category-icon">🌐</div>
        Languages
      </h3>
      <div class="skill-items">
        <div class="skill-item">
          <div class="skill-logo"><i class="fa-solid fa-c"></i></div>
          <span class="skill-name">C++</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
        </div>
        <div class="skill-item">
          <div class="skill-logo"><i class="fa-brands fa-java"></i></div>
          <span class="skill-name">Java</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
        </div>
        <div class="skill-item">
          <div class="skill-logo"><i class="fa-brands fa-js"></i></div>
          <span class="skill-name">JAVASCRIPT</span>
          <div class="skill-level">
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
            <div class="level-bar active"></div>
          </div>
      </div>
    </div>
  `;
}

// ========================
// CONTACT FORM SUBMISSION WITH NETLIFY FORMS
// ========================
document
  .getElementById("contact-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      showToast(
        "✅ Message sent successfully! Thank you for reaching out. I'll get back to you soon.",
        "success"
      );
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      showToast(
        "❌ Form submission failed. Please email me directly at naimul.dev95@gmail.com",
        "error"
      );
    })
    .finally(() => {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

// ========================
// TOAST NOTIFICATION
// ========================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "slideUp 0.6s ease-out forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document
      .querySelectorAll(".skill-card, .project-card, .info-card")
      .forEach((card) => observer.observe(card));
  }, 500);
});

// ========================
// LOAD DATA ON PAGE LOAD
// ========================
window.addEventListener("load", () => {
  loadProjects();
  loadSkills();
  // checkAPIHealth(); // Not needed with EmailJS
});

// ========================
// CHECK API HEALTH (Commented out - not needed with EmailJS)
// ========================
/*
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health`);
    const result = await response.json();
    console.log("✅ API Health:", result);
  } catch (error) {
    console.log("⚠️ API not available (using default data):", error.message);
  }
}
*/

// ========================
// SCROLL ANIMATION
// ========================
document.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
});

// ========================
// TYPING ANIMATION
// ========================

const typingElement = document.querySelector(".typing-text");

const words = ["Frontend Developer"];

let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 80);
  } else {
    setTimeout(deleteEffect, 1200);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteEffect, 50);
  } else {
    wordIndex++;
    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
    setTimeout(typeEffect, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// ========================
// SCROLL ANIMATION
// ========================

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
});