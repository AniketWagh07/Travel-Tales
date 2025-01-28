let is_loggedIn = false; // Tracks if a user is logged in
let userName = ""; // Stores the name of the logged-in user

const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );

    if (errors.length === 0) {
      e.preventDefault();
      // Save user data to local storage after signup
      const userData = {
        firstname: firstname_input.value,
        email: email_input.value,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Update logged-in status
      is_loggedIn = true;
      sessionStorage.setItem("is_loggedIn", is_loggedIn);
      sessionStorage.setItem("userName", userData.firstname);
      userName = userData.firstname;

      // alert("Signup successful! User info stored in local storage.");
      // displayLoggedInMessage();
      redirectToHome();
    }
  } else {
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length === 0) {
      e.preventDefault();
      // Check if user data matches local storage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email_input.value) {
        // Update logged-in status
        is_loggedIn = true;
        sessionStorage.setItem("is_loggedIn", is_loggedIn);
        userName = storedUser.firstname;
        sessionStorage.setItem("userName", userName);

        // alert(`Login successful! Welcome back, ${userName}.`);
        // displayLoggedInMessage();
        redirectToHome();
      } else {
        errors.push("Invalid email or password.");
      }
    }
  }

  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

// Function to redirect to home page
function redirectToHome() {
  console.log("Redirect called");
  window.location.href = "../Home_Parallax/main.html";
}

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

// Function to display logged-in message
function displayLoggedInMessage() {
  if (is_loggedIn) {
    console.log(`User ${userName} is logged in.`);
    // Example: Display a message on the webpage
    const welcomeMessage = document.createElement("p");
    welcomeMessage.innerText = `Welcome, ${userName}!`;
    document.body.appendChild(welcomeMessage);
  }
}
