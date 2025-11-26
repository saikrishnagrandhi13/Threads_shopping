import { createHeader } from '../components/header.js';
import { createFooter } from '../components/footer.js';

// Initialize the app
function initApp() {
  // Load header
  const headerContainer = document.querySelector('#header-container');
  if (headerContainer) {
    headerContainer.innerHTML = createHeader();
  }

  // Load footer
  const footerContainer = document.querySelector('#footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = createFooter();
  }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// BANNER SLIDES

const bannerSlides = [
  {
      title: "New Collection",
      subtitle: "Discover the latest in contemporary fashion",
      cta: "Shop Now",
      image: "images/new_arrival.jpg"
  },
  {
      title: "Summer Essentials",
      subtitle: "Perfect pieces for the warm season",
      cta: "Explore",
      image: "images/summer_essentials.jpg"
  },
  {
      title: "Timeless Style",
      subtitle: "Classic designs reimagined for today",
      cta: "Discover",
      image: "images/timeless_styles.jpg"
  }
];

let currentSlide = 0;
let autoSlideInterval;

function renderBannerSlides() {
  const container = document.querySelector(".banner-slides");

  container.innerHTML = bannerSlides
      .map(
          slide => `
          <div class="banner-slide" 
              style="background-image:
                  linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                  url('${slide.image}');
              ">
              <div class="banner-content">
                  <h2>${slide.title}</h2>
                  <p>${slide.subtitle}</p>
                  <a href="#" class="banner-cta">${slide.cta}</a>
              </div>
          </div>
      `
      )
      .join("");

  initCarousel();
}

function initCarousel() {
  const slidesContainer = document.querySelector(".banner-slides");
  const totalSlides = bannerSlides.length;

  function moveToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
          moveToSlide(currentSlide + 1);
      }, 4000);
  }

  function restartAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
  }

  // Arrow Controls
  document.querySelector(".left-arrow").addEventListener("click", () => {
      moveToSlide(currentSlide - 1);
      restartAutoSlide();
  });

  document.querySelector(".right-arrow").addEventListener("click", () => {
      moveToSlide(currentSlide + 1);
      restartAutoSlide();
  });

  startAutoSlide();
}

// NEW ARRIVALS PRODUCTS=
const newArrivalProducts = [
  { name: "Relaxed Shirt", price: "$159", image: "images/relaxed_shirt.png" },
  { name: "Relaxed T-shirt", price: "$69", image: "images/relaxed_tshirt.png" },
  { name: "Trousers", price: "$229", image: "images/trousers.png" },
  { name: "Linen Pants", price: "$129", image: "images/trousers_linen.webp" }
];

function renderNewArrivals() {
  const container = document.querySelector(".products-grid");

  container.innerHTML = newArrivalProducts
      .map(
          product => `
      <div class="product-card">
          <div class="product-image padded">
              <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">${product.price}</p>
          </div>
      </div>
  `
      )
      .join("");
}

const categories = [
  {
      title: "Womenswear",
      link: "women.html",
      image: "images/womens_wear.webp",
      cssClass: "womenswear-card"
  },
  {
      title: "Menswear",
      link: "men.html",
      image: "images/menswear.webp",
      cssClass: "menswear-card"
  }
];

function renderCategories() {
  const container = document.querySelector(".category-container");

  container.innerHTML = categories
      .map(
          cat => `
      <div class="category-card ${cat.cssClass}">
          <div class="category-image">
              <img src="${cat.image}" alt="${cat.title}">
          </div>
          <div class="category-overlay">
              <h2 class="category-title">${cat.title}</h2>
              <a href="${cat.link}" class="category-link">Shop ${cat.title.split('wear')[0]}</a>
          </div>
      </div>
  `
      )
      .join("");
}

// SAFE PAGE-SPECIFIC INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {

  // Run banner only if element exists
  const bannerEl = document.querySelector(".banner-slides");
  if (bannerEl) {
      renderBannerSlides();
  }

  // Run new arrivals only if element exists
  const newArrivalsEl = document.querySelector(".products-grid");
  if (newArrivalsEl) {
      renderNewArrivals();
  }

  // Run categories only if element exists
  const categoriesEl = document.querySelector(".category-container");
  if (categoriesEl) {
      renderCategories();
  }

});