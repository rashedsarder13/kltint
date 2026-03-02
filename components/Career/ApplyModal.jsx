"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApplyModal({ isOpen, onClose, job, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    job: job || "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "career", ...formData }),
      });
    } catch {
      // Silently fail — still proceed with onSubmit
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-3xl bg-[#111111] rounded-2xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition"
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-2">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type Here"
              className="w-full bg-[#1b1b1b] text-white border border-gray-700 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Abc@Xyz.Com"
              className="w-full bg-[#1b1b1b] text-white border border-gray-700 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Mobile Number</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="0123456789"
              className="w-full bg-[#1b1b1b] text-white border border-gray-700 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">
              Which Job Will You Applied For?
            </label>
            <select
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="w-full bg-[#1b1b1b] text-white border border-gray-700 rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Tint">Tint</option>
              <option value="Coating">Coating</option>
              <option value="PPF">PPF</option>
              <option value="Wrapping">Wrapping</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-white/80 mb-2">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Type Here Your Message..."
              className="w-full bg-[#1b1b1b] text-white border border-gray-700 rounded-lg px-3 py-2 resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="relative group overflow-hidden"
            style={{ width: 420 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f5d0ab] transform transition-transform group-hover:scale-105 rounded-md" />
            <div className="absolute top-0 right-0 w-32 h-full bg-black/20 transform skew-x-[-20deg] translate-x-8 rounded-md" />
            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex gap-1">
              <div className="w-8 h-0.5 bg-black/30 transform -rotate-45 origin-right" />
              <div className="w-8 h-0.5 bg-black/30" />
              <div className="w-8 h-0.5 bg-black/30 transform rotate-45 origin-left" />
            </div>
            <span className="relative block text-black font-bold text-lg py-4 tracking-wide text-center">
              Send Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
