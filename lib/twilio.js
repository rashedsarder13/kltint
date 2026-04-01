import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS via Twilio
 * @param {string} phoneNumber - Recipient phone number (e.g., +601234567890)
 * @param {string} message - Message content
 * @returns {Promise<{success: boolean, sid?: string, error?: string}>}
 */
export async function sendSMS(phoneNumber, message) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn("[sendSMS] Twilio credentials not configured");
    return { success: false, error: "Twilio credentials not configured" };
  }

  if (!process.env.TWILIO_PHONE_NUMBER) {
    console.warn("[sendSMS] TWILIO_PHONE_NUMBER not set");
    return { success: false, error: "Twilio phone number not configured" };
  }

  if (!phoneNumber || !message) {
    console.warn("[sendSMS] Missing phone number or message");
    return { success: false, error: "Missing phone number or message" };
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log("[sendSMS] Sent successfully", {
      to: phoneNumber,
      sid: result.sid,
      status: result.status,
    });

    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("[sendSMS] Failed to send", {
      to: phoneNumber,
      error: error.message,
    });

    return { success: false, error: error.message };
  }
}

/**
 * Send WhatsApp message via Twilio
 * @param {string} phoneNumber - Recipient phone number (e.g., +601234567890)
 * @param {string} message - Message content
 * @returns {Promise<{success: boolean, sid?: string, error?: string}>}
 */
export async function sendWhatsApp(phoneNumber, message) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn("[sendWhatsApp] Twilio credentials not configured");
    return { success: false, error: "Twilio credentials not configured" };
  }

  if (!process.env.TWILIO_WHATSAPP_FROM) {
    console.warn("[sendWhatsApp] TWILIO_WHATSAPP_FROM not set");
    return { success: false, error: "Twilio WhatsApp number not configured" };
  }

  if (!phoneNumber || !message) {
    console.warn("[sendWhatsApp] Missing phone number or message");
    return { success: false, error: "Missing phone number or message" };
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${phoneNumber}`,
    });

    console.log("[sendWhatsApp] Sent successfully", {
      to: phoneNumber,
      sid: result.sid,
      status: result.status,
    });

    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("[sendWhatsApp] Failed to send", {
      to: phoneNumber,
      error: error.message,
    });

    return { success: false, error: error.message };
  }
}
