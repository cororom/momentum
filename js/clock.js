const time = document.querySelector("h2.clock__time");
const fullDate = document.querySelector("h4.clock__date");

function getClock() {
  const date = new Date();
  let hours = date.getHours();
  const ampm = (date.getHours() > 12) ? "PM" : "AM";
  hours = hours % 12;
  hours = (hours !== 0) ? hours : 12;
  hours = String(hours).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  time.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  fullDate.textContent = date.toDateString();
}

getClock();
setInterval(getClock, 1000);