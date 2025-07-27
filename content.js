function main() {
  console.log(clientEmail);
  let cnt = 1;
  const instagramReelRegex =
    /^https?:\/\/(www\.)?instagram\.com\/reels\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
  let prevUrl = "start";
  window.navigation.addEventListener("navigate", (event) => {
    const curUrl = window.location.href;
    if (prevUrl != curUrl && instagramReelRegex.test(curUrl)) {
      console.log(curUrl + "reel -> " + cnt++);
      prevUrl = curUrl;
    }
  });
}

main();