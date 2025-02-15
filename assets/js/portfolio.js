// Consolidated JavaScript for Portfolio
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const menuBtn = document.querySelector(".menu-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu");
  const jumpTopBtn = document.querySelector(".jump-top");
  const sections = document.querySelectorAll("section");
  const skillItems = document.querySelectorAll(".skill-item");
  const homeSection = document.querySelector("#home");

  let isMenuOpen = false;
  let lastScrollTop = 0;
  let isAutoScrolling = false;

  /* -------------------------
     Intersection Observer for Section Animations
  -------------------------- */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          if (entry.target.classList.contains("skills")) {
            animateSkills();
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
  });

  /* -------------------------
     Enhanced Mobile (Side/Hamburger) Menu
  -------------------------- */
  const toggleMenu = (show) => {
    isMenuOpen = show;
    if (show) {
      menu.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      menu.classList.remove("active");
      document.body.style.overflow = "";
    }
    menuBtn.classList.toggle("active", show);
  };

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu(true);
  });

  cancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu(false);
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (isMenuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  /* -------------------------
     Smooth Scrolling with Easing & Auto-Scroll Flag
  -------------------------- */
  const smoothScroll = (targetId) => {
    isAutoScrolling = true;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const easeInOutCubic = (progress) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        isAutoScrolling = false;
      }
    };

    requestAnimationFrame(animation);
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (isMenuOpen) {
        toggleMenu(false);
        setTimeout(() => smoothScroll(targetId), 300);
      } else {
        smoothScroll(targetId);
      }
    });
  });

  /* -------------------------
     Advanced Scroll Handling & Jump-Top Button Visibility
  -------------------------- */
  const handleScroll = () => {
    if (isAutoScrolling) return;

    const currentScrollTop = window.pageYOffset;
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (currentScrollTop > homeSectionBottom) {
      jumpTopBtn.classList.add("visible");
    } else {
      jumpTopBtn.classList.remove("visible");
    }

    // Navbar hide/show on scroll
    if (currentScrollTop > lastScrollTop && currentScrollTop > 80) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScrollTop;
  };

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
  });

  /* -------------------------
     Skills Animation
  -------------------------- */
  const animateSkills = () => {
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = "translateY(0)";
        item.style.opacity = "1";
      }, index * 100);
    });
  };

  /* -------------------------
     Responsive Image Loading
  -------------------------- */
  const loadResponsiveImages = () => {
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      if (window.innerWidth <= 768) {
        img.src = img.getAttribute("data-src-mobile");
      } else {
        img.src = img.getAttribute("data-src");
      }
    });
  };

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu(false);
      }
      loadResponsiveImages();
    }, 250);
  });

  /* -------------------------
     Atomic Universe Animation
  -------------------------- */
  const quantumCanvas = document.getElementById("quantum");
  if (quantumCanvas) {
    const ctx = quantumCanvas.getContext("2d");

    const resizeCanvas = () => {
      quantumCanvas.width = quantumCanvas.offsetWidth;
      quantumCanvas.height = quantumCanvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const atoms = [];
    const atomsCount = 100;
    const ConnDist = 90;

    const randomColor = () => {
      const colors = [
        "#00FFFF",
        "#FF00FF",
        "#FFFF00",
        "#7FFF00",
        "#00BFFF",
        "#FF4500",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    class Atom {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * quantumCanvas.width;
        this.y = Math.random() * quantumCanvas.height;
        this.radius = Math.random() * 3 + 2;
        this.speed = Math.random() * 0.5 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.color = randomColor();
      }

      move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += (Math.random() - 0.5) * 0.05;
        if (
          this.x < 0 ||
          this.x > quantumCanvas.width ||
          this.y < 0 ||
          this.y > quantumCanvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hexToRgb(this.color)}, ${this.opacity})`;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
      }

      hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      }
    }

    for (let i = 0; i < atomsCount; i++) {
      atoms.push(new Atom());
    }

    function drawConnections() {
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < ConnDist) {
            ctx.beginPath();
            ctx.moveTo(atoms[i].x, atoms[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            const alpha = 1 - distance / ConnDist;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
    }

    const animateQuantum = () => {
      ctx.clearRect(0, 0, quantumCanvas.width, quantumCanvas.height);
      atoms.forEach((atom) => {
        atom.move();
        atom.draw();
      });
      drawConnections();
      requestAnimationFrame(animateQuantum);
    };

    animateQuantum();

    // GSAP Animation on animated background
    gsap.to("section.home .anim-bg", {
      duration: 18,
      backgroundColor: "#0a1526",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  /* -------------------------
     Matrix Animation
  -------------------------- */
  const matrixCanvas = document.getElementById("matrix-canvas");
  if (matrixCanvas) {
    const matrixCtx = matrixCanvas.getContext("2d");
    const fontSize = 14;
    const columns = matrixCanvas.offsetWidth / fontSize;
    const drops = [];

    matrixCanvas.width = matrixCanvas.offsetWidth;
    matrixCanvas.height = matrixCanvas.offsetHeight;

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * matrixCanvas.height);
    }

    const charsArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/".split("");

    function drawMatrix() {
      matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      matrixCtx.fillStyle = "#0f0";
      matrixCtx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    function animateMatrix() {
      requestAnimationFrame(animateMatrix);
      drawMatrix();
    }
    animateMatrix();

    window.addEventListener("resize", () => {
      matrixCanvas.width = matrixCanvas.offsetWidth;
      matrixCanvas.height = matrixCanvas.offsetHeight;
    });
  }

  /* -------------------------
     Responsive Image Loading
  -------------------------- */
  loadResponsiveImages();
  handleScroll();
});

// Fetch and display GitHub projects in the Projects section
const projectsContainer = document.getElementById("projects-container");

fetch("https://api.github.com/users/4n0nym455/repos")
  .then((response) => response.json())
  .then((repos) => {
    // Sort repos by update time (most recent first)
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Clear the container
    projectsContainer.innerHTML = "";

    repos.forEach((repo) => {
      // Create a project card for each repo
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.setAttribute("aria-label", repo.name);

      // Repo title
      const title = document.createElement("h3");
      title.textContent = repo.name;
      card.appendChild(title);

      // Repo description
      const description = document.createElement("p");
      description.textContent = repo.description || "No description provided.";
      card.appendChild(description);

      // Link to GitHub repository
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View on GitHub";
      link.setAttribute("aria-label", `View repository ${repo.name} on GitHub`);
      card.appendChild(link);

      projectsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching GitHub repos:", error);
    projectsContainer.innerHTML = "<p>Unable to load projects at this time.</p>";
  });
