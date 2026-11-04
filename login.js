// Login
const form = document.getElementById("login-form");

function checkEmail(email) {
  return email.includes("@") && email.includes(".");
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("login-message");
  const emailError = document.getElementById("login-email-error");
  const passwordError = document.getElementById("login-password-error");

  emailError.textContent = "";
  passwordError.textContent = "";
  message.hidden = false;

  let valid = true;

  if (email === "") {
    emailError.textContent = "Enter your email.";
    valid = false;
  } else if (!checkEmail(email)) {
    emailError.textContent = "Enter a valid email.";
    valid = false;
  }

  if (password.length < 8) {
    passwordError.textContent = "Password must have at least 8 characters.";
    valid = false;
  }

  if (!valid) {
    message.textContent = "Please check the form.";
    return;
  }

  // Check Saved @
  try {
    const savedText = localStorage.getItem("beyondSightUser");

    if (savedText === null) {
      message.textContent = "No account found. Please register first.";
      return;
    }

    const savedUser = JSON.parse(savedText);

    if (savedUser.email.toLowerCase() === email.toLowerCase()) {
      message.textContent = "Login successful. Welcome, " + savedUser.fullName + "!";
    } else {
      message.textContent = "No matching account found. Register first.";
    }
  } catch (error) {
    message.textContent = "Could not read the saved account. Please register again.";
  }
});
