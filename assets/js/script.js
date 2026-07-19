'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const preloader = document.getElementById("preloader");

if (preloader) {
  window.addEventListener("load", function () {
    preloader.classList.add("hidden");
    setTimeout(function () {
      preloader.remove();
    }, 60000);
  });
}

const bgVideo = document.querySelector("video.back");

if (bgVideo) {
  bgVideo.muted = true;
  bgVideo.setAttribute("playsinline", "");
  bgVideo.setAttribute("webkit-playsinline", "true");

  const tryPlayBgVideo = function () {
    const playPromise = bgVideo.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(function () {
        // Mobile browsers may block autoplay until the first interaction.
      });
    }
  };

  tryPlayBgVideo();
  window.addEventListener("touchstart", tryPlayBgVideo, { once: true });
  window.addEventListener("click", tryPlayBgVideo, { once: true });
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// The legacy certificate modal is optional. Keep the rest of the site functional
// when the portfolio uses simple recognition cards instead of modal certificates.
if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const testimonialAvatar = this.querySelector("[data-testimonials-avatar]");

      modalImg.src = testimonialAvatar.src;
      modalImg.alt = testimonialAvatar.alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}


// certificate carousel controls
const credentialCarousel = document.querySelector("[data-credential-carousel]");
const credentialPrevious = document.querySelector("[data-credential-prev]");
const credentialNext = document.querySelector("[data-credential-next]");

if (credentialCarousel && credentialPrevious && credentialNext) {
  const updateCredentialControls = function () {
    const maxScroll = credentialCarousel.scrollWidth - credentialCarousel.clientWidth;

    credentialPrevious.disabled = credentialCarousel.scrollLeft <= 4;
    credentialNext.disabled = credentialCarousel.scrollLeft >= maxScroll - 4;
  }

  const scrollCredentials = function (direction) {
    credentialCarousel.scrollBy({
      left: direction * Math.min(credentialCarousel.clientWidth * 0.86, 420),
      behavior: "smooth"
    });
  }

  credentialPrevious.addEventListener("click", function () { scrollCredentials(-1); });
  credentialNext.addEventListener("click", function () { scrollCredentials(1); });
  credentialCarousel.addEventListener("scroll", updateCredentialControls, { passive: true });
  window.addEventListener("resize", updateCredentialControls);
  requestAnimationFrame(updateCredentialControls);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

