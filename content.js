function getClientEmail() {
  return window.localStorage.getItem("reels-history-extension-client-email");
}

function Now() {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, "0");
  return formattedNow = {
    date: `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`,
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`
  };
}

function main() {
  const clientEmail = getClientEmail();
  if (clientEmail == null) {
    alert(
      "Email Not Registered\n\nTo view your Instagram Reels history, please register your email using the extension first.\n\nOpen the extension, enter your email, and regsiter it to continue."
    );
    return;
  }
  const instagramReelRegex = /^https?:\/\/(www\.)?instagram\.com\/reels\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
  let previousUrl = "start";
  window.navigation.addEventListener("navigate", async (event) => {
    try {
      const currentUrl = window.location.href;
      if (previousUrl != currentUrl && instagramReelRegex.test(currentUrl)) {
        const now = Now();
        await fetch("https://reels-history.vercel.app/api/reel", {
          method: "POST",
          body: JSON.stringify({
            email: clientEmail,
            reelUrl: currentUrl,
            date: now.date,
            time: now.time,
          }),
        });
        previousUrl = currentUrl;
      }
    } catch (error) {
      console.error(error);
    }
  });
}

main();