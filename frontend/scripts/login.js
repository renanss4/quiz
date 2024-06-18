import { getToken } from "./configs/tokenManager.js";
import { loginFetch } from "./configs/fetch.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const incorrect = document.getElementById("error");

// Function to remove the error message when the user types in the input
function removeError() {
  email.addEventListener("input", () => {
    incorrect.style.display = "none";
    email.style.border = "1px solid #ccc";
    password.style.border = "1px solid #ccc";
  });

  password.addEventListener("input", () => {
    incorrect.style.display = "none";
    email.style.border = "1px solid #ccc";
    password.style.border = "1px solid #ccc";
  });
}

// Function to validate the fields
function validateFields() {
  if (email.value.trim() === "" || password.value.trim() === "") {
    incorrect.style.display = "block";
    email.style.border = "1px solid red";
    password.style.border = "1px solid red";
    return false;
  }
  if (!(email.value.includes("@") || !isNaN(email.value))) {
    incorrect.style.display = "block";
    email.style.border = "1px solid red";
    password.style.border = "1px solid red";
    return false;
  }
  return true;
}

// Logic for button "entrar"
loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Call the validateFields function
  if (!validateFields()) {
    return;
  }

  try {
    const data = await loginFetch(email.value, password.value);
    if (data) {
      getToken(data.token);
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    if (error.message === "User invalid!") {
      incorrect.style.display = "block";
      incorrect.innerText = "Usuário inválido!";
    } else if (error.message === "User not found!") {
      incorrect.style.display = "block";
      incorrect.innerText = "Usuário não cadastrado!";
    } else {
      console.error(`Error: ${error}`);
    }

    // window.location.href = pagina de não encontrado ou algum problema aconteceu
  }
});

// Call the removeError function to set up the event listeners for input fields
removeError();