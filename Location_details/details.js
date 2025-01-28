// Check login state from sessionStorage
const is_loggedIn = sessionStorage.getItem("is_loggedIn") === "true";
const userName = sessionStorage.getItem("userName");

const loginButton = document.getElementById("login_button");
const signupButton = document.getElementById("signup_button");

if (is_loggedIn) {
  // User is logged in, update buttons
  loginButton.textContent = userName;
  loginButton.href = "#"; // Optionally link to user profile or dashboard
  loginButton.classList.add("nav_button_user"); // Add a class for styling if needed

  signupButton.textContent = "Logout";
  signupButton.href = "#";
  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Clear sessionStorage and reload
    sessionStorage.clear();
    alert("You have logged out.");
    location.reload();
  });
} else {
  // User is not logged in, default behavior
  loginButton.textContent = "Login";
  loginButton.href = "../Login_SignUp/login.html"; // Redirect to login page

  signupButton.textContent = "SignUp";
  signupButton.href = "../Login_SignUp/signup.html"; // Redirect to signup page
}

//---------------------------------------------------------------
const selectedCardId = localStorage.getItem("selectedCardId"); // Retrieve from localStorage
const selectedCardDistance = localStorage.getItem("selectedCardDistance");
// const selectedCardId = "PL001";
console.log(selectedCardId);

if (selectedCardId) {
  console.log(`Selected Card ID retrieved: ${selectedCardId}`);
} else {
  console.log("No card ID selected yet.");
}

var image_list = document.getElementsByClassName("list");
var desc = document.getElementById("details");
// console.log(desc);

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav_menu");
const navToggle = document.getElementById("nav_toggle");
const navClose = document.getElementById("nav_close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show_menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show_menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav_link");

const linkAction = () => {
  const navMenu = document.getElementById("nav_menu");
  navMenu.classList.remove("show_menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg_header")
    : header.classList.remove("bg_header");
};
window.addEventListener("scroll", bgHeader);

// Fetching data form JSON
async function details() {
  let data = await fetch("../Explore/x.json");
  let main = await data.json();
  let loc_name = document.getElementById("loc_name");

  main.places.map((e) => {
    if (e.productId == selectedCardId) {
      console.log(e.imageUrl);
      loc_name.innerText = e.name;

      e.imageUrl.map((i) => {
        console.log(i);

        if (image_list.length > 0) {
          image_list[0].innerHTML += `
                    <div class="item" style="background-image: url(${i});">
                        <div class="content">
                        </div>
                    </div>
                    `;
        } else {
          console.error("No elements found with the class 'list'.");
        }
      });

      //   console.log(e.description);
      desc.innerHTML += `
                      <div class="description">
                          <p>
                          <span>${selectedCardDistance}km Away</span>
                          ${e.description}
                          </p>
                      </div>
                      <div class="guide">
                          <h3>Travel Guide</h3>
                          <p>
                          ${e.howToReach}
                          </p>
                      </div>
                      `;
    }
  });
}

function animation() {
  var nextBtn = document.querySelector(".next"),
    prevBtn = document.querySelector(".prev"),
    carousel = document.querySelector(".carousel"),
    list = document.querySelector(".list"),
    item = document.querySelectorAll(".item"),
    runningTime = document.querySelector(".carousel .timeRunning");

  let timeRunning = 3000;
  let timeAutoNext = 7000;

  nextBtn.onclick = function () {
    showSlider("next");
  };

  prevBtn.onclick = function () {
    showSlider("prev");
  };

  let runTimeOut;

  let runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  function resetTimeAnimation() {
    runningTime.style.animation = "none";
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = "runningTime 7s linear 1 forwards";
  }

  function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll(".carousel .list .item");
    if (type === "next") {
      list.appendChild(sliderItemsDom[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carousel.classList.add("prev");
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
  }

  // Start the initial animation
  resetTimeAnimation();
}

// animation();

let currentIndex = 0;
const reviewsByLocation = {};

function updateSlider(location) {
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = "";

  const reviews = reviewsByLocation[location] || [];
  reviews.forEach((review) => {
    const reviewCard = document.createElement("li");
    reviewCard.classList.add("review-card");
    reviewCard.innerHTML = `<h4>${review.name}</h4><p>${review.text}</p>`;
    reviewsList.appendChild(reviewCard);
  });

  currentIndex = 0;
  updateSlidePosition();
}

function updateSlidePosition() {
  const slider = document.querySelector(".slider .reviews");
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  const reviews = document.querySelectorAll(".slider .review-card");
  if (currentIndex < reviews.length - 1) {
    currentIndex++;
    updateSlidePosition();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
}

function submitReview() {
  const location = document.getElementById("location").value.trim();
  const name = document.getElementById("name").value.trim();
  const reviewText = document.getElementById("review").value.trim();

  if (location && name && reviewText) {
    if (!reviewsByLocation[location]) {
      reviewsByLocation[location] = [];
    }

    reviewsByLocation[location].push({ name, text: reviewText });
    updateSlider(location);

    document.getElementById("location").value = "";
    document.getElementById("name").value = "";
    document.getElementById("review").value = "";
  } else {
    alert("Please fill out all fields before submitting.");
  }
}

async function initializer() {
  await details();
  animation();
}

initializer();
