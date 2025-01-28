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

/*=============== GSAP ANIMATION ===============*/
gsap.from(".home_img_2", 1.2, { opacity: 0, y: 200, delay: 0.1 });
gsap.from(".home_img_3", 1.2, { opacity: 0, y: 200, delay: 0.5 });
gsap.from(".home_data", 1.2, { opacity: 0, y: -60, delay: 1 });
gsap.from(".home_bird_1", 1.2, { opacity: 0, y: -80, delay: 1.1 });
gsap.from(".home_bird_2", 1.2, { opacity: 0, y: 80, delay: 1.2 });
gsap.from(".home_img_1", 1.2, { opacity: 0, y: 200, delay: 1.2 });
gsap.from(".home_img_4", 1.2, { opacity: 0, y: 200, delay: 1.3 });

// Show Scroll Up
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll_up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show_scroll")
    : scrollUp.classList.remove("show_scroll");
};
window.addEventListener("scroll", scrollUp);

// Scroll Section Active Link
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav_menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active_link");
    } else {
      sectionClass.classList.remove("active_link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

// navigator.geolocation.watchPosition(res => console.log(res))
