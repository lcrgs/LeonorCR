// Get CSS variable values
const rootStyles = getComputedStyle(document.documentElement);
const textColor = rootStyles.getPropertyValue('--text').trim();
const backgroundColor = rootStyles.getPropertyValue('--background').trim();
const primaryColor = rootStyles.getPropertyValue('--primary').trim();
const secondaryColor = rootStyles.getPropertyValue('--secondary').trim();
const accentColor = rootStyles.getPropertyValue('--accent').trim();




document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-container a');

  // Trigger the animation by adding the 'show' class to each menu item
  menuItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('show');
    }, index * 200); // Stagger the animation for each item (e.g., 200ms apart)
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".menu-container a");
  const allButton = document.querySelector('[data-tag="All"]');
  let selectedTags = new Set(); // Store selected filters
  allButton.classList.add("active");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;

      // Toggle selection (add/remove from Set)
      if (tag == "All") {
        selectedTags.clear();
        buttons.forEach(btn => btn.classList.remove("active"));
        allButton.classList.add("active");
      } else {
        if (selectedTags.has(tag)) {
          selectedTags.delete(tag);
          button.classList.remove("active");
        } else {
          selectedTags.add(tag);
          button.classList.add("active");
        }
      }
      if (selectedTags.size === 0) {
        allButton.classList.add("active");
      } else {
        if (selectedTags.size == 5) {
          buttons.forEach(button2 => {
            button2.classList.remove("active");
          })
          selectedTags.clear()
          allButton.classList.add("active");
        } else {
          allButton.classList.remove("active");
        }
      }

      filterProjects();
    });
  });



  function filterProjects() {
    projects.forEach(project => {
      const projectTags = project.dataset.tags.split(" ");

      // Show project if it matches ANY selected tag OR show all if none selected
      if (selectedTags.size === 0 || projectTags.some(tag => selectedTags.has(tag))) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  }

  // Initially show all projects
  filterProjects();
});




// Select all project links
const projectLinks = document.querySelectorAll('.menu-container a');
document.addEventListener('DOMContentLoaded', function () {
  const workContainer = document.getElementById('workContainer');
  const links = workContainer.querySelectorAll('h1');

  function checkMiddleOfScreen() {
    const middleOfScreen = window.innerHeight / 2; // Middle of the viewport
    const threshold = 100; // 20px threshold

    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const linkMiddle = rect.top + rect.height / 2; // Middle of the link

      // Check if the link's middle is within the threshold of the screen's middle
      if (Math.abs(linkMiddle - middleOfScreen) < threshold) {
        link.classList.add('enlarged');
        links.forEach(link2 => {
          if (link != link2)
            link2.classList.remove('enlarged');
        })
      } else {
        link.classList.remove('enlarged');
      }
    });
  }

  // Attach the scroll event listener to the window
  window.addEventListener('scroll', checkMiddleOfScreen);

  // Initial check in case some links are already in the middle
  checkMiddleOfScreen();
});



// 4. VANTA.TRUNK effect (Home)
document.addEventListener("DOMContentLoaded", () => {
  let vantaEffect1 = VANTA.TRUNK({
    el: "#home-page",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: primaryColor,
    backgroundColor: backgroundColor,
    spacing: 7.00,
    chaos: 1
  });

  // Adjust chaos and spacing based on mouse movement
  document.addEventListener("mousemove", (event) => {
    let centerX = window.innerWidth / 2;
    let distanceFromCenter = Math.abs(event.clientX - centerX);
    let maxDistance = centerX; // Max distance to edges
    let chaosLevel = (distanceFromCenter / maxDistance) * 7; // Scale chaos between 0-7
    let spacingLevel = 10 - (distanceFromCenter / maxDistance) * 7;

    vantaEffect1.setOptions({
      chaos: chaosLevel,
      spacing: spacingLevel
    });
  });
});

// 5. VANTA.TOPOLOGY effect (Work Page)
document.addEventListener("DOMContentLoaded", () => {
  let vantaEffect2 = VANTA.TOPOLOGY({
    el: "#work-page",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.0,
    scaleMobile: 1.00,
    color: primaryColor,
    backgroundColor: backgroundColor,
  });

});

