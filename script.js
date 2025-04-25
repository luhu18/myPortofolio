// Nav Toggle for mobile menu
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });
};

// Sticky Navigation
const stickyNav = () => {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
};

// Project Filtering
const filterProjects = () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projects.forEach((project) => {
        if (filterValue === "all") {
          project.style.display = "block";
        } else if (project.getAttribute("data-category") === filterValue) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }

        // Add animation
        setTimeout(() => {
          project.classList.add("show");
        }, 300);
      });
    });
  });
};

// Smooth Scrolling for navigation links
const smoothScroll = () => {
  const navLinks = document.querySelectorAll("nav a, .hero a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Close mobile menu if open
          const nav = document.querySelector(".nav-links");
          const burger = document.querySelector(".burger");
          if (nav.classList.contains("nav-active")) {
            nav.classList.remove("nav-active");
            burger.classList.remove("toggle");
          }

          window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });
};

// Form validation and submission
const formHandler = () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message

        // Create success message
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.textContent =
          "Thank you for your message! I will get back to you soon.";

        // Insert the success message after the form
        contactForm.insertAdjacentElement("afterend", successMsg);

        // Reset the form
        contactForm.reset();

        // Remove the success message after 5 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }
    });
  }
};

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".about-content, .skills-container, .project-card, .contact-content"
  );

  const options = {
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
};

// Add CSS for the animations
const addAnimationStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
        /* Animation styles */
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .scrolled {
            background-color: var(--light-color);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .about-content, .skills-container, .project-card, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .about-content.animate, .skills-container.animate, .project-card.animate, .contact-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skills-container .skill-category:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .skills-container .skill-category:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .success-message {
            background-color: var(--success-color);
            color: var(--light-color);
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
            font-weight: 600;
        }
    `;
  document.head.appendChild(style);
};

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  addAnimationStyles();
  navSlide();
  stickyNav();
  filterProjects();
  smoothScroll();
  formHandler();
  animateOnScroll();
});
