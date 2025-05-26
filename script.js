function toggleMore() {
  const moreContent = document.querySelector(".project-more");
  moreContent.classList.toggle("expanded");
}

function scrollToGallery(event) {
  // Find the nearest gallery section relative to the clicked button
  const gallerySection = event.target
    .closest(".content-container")
    .querySelector(".gallery");
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ------------------------------
// Global Setup
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // --- CSS Variables ---
  const rootStyles = getComputedStyle(document.documentElement);
  const getVar = (name) => rootStyles.getPropertyValue(name).trim();
  const textColor = getVar("--text");
  const backgroundColor = getVar("--background");
  const primaryColor = getVar("--primary");
  const secondaryColor = getVar("--secondary");
  const accentColor = getVar("--accent");

  // ------------------------------
  // 1. Menu Animation
  // ------------------------------
  const menuItems = document.querySelectorAll(".menu-container a");
  menuItems.forEach((item, index) => {
    setTimeout(() => item.classList.add("show"), index * 200);
  });

  // ------------------------------
  // 2. Hover Sound
  // ------------------------------
  const hoverSound = document.getElementById("hover-sound");

  if (hoverSound) {
    // Try unlocking audio playback right away (no click needed)
    hoverSound
      .play()
      .then(() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      })
      .catch(() => {
        // No worries if blocked — sound will play on hover later
      });

    // Listen to mouse entering anywhere in the body (capturing phase)
    document.body.addEventListener(
      "mouseenter",
      (event) => {
        // Only play sound if the hovered element is an <a> tag
        if (event.target.tagName === "A") {
          hoverSound.currentTime = 0;
          hoverSound
            .play()
            .catch((e) => console.warn("Hover sound blocked:", e));
        }
      },
      true
    );
  }

  // ------------------------------
  // 3. VANTA Effects
  // ------------------------------
  const initVantaEffect = (type, selector, options) => {
    const el = document.querySelector(selector);
    if (el && VANTA[type]) return VANTA[type]({ el, ...options });
  };

  const vantaOptions = {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: primaryColor,
    backgroundColor: backgroundColor,
  };

  const vantaTrunk = initVantaEffect("TRUNK", "#home-page", {
    ...vantaOptions,
    spacing: 7.0,
    chaos: 1,
  });

  if (vantaTrunk) {
    document.addEventListener("mousemove", (event) => {
      const centerX = window.innerWidth / 2;
      const distance = Math.abs(event.clientX - centerX);
      const chaos = (distance / centerX) * 7;
      const spacing = 10 - chaos;
      vantaTrunk.setOptions({ chaos, spacing });
    });
  }

  initVantaEffect("TOPOLOGY", "#work-page", vantaOptions);
  initVantaEffect("NET", "#uniproj-page", {
    ...vantaOptions,
    maxDistance: 40.0,
    spacing: 19.0,
    backgroundColor: 0x388c98,
    color: secondaryColor,
  });

  // ------------------------------
  // 4. Project Filter Buttons
  // ------------------------------
  const buttons = document.querySelectorAll(".filter-btn");
  const allButton = document.querySelector('[data-tag="All"]');
  const selectedTags = new Set();

  allButton?.classList.add("active");

  const filterProjects = () => {
    document.querySelectorAll(".menu-container a").forEach((project) => {
      const tags = project.dataset.tags.split(" ");
      const show =
        selectedTags.size === 0 || tags.some((tag) => selectedTags.has(tag));
      project.style.display = show ? "block" : "none";
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;

      if (tag === "All") {
        selectedTags.clear();
        buttons.forEach((btn) => btn.classList.remove("active"));
        allButton.classList.add("active");
      } else {
        selectedTags.has(tag)
          ? selectedTags.delete(tag)
          : selectedTags.add(tag);
        button.classList.toggle("active");

        if (selectedTags.size === 0 || selectedTags.size === 5) {
          selectedTags.clear();
          buttons.forEach((btn) => btn.classList.remove("active"));
          allButton.classList.add("active");
        } else {
          allButton.classList.remove("active");
        }
      }

      filterProjects();
    });
  });

  filterProjects();

  // ------------------------------
  // 5. Highlight Link on Scroll
  // ------------------------------
  const workLinks = document.querySelectorAll("#workContainer h1");

  const checkMiddleOfScreen = () => {
    const middle = window.innerHeight / 2;
    const threshold = 100;

    workLinks.forEach((link) => {
      const { top, height } = link.getBoundingClientRect();
      const center = top + height / 2;
      link.classList.toggle("enlarged", Math.abs(center - middle) < threshold);
    });
  };

  window.addEventListener("scroll", checkMiddleOfScreen);
  checkMiddleOfScreen();

  // ------------------------------
  // 6. Carousel Functionality
  // ------------------------------
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const dots = document.querySelectorAll(".carousel-dots span");
    const images = carousel.querySelectorAll("img");

    const updateActiveDot = () => {
      const index = Math.floor(carousel.scrollLeft / carousel.offsetWidth);
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    };

    carousel.addEventListener("scroll", updateActiveDot);
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        carousel.scrollTo({
          left: i * images[0].offsetWidth,
          behavior: "smooth",
        });
      })
    );

    updateActiveDot();
  }

  // ------------------------------
  // 7. Dynamic Background (Photography)
  // ------------------------------
  const body = document.getElementById("photography-page");

  const photoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const img = entry.target;
        if (entry.isIntersecting && img.complete) {
          const colorThief = new ColorThief();
          const [r, g, b] = colorThief.getColor(img);

          // Calculate complementary color
          const compR = 255 - r;
          const compG = 255 - g;
          const compB = 255 - b;

          // Apply complementary color as background
          body.style.background = `rgba(${compR}, ${compG}, ${compB}, 0.6)`;
          body.style.transition = "background 0.5s ease-in-out";
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".photo").forEach((img) => {
    if (img.complete) photoObserver.observe(img);
    else img.onload = () => photoObserver.observe(img);
  });

  // ------------------------------
  // 8. Timeline Event Interactions
  // ------------------------------
  document.querySelectorAll(".timeline-content").forEach((item) => {
    const link = item.getAttribute("data-link");
    const type = item.getAttribute("data-type");

    item.addEventListener("click", () => {
      if (link) window.open(link, "_blank");
    });

    item.addEventListener("mouseenter", () => {
      document.querySelector(`.${type}-photo`).style.display = "block";
    });

    item.addEventListener("mouseleave", () => {
      document.querySelector(`.${type}-photo`).style.display = "none";
    });
  });

  // ------------------------------
  // 9. Scroll to Section Buttons
  // ------------------------------
  document.querySelectorAll(".view-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const gallery = e.target
        .closest(".content-container")
        ?.querySelector(".gallery");
      gallery?.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.getElementById("resume-button")?.addEventListener("click", () => {
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
  });
});

