// Remove the token from the local storage
function removeToken() {
  localStorage.removeItem("token");
}

// Set the token in the local storage
function setToken(token) {
  localStorage.setItem("token", token);
}

// Get the token from the local storage
function getToken() {
  return localStorage.getItem("token");
}

// Check if the token is present in the localStorage
function checkAuthentication() {
  const token = getToken();
  if (!token) {
    // Redirect to the login page if the token does not exist
    window.location.href = "login.html";
  }
}

// Export the functions
export { getToken, setToken, removeToken, checkAuthentication };
