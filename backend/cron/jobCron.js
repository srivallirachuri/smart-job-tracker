const cron = require("node-cron");

const scrapeRemoteOK = require("../scrapers/remoteokScraper");

cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running scraper...");

  await scrapeRemoteOK();

  console.log("✅ Scraping complete");
});