// ------------------------------
// 10. Map Initialization (Leaflet)
// ------------------------------
const map = L.map("map").setView([51.505, -0.09], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const customIcon = L.icon({
  iconUrl: "icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function addCountryMarker(lat, lon, name) {
  L.marker([lat, lon], { icon: customIcon })
    .addTo(map)
    .bindPopup(`<b>${name}</b>`);
}

[
  [42.5078, 1.5211, "Andorra"],
  [50.8503, 4.3517, "Belgium"],
  [15.12, -23.605, "Cape Verde"],
  [51.5074, -0.1278, "England"],
  [48.8566, 2.3522, "France"],
  [51.1657, 10.4515, "Germany"],
  [41.9028, 12.4964, "Italy"],
  [31.9466, -7.5095, "Morocco"],
  [38.7169, -9.1395, "Portugal"],
  [56.4907, -4.2026, "Scotland"],
  [-33.9249, 18.4241, "South Africa"],
  [40.4637, -3.7492, "Spain"],
  [40.7128, -74.006, "United States"],
].forEach(([lat, lon, name]) => addCountryMarker(lat, lon, name));

document.querySelectorAll(".dropdown-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    answer.classList.toggle("open");
    button.classList.toggle("open"); // this is needed for the arrow to rotate
  });
});
