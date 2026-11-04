// Reg
const form = document.getElementById("register-form");

function showError(id, text) {
  document.getElementById(id).textContent = text;
}

function checkEmail(email) {
  // The email should contain @ and a dot.
  return email.includes("@") && email.includes(".");
}

function getAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();

  // Age
  return today.getFullYear() - birthDate.getFullYear();
}

function validateForm() {
  let valid = true;

  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const birthday = document.getElementById("birthday").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const topic = document.getElementById("topic").value;
  const consent = document.getElementById("consent").checked;

  // Check required fields one by one.
  if (name === "") {
    showError("name-error", "Enter your full name.");
    valid = false;
  } else {
    showError("name-error", "");
  }

  if (email === "") {
    showError("email-error", "Enter your email.");
    valid = false;
  } else if (!checkEmail(email)) {
    showError("email-error", "Enter a valid email address.");
    valid = false;
  } else {
    showError("email-error", "");
  }

  if (birthday === "") {
    showError("birthday-error", "Choose your birthday.");
    valid = false;
  } else if (getAge(birthday) < 13) {
    showError("birthday-error", "You must be at least 13 years old.");
    valid = false;
  } else {
    showError("birthday-error", "");
  }
  // Password validation: at least 8 characters, uppercase, lowercase, and a number.
  if (password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)) {
    showError("password-error", "Use 8+ characters, uppercase, lowercase and a number.");
    valid = false;
  } else {
    showError("password-error", "");
  }

  if (confirmPassword === "") {
    showError("confirm-error", "Confirm your password.");
    valid = false;
  } else if (password !== confirmPassword) {
    showError("confirm-error", "Passwords do not match.");
    valid = false;
  } else {
    showError("confirm-error", "");
  }

  if (topic === "") {
    showError("topic-error", "Choose a favorite topic.");
    valid = false;
  } else {
    showError("topic-error", "");
  }

  if (!consent) {
    showError("consent-error", "Please agree to the privacy terms.");
    valid = false;
  } else {
    showError("consent-error", "");
  }

  return valid;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const message = document.getElementById("register-message");
  message.hidden = false;

  if (!validateForm()) {
    message.textContent = "Please correct the fields marked above.";
    return;
  }
  // Далее идёт сохранение данных

  // Save basic details. No save password.
  const user = {
    fullName: document.getElementById("full-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    topic: document.getElementById("topic").value
  };

  try {
    localStorage.setItem("beyondSightUser", JSON.stringify(user));
    message.textContent = "Registration successful! You can now try Login.";
    form.reset();
  } catch (error) {
    message.textContent = "Could not save your details in this browser.";
  }
});
