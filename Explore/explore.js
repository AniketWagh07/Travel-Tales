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

let cards = document.getElementById("cards");
let cardsContainer = document.getElementById("container");

async function details() {
  let data = await fetch("x.json");
  let main = await data.json();
  console.log(main.places);

  // Get user's current location
  const userLocation = await getUserLocation();

  main.places.map((e) => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      e.coordinates.latitude,
      e.coordinates.longitude
    );

    cardsContainer.innerHTML += `
            <a href="../Location_details/details.html">
            <div id="${e.productId}">
            <img src="${e.imageUrl[0]}" alt="${e.name}" />
            <i class="fa-solid fa-heart"></i>
            <div class="h4">
              <h4>${e.name}</h4>
            </div>
            <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
            <p><i class="fa-solid fa-compass"></i>    <span>${distance}</span> kilometres away</p>
          </div>
          </a>
        `;
  });

  let category = document.querySelectorAll("#heading > div > h5");

  category.forEach((a) => {
    a.addEventListener("click", (x) => {
      cardsContainer.innerHTML = "";

      category.forEach((l) => {
        l.classList.remove("bgActive");
      });
      a.classList.add("bgActive");

      if (a.id == "all") {
        main.places.map((e) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            e.coordinates.latitude,
            e.coordinates.longitude
          );

          cardsContainer.innerHTML += `
                        <a href="../Location_details/details.html">
                        <div id="${e.productId}">
                        <img src="${e.imageUrl[0]}" alt="${e.name}" />
                        <i class="fa-solid fa-heart"></i>
                        <div class="h4">
                        <h4>${e.name}</h4>
                        </div>
                        <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
                        <p><i class="fa-solid fa-compass"></i>    <span>${distance}</span> kilometres away</p>
                        </div>
                    </a>
                    `;
        });
      } else {
        main.places.map((e) => {
          if (a.id == e.category) {
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              e.coordinates.latitude,
              e.coordinates.longitude
            );

            cardsContainer.innerHTML += `
                            <a href="../Location_details/details.html">
                            <div id="${e.productId}">
                            <img src="${e.imageUrl[0]}" alt="${e.name}" />
                            <i class="fa-solid fa-heart"></i>
                            <div class="h4">
                            <h4>${e.name}</h4>
                            </div>
                            <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
                            <p><i class="fa-solid fa-compass"></i>   <span>${distance}</span> kilometres away</p>
                            </div>
                        </a>
                        `;
          }
        });
      }
      resetCards();
    });
  });
}

// Function to get user's current location
async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject("Geolocation not supported");
    }
  });
}

// Function to calculate distance using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.15); // Distance in kilometers
}

window.selectedCardId = null; // Define as a global variable
window.selectedCardDistance = null;

function setupCardClickListener() {
  // console.log("function called");
  const cards = document.querySelectorAll("#container > a > div");
  console.log(cards);
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // e.preventDefault();

      const dist = document.querySelector(`#${card.id} > p > span`);
      // console.log(dist.innerHTML);

      window.selectedCardId = card.id; // Update the global variable
      window.selectedCardDistance = dist.innerHTML;
      localStorage.setItem("selectedCardId", card.id);
      localStorage.setItem("selectedCardDistance", selectedCardDistance);
      console.log(`Selected Card ID: ${window.selectedCardId}`);
    });
  });
}

async function initialize() {
  await details();
  setupCardClickListener();
}

initialize();

function resetCards() {
  //   console.log("reset done");
  setupCardClickListener();
}
