const { onSchedule } = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

/**
 * Firebase Scheduler replacement for Vercel cron.
 * Runs every 10 minutes and calls the existing Next.js reminder endpoint.
 */
exports.sendAppointmentReminders = onSchedule(
  {
    schedule: "every 10 minutes",
    timeZone: "Asia/Kuala_Lumpur",
    region: "asia-southeast1",
    memory: "256MiB",
  },
  async () => {
    const config = functions.config();
    const baseUrl = config.reminder?.baseurl;
    const token = config.cron?.secret;

    if (!baseUrl) {
      logger.error("Missing REMINDER_BASE_URL environment variable");
      return;
    }
    if (!token) {
      logger.error("Missing CRON_SECRET environment variable");
      return;
    }

    const url = `${baseUrl.replace(/\/$/, "")}/api/cron/reminders`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bodyText = await response.text();
      let body;
      try {
        body = JSON.parse(bodyText);
      } catch {
        body = { raw: bodyText };
      }

      if (!response.ok) {
        logger.error("Reminder endpoint failed", {
          status: response.status,
          body,
        });
        return;
      }

      logger.info("Reminder scheduler completed", {
        status: response.status,
        body,
      });
    } catch (error) {
      logger.error("Reminder scheduler request error", {
        message: error?.message,
      });
    }
  }
);
