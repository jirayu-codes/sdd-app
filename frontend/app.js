// Papoi walking skeleton: when the button is clicked, fetch the backend /
// health endpoint and show the server's response on the page.

const button = document.getElementById("health-button");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.textContent = "Asking the backend...";
  try {
    const response = await fetch("/health");
    const data = await response.json();
    result.textContent = data.message;
  } catch (error) {
    result.textContent = "Could not reach the backend: " + error;
  }
});
