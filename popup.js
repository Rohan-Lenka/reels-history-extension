async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function setClientEmail(tab, email) {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (email) => {
      window.localStorage.setItem("reels-history-extension-client-email", email);
    },
    args: [email]
  });
}

const button = document.getElementById("submit-button");
const input = document.getElementById("email-input");
const existingEmailDiv = document.getElementById("existing-email-div");
const clientEmail = window.localStorage.getItem("reels-history-extension-client-email");

if (clientEmail != null) {
  button.innerText = "Change email";
  input.placeholder = "Enter new email";
  existingEmailDiv.innerText = `Email in use: ${clientEmail}`;
}

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const currentTab = await getCurrentTab();
  if (currentTab.url !== "https://www.instagram.com/") {
    alert("Please open the extension in instagram.com and then register your email");
    return;
  }
  const email = input.value.trim();
  if (email === "") {
    window.alert("Please enter your email");
    return;
  }
  await setClientEmail(currentTab, email);
  window.localStorage.setItem("reels-history-extension-client-email", email);
  input.value = "";
  existingEmailDiv.innerText = `Email in use: ${email}`;
});