document.addEventListener("DOMContentLoaded", () => {
  let vantaEffect3 = VANTA.NET({
    el: "#uniproj-page",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: primaryColor,
    backgroundColor: backgroundColor,
    maxDistance: 40.00,
    spacing: 19.00
  })

});


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const dots = document.querySelectorAll('.carousel-dots span');
  const images = carousel.querySelectorAll('img');
  
  // Function to update the active dot based on scroll position
  function updateActiveDot() {
    const scrollLeft = carousel.scrollLeft;
    const carouselWidth = carousel.offsetWidth;

    // Calculate the current index based on scroll position
    const index = Math.floor(scrollLeft / carouselWidth);

    // Remove 'active' class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Add 'active' class to the correct dot
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  // Listen for the scroll event
  carousel.addEventListener('scroll', updateActiveDot);

  // Initialize the active dot on page load
  updateActiveDot();

  // Add click functionality to dots to scroll the carousel
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const imageWidth = images[0].offsetWidth;
      carousel.scrollTo({
        left: index * imageWidth,
        behavior: 'smooth'
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const colorThief = new ColorThief();
  const body = document.getElementById("photography-page");
  const images = document.querySelectorAll(".photo");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Make sure the image is loaded before getting the color
          if (img.complete) {
            updateBackground(img);
          } else {
            img.onload = () => updateBackground(img);
          }
        }
      });
    },
    { threshold: 0.6 } // 60% of the image must be visible
  );

  images.forEach((img) => observer.observe(img));

  function updateBackground(img) {
    if (!img) return;
    
    const color = colorThief.getColor(img); // Extract dominant color
    const bgColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  
    body.style.transition = "background 0.5s ease-in-out";
    body.style.background = bgColor;

    console.log(txtColor);
  }
});


function toggleMore() {
  const moreContent = document.querySelector('.project-more');
  moreContent.classList.toggle('expanded');
}

function scrollToGallery(event) {
  // Find the nearest gallery section relative to the clicked button
  const gallerySection = event.target.closest('.content-container').querySelector('.gallery');
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Add event listeners to all buttons with the class 'view-button'
document.querySelectorAll('.view-button').forEach(button => {
  button.addEventListener('click', scrollToGallery);
});

document.querySelectorAll('.timeline-content').forEach(item => {
  item.addEventListener('click', () => {
    const link = item.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank'); // Opens the link in a new tab
    }
  });
});


document.querySelectorAll('.timeline-content').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const type = item.getAttribute('data-type');
    document.querySelector(`.${type}-photo`).style.display = 'block';
  });
  item.addEventListener('mouseleave', () => {
    const type = item.getAttribute('data-type');
    document.querySelector(`.${type}-photo`).style.display = 'none';
  });
});


function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

document.getElementById("resume-button").addEventListener("click", function () {
  document.getElementById("resume").scrollIntoView({ behavior: "smooth" });
});

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 2);  // Start with a global view

const customIcon = L.icon({
  iconUrl: 'icon.png',  // Use your custom icon image
  iconSize: [32, 32],  // Size of the icon
  iconAnchor: [16, 32],  // Anchor point of the icon
  popupAnchor: [0, -32]  // Popup position relative to the icon
});
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add a country marker
function addCountryMarker(lat, lon, countryName) {
  L.marker([lat, lon], { icon: customIcon })
    .addTo(map)
    .bindPopup(`<b>${countryName}</b>`)
    .openPopup();
}

// Add your visited countries (example latitudes and longitudes)
addCountryMarker(42.5078, 1.5211, "Andorra");  // Andorra la Vella, Andorra
addCountryMarker(50.8503, 4.3517, "Belgium");  // Brussels, Belgium
addCountryMarker(15.1200, -23.6050, "Cape Verde");  // Praia, Cape Verde
addCountryMarker(51.5074, -0.1278, "England");  // London, England
addCountryMarker(48.8566, 2.3522, "France");  // Paris, France
addCountryMarker(51.1657, 10.4515, "Germany");  // Berlin, Germany
addCountryMarker(41.9028, 12.4964, "Italy");  // Rome, Italy
addCountryMarker(31.9466, -7.5095, "Morocco");  // Marrakesh, Morocco
addCountryMarker(38.7169, -9.1395, "Portugal");  // Lisbon, Portugal
addCountryMarker(56.4907, -4.2026, "Scotland");  // Edinburgh, Scotland
addCountryMarker(-33.9249, 18.4241, "South Africa");  // Cape Town, South Africa
addCountryMarker(40.4637, -3.7492, "Spain");  // Madrid, Spain
addCountryMarker(40.7128, -74.0060, "United States");  // New York, USA


