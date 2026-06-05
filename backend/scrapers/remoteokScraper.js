const puppeteer = require("puppeteer");
const db = require("../config/db");

const scrapeRemoteOK = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    // Fake real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    );

    await page.goto("https://remoteok.com/remote-dev-jobs", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Wait properly
    await page.waitForSelector("tr.job", {
      timeout: 30000,
    });

    const jobs = await page.evaluate(() => {
      const rows = document.querySelectorAll("tr.job");

      return Array.from(rows)
        .slice(0, 10)
        .map((job) => {
          const title =
            job.querySelector("h2")?.innerText?.trim() || "No title";

          const company =
            job.querySelector("h3")?.innerText?.trim() || "No company";

          const location =
            job.querySelector(".location")?.innerText?.trim() || "Remote";

          const link =
            "https://remoteok.com" + (job.getAttribute("data-href") || "");

          return {
            title,
            company,
            location,
            link,
          };
        });
    });

    console.log("✅ Jobs scraped:", jobs.length);

    // Save jobs
    jobs.forEach((job) => {
      db.query(
        `
        INSERT IGNORE INTO jobs
        (title, company, location, job_link, source)
        VALUES (?, ?, ?, ?, ?)
        `,
        [job.title, job.company, job.location, job.link, "RemoteOK"],
        (err) => {
          if (err) {
            console.log("DB Error:", err.message);
          }
        },
      );
    });

    console.log("✅ Jobs saved");
  } catch (err) {
    console.log("❌ Scraper Error:", err.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeRemoteOK;
