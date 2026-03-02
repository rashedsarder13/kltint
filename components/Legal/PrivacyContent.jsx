"use client";

export default function PrivacyContent() {
  return (
    <section className="relative py-24 bg-[#0A0A0C] overflow-hidden min-h-screen mb-4">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#032EBD]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Title */}
        <div className="mb-12 mt-10 text-center">
          <div
            className="inline-block relative"
            style={{
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "50px",
                background: "#032EBD",
                borderRadius: "50%",
                filter: "blur(40px)",
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            <h1
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "72px",
                letterSpacing: "0.24px",
                textTransform: "uppercase",
                background:
                  "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              Privacy Policy
            </h1>
          </div>
          <p className="text-[#A9A9A9] text-lg max-w-3xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how KL
            Tint Studio collects, uses, and protects your personal information.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              1. Information We Collect
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>
                <strong className="text-white">Personal Information:</strong>{" "}
                Name, phone number, email, address
              </li>
              <li>
                <strong className="text-white">Vehicle Information:</strong> Car
                brand, model, license plate (for service purposes)
              </li>
              <li>
                <strong className="text-white">Payment Information:</strong>{" "}
                Payment method preferences, transaction records
              </li>
              <li>
                <strong className="text-white">Technical Data:</strong> IP
                address, browser type, device info, cookies
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              2. How We Use Your Information
            </h2>
            <p className="text-[#A9A9A9] mb-4">Your information is used to:</p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Process bookings and service requests</li>
              <li>Manage appointments and scheduling</li>
              <li>Send confirmation messages, reminders, and updates</li>
              <li>Improve website functionality</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Respond to inquiries and provide customer support</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              3. Data Protection
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              We implement security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Secure payment gateways</li>
              <li>Encrypted data transmission (SSL)</li>
              <li>Access restrictions to authorized personnel</li>
              <li>Regular security audits</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              However, no system is 100% secure. We cannot guarantee absolute
              security of transmitted data.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              4. Sharing of Your Information
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>
                <strong className="text-white">Service Providers:</strong>{" "}
                Payment processors, shipping services, marketing platforms
              </li>
              <li>
                <strong className="text-white">Legal Authorities:</strong> If
                required by law
              </li>
              <li>
                <strong className="text-white">Business Partners:</strong> For
                promotional campaigns (with your consent)
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              5. Cookies and Tracking
            </h2>
            <p className="text-[#A9A9A9] mb-4">Our website uses cookies to:</p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Improve user experience</li>
              <li>Analyze website traffic (Google Analytics)</li>
              <li>Personalize content</li>
              <li>Enable social media integration</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              You can disable cookies via your browser settings, but this may
              affect website functionality.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              6. Your Rights
            </h2>
            <p className="text-[#A9A9A9] mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              To exercise your rights, contact us via the information provided
              below.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              7. Third-Party Links
            </h2>
            <p className="text-[#A9A9A9]">
              Our website may contain links to third-party sites (e.g., payment
              gateways, social media). We are not responsible for their privacy
              practices. Please review their policies before sharing
              information.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              8. Changes to This Policy
            </h2>
            <p className="text-[#A9A9A9]">
              We may update this Privacy Policy from time to time. The latest
              version will always be posted on this page. Continued use of our
              website indicates acceptance of updated terms.
            </p>
          </div>

          {/* Section 9 */}
          <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-2xl p-8">
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "40px",
                background:
                  "linear-gradient(90.29deg, #9E8976 -48.84%, #F6D0AB 33.9%, #C99B70 74.48%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
              }}
            >
              9. Contact Us
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact:
            </p>
            <div className="text-[#A9A9A9] space-y-2">
              <p className="font-semibold text-white">KL Tint Studio</p>
              <p>📧 Email: info@kltintstudio.com</p>
              <p>📞 Phone/WhatsApp: +60 16 755 4178</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          h1 {
            font-size: 32px !important;
            line-height: 42px !important;
          }

          h2 {
            font-size: 22px !important;
            line-height: 32px !important;
          }

          .bg-[#1a1a1a]\\/40 {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
