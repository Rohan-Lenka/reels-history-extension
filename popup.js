const button = document.getElementById("submit-button");
const input = document.getElementById("email-input");
const existingEmailDiv = document.getElementById("existing-email-div");
const clientEmail = window.localStorage.getItem("client-email");

if (clientEmail != null) {
  button.innerText = "Change email";
  input.placeholder = "Enter new email";
  existingEmailDiv.innerText = `Email in use: ${clientEmail}`;
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  const email = input.value.trim();
  if (email === "") {
    window.alert("Please enter your email");
    return;
  }
  chrome.storage.local.set({ key: email }).then(() => {
    console.log("Value is set");
  });
  window.localStorage.setItem("client-email", email);
  input.value = "";
  existingEmailDiv.innerText = email;
});
