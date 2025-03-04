 // Modal functions
 function openModal() {
  document.getElementById("registerModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("registerModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");
  const images = document.querySelectorAll(".image");
  const imageContainer = document.querySelector(".image-container");
  const heroSection = document.querySelector(".hero-section");
  const navbar = document.querySelector(".navbar");
  const logoContainer = document.querySelector(".logo-container");
  const eventsSection = document.querySelector(".events-section");
  const timelineSection = document.querySelector(".timeline-section");
  const sponsorsSection = document.querySelector(".sponsors-section");

  // Fade out preloader after typing completes
  setTimeout(() => {
    preloader.style.animation = "fadeOutPreloader 1.5s ease-out forwards";
  }, 3500);

  // Start image animations after preloader
  setTimeout(() => {
    imageContainer.style.opacity = "1";
    images.forEach((img, index) => {
      const delay = index * 0.3 + 0.5;
      img.style.opacity = "1";
      img.style.transition = `transform 1s ease-out ${delay}s, opacity 1s ${delay}s`;
      img.style.transform = "scale(1) translateY(0) rotate(0)";
      // Exit animation for each image
      setTimeout(() => {
        const exitX = Math.random() > 0.5 ? "-100vw" : "100vw";
        const exitY = Math.random() > 0.5 ? "-100vh" : "100vh";
        const exitAngle = Math.random() > 0.5 ? "-30deg" : "30deg";
        img.style.transition = "transform 2s ease-in, opacity 2s";
        img.style.transform = `translate(${exitX}, ${exitY}) rotate(${exitAngle}) scale(1)`;
        img.style.opacity = "0";
      }, 4000 + delay * 1000);
    });

    // Reveal sections after image animations (8 seconds)
    setTimeout(() => {
      heroSection.style.opacity = "1";
      navbar.style.opacity = "1";
      logoContainer.style.opacity = "1";
      logoContainer.style.transform = "scale(1)";
      eventsSection.style.opacity = "1";
      timelineSection.style.opacity = "1";
      sponsorsSection.style.opacity = "1";
      // Restore vertical scrolling (keep horizontal hidden)
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
      // Initialize Intersection Observer for timeline items
      const timelineItems = document.querySelectorAll('.timeline-item');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      timelineItems.forEach(item => observer.observe(item));
    }, 8000);
  }, 3800);

  // Timer Code
  const countdownDate = new Date("Mar 15, 2025 23:59:59").getTime();
  const timerElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = countdownDate - now;
    if (diff < 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    timerElements.days.textContent = days;
    timerElements.hours.textContent = hours;
    timerElements.minutes.textContent = minutes;
    timerElements.seconds.textContent = seconds;
  };

  setInterval(updateTimer, 1000);
  updateTimer();
});