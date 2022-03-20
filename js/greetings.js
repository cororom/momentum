const mainContainer = document.querySelector(".main-content");
const loginContainer = document.querySelector(".login-container");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const logoutBtn = document.querySelector(".logout");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function saveUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

function logoutSubmit() {
  localStorage.removeItem(USERNAME_KEY);
  greeting.textContent = "";
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  }
  loginContainer.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event) {
  event.preventDefault();
  loginContainer.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  saveUsername(username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.textContent = `Hello, ${username}`;
  loginContainer.classList.add(HIDDEN_CLASSNAME);
  mainContainer.classList.remove(HIDDEN_CLASSNAME);
  loginInput.value = "";
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername !== null) {
  paintGreetings(savedUsername);
}

loginForm.addEventListener("submit", onLoginSubmit);
logoutBtn.addEventListener("click", logoutSubmit);
