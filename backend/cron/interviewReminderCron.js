const cron = require("node-cron");
const db = require("../config/db");
const { sendEmail } = require("../services/emailService");

console.log("✅ Interview Reminder Cron Loaded");

// TEST MODE: runs every minute
cron.schedule("* * * * *", () => {
  console.log("🔍 Checking upcoming interviews...");

  const sql = `
    SELECT
      aj.id,
      aj.interview_date,
      j.title,
      j.company,
      u.email
    FROM applied_jobs aj

    JOIN jobs j
      ON aj.job_id = j.id

    JOIN users u
      ON aj.user_id = u.id

WHERE aj.interview_date IS NOT NULL
AND aj.reminder_sent = FALSE
AND aj.interview_date BETWEEN NOW()
AND DATE_ADD(NOW(), INTERVAL 24 HOUR)
  `;

  db.query(sql, async (err, interviews) => {
    if (err) {
      console.log("❌ Query Error:", err);
      return;
    }
    console.log(`📋 Found ${interviews.length} upcoming interview(s)`);

    for (const interview of interviews) {
      try {
        const subject = "Interview Reminder";

        const message = `
Hello,

You have an upcoming interview.

Company: ${interview.company}

Role: ${interview.title}

Interview Date:
${new Date(interview.interview_date).toLocaleString()}

Good Luck!
`;

        console.log(`📧 Sending reminder to ${interview.email}`);

        await sendEmail(interview.email, subject, message);
        db.query(
          `
  UPDATE applied_jobs
  SET reminder_sent = TRUE
  WHERE id = ?
  `,
          [interview.id],
        );

        console.log(`✅ Reminder sent to ${interview.email}`);
      } catch (error) {
        console.log("❌ Email Error:", error.message);
      }
    }
  });
});
