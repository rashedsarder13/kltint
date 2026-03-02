"use client";

export default function TermsContent() {
  return (
    <section className="relative py-24 bg-[#0A0A0C] overflow-hidden min-h-screen mb-4">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#032EBD]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Title */}
        <div className="mb-12 text-center mt-10">
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
              Terms & Conditions
            </h1>
          </div>
          <p className="text-[#A9A9A9] text-lg max-w-3xl mx-auto">
            By accessing our website or using our services, you agree to the
            following Terms & Conditions. Please read them carefully.
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
              1. Services Offered
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              KL Tint Studio provides automotive services, including:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Window tinting</li>
              <li>Ceramic / graphene coating</li>
              <li>Paint Protection Film (PPF)</li>
              <li>Vehicle wrapping</li>
              <li>Combo protection packages</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              Service details, pricing, and warranties may vary by package and
              branch.
            </p>
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
              2. Appointments & Bookings
            </h2>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Appointments are subject to availability</li>
              <li>Booking confirmation may require a deposit</li>
              <li>
                Late arrival may result in rescheduling or extended service time
              </li>
              <li>Walk-ins are accepted but not guaranteed</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              KL Tint Studio reserves the right to refuse service if vehicle's
              condition is unsafe or unsuitable.
            </p>
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
              3. Pricing & Payments
            </h2>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>All prices are displayed in Malaysian Ringgit (RM)</li>
              <li>Prices may change without prior notice</li>
              <li>Promotional prices are time-limited</li>
              <li>
                Payment options may include cash, card, and installment plans
              </li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              Full payment must be completed before vehicle release unless
              otherwise agreed.
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
              4. Warranty & Coverage
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              Warranty terms vary depending on service type:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Tint: bubble, peeling, performance coverage</li>
              <li>Coating: gloss, hydrophobic performance (as per package)</li>
              <li>PPF & wrapping: material and installation defects</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4 mb-2">Warranty does not cover:</p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Accidents, misuse, or abuse</li>
              <li>Improper washing or maintenance</li>
              <li>Natural wear and tear</li>
              <li>Third-party modifications</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              Warranty claims must be supported by proof of service.
            </p>
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
              5. Vehicle Condition & Liability
            </h2>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Customers must disclose existing damage before service</li>
              <li>
                KL Tint Studio is not responsible for pre-existing defects
              </li>
              <li>Personal belongings should be removed before service</li>
              <li>
                We are not liable for delays caused by weather, power issues, or
                unforeseen circumstances
              </li>
            </ul>
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
              6. Cancellations & Refunds
            </h2>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>
                Deposits are non-refundable once service preparation begins
              </li>
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>
                Refunds, if applicable, are subject to management approval
              </li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              Custom services (PPF, wraps, special films) are non-refundable
              once materials are prepared.
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
              7. Intellectual Property
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              All website content, including:
            </p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Text</li>
              <li>Images</li>
              <li>Videos</li>
              <li>Logos and branding</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              are the property of KL Tint Studio and may not be copied or used
              without written permission.
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
              8. User Conduct
            </h2>
            <p className="text-[#A9A9A9] mb-4">Users agree not to:</p>
            <ul className="list-disc pl-6 text-[#A9A9A9] space-y-2">
              <li>Misuse of website content</li>
              <li>Submit false information</li>
              <li>Attempt unauthorized access</li>
              <li>Disrupt website functionality</li>
            </ul>
            <p className="text-[#A9A9A9] mt-4">
              Violation may result in legal action.
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
              9. Governing Law
            </h2>
            <p className="text-[#A9A9A9]">
              These Terms & Conditions are governed by the laws of Malaysia. Any
              disputes shall be resolved under Malaysian jurisdiction.
            </p>
          </div>

          {/* Section 10 */}
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
              10. Changes to Terms
            </h2>
            <p className="text-[#A9A9A9]">
              KL Tint Studio reserves the right to modify these Terms &
              Conditions at any time. Continued use of our website or services
              indicates acceptance of updated terms.
            </p>
          </div>

          {/* Section 11 */}
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
              11. Contact Information
            </h2>
            <p className="text-[#A9A9A9] mb-4">
              For questions regarding these Terms:
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
