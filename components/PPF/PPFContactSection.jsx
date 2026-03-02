"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function PPFContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "ppf",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in Name, Email, and Mobile Number.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...formData }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", mobile: "", service: "ppf", message: "" });
        toast.success("Message sent! We'll reach out to you soon.");
      } else {
        setStatus("error");
        const json = await res.json().catch(() => ({}));
        const msg = json.details?.sms || json.details?.whatsapp || json.error || "Something went wrong. Please try again.";
        toast.error(msg);
      }
    } catch (err) {
      setStatus("error");
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#0A0A0C]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/ppf/contact-bg.png" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/75 to-[#0A0A0C]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px]">
        {/* Centered title */}
        <h2 className="text-[48px] font-bold font-oswald text-white uppercase leading-[1.1] text-center mb-10">
          Let&apos;s Get in Touch!
        </h2>

        {/* Form card — full width */}
        <div className="bg-[#0F1B32]/50 border border-white/8 rounded-2xl p-8 lg:p-10">
          <h3 className="text-[18px] font-semibold font-oswald text-white uppercase tracking-[0.05em] mb-8 text-center">
            Share your details and we&apos;ll reach out promptly
          </h3>

          <div className="space-y-5">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] text-[#a9a9a9] font-medium mb-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-[#0A0A0C] border border-white/10 rounded-xl text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#00BFFF]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[13px] text-[#a9a9a9] font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="abc@xyz.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-[#0A0A0C] border border-white/10 rounded-xl text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#00BFFF]/50 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Mobile + Service */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] text-[#a9a9a9] font-medium mb-2 block">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+06 1234 56787 00"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-[#0A0A0C] border border-white/10 rounded-xl text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#00BFFF]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[13px] text-[#a9a9a9] font-medium mb-2 block">
                  Which Job will you applied for?
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-[#0A0A0C] border border-white/10 rounded-xl text-[14px] text-white focus:outline-none focus:border-[#00BFFF]/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="tint">Tint</option>
                    <option value="coating">Coating</option>
                    <option value="ppf">PPF</option>
                    <option value="wrapping">Wrapping</option>
                    <option value="combo">Combo</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5L7 9L11 5" stroke="#a9a9a9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Message — full width */}
            <div>
              <label className="text-[13px] text-[#a9a9a9] font-medium mb-2 block">
                message (Optional)
              </label>
              <textarea
                name="message"
                placeholder="Type here your message..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-5 py-3.5 bg-[#0A0A0C] border border-white/10 rounded-xl text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#00BFFF]/50 transition-colors resize-none"
              />
            </div>

            {/* Row 4: Send Now — full width */}
            <div className="pt-2">
              <div className="relative inline-block w-full">
                <div className="absolute inset-0 bg-[#ffc711]/20 blur-[35px] rounded-full scale-105 pointer-events-none" />
                <div className="relative bg-gradient-to-r from-[#d4af37] to-[#ffebb1] rounded-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-[60px] h-full bg-[#fdebaa]/50 transform skew-x-12 translate-x-2 pointer-events-none" />
                  <button onClick={handleSubmit} disabled={status === "loading"} className="relative w-full py-4 text-[20px] font-semibold font-oswald text-[#010101] uppercase tracking-[0.1em] hover:brightness-105 transition-filter disabled:opacity-70">
                    Send Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
