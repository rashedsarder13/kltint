"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const BRANCHES = [
  "Kota Damansara",
  "Maluri Cheras",
  "Setia Alam",
  "Puchong",
];

export default function BookingModal({
  isOpen,
  onClose,
  packageData,
  onContinue,
  service = "tint",
}) {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    time: "",
    message: "",
    name: "",
    email: "",
    mobile: "",
    carModel: "",
    carPlate: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const minDate = useMemo(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    if (!formData.location || !formData.date) {
      setAvailableSlots([]);
      return;
    }

    const controller = new AbortController();

    async function loadSlots() {
      setLoadingSlots(true);
      setFormData((prev) => ({ ...prev, time: "" }));
      try {
        const params = new URLSearchParams({
          branch: formData.location,
          date: formData.date,
          service,
        });
        const response = await fetch(`/api/appointments/slots?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setAvailableSlots(data.slots || []);
      } catch {
        if (!controller.signal.aborted) {
          setAvailableSlots([]);
          toast.error("Unable to load slot availability.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingSlots(false);
        }
      }
    }

    loadSlots();
    return () => controller.abort();
  }, [formData.location, formData.date, service]);

  const handleContinue = () => {
    if (
      !formData.location ||
      !formData.date ||
      !formData.time ||
      !formData.name ||
      !formData.email ||
      !formData.mobile
    ) {
      toast.error("Please complete location, date, time and contact details.");
      return;
    }

    onContinue(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-3xl p-8 md:p-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5 text-gray-400"
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

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side - Summary & Booking Details */}
          <div>
            {/* Summary Section */}
            <h2 className="text-3xl font-bold text-[#d4af37] mb-6">Summary</h2>
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Package:</span>
                <span className="text-white font-semibold uppercase">
                  {packageData.name}
                </span>
              </div>

              {/* Price */}
              {packageData.price && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Price:</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-white font-bold">
                      RM {packageData.price}
                    </span>
                    {packageData.original && (
                      <span className="text-gray-500 line-through">
                        {packageData.original}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Key features grid */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {packageData.uv && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">UV</span>
                    <span className="text-white font-semibold">
                      {packageData.uv}
                    </span>
                  </div>
                )}
                {packageData.irr && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">IRR</span>
                    <span className="text-white font-semibold">
                      {packageData.irr}
                    </span>
                  </div>
                )}
                {packageData.film && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Film</span>
                    <span className="text-white font-semibold">
                      {packageData.film}
                    </span>
                  </div>
                )}
                {packageData.tech && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Technology</span>
                    <span className="text-white font-semibold">
                      {packageData.tech}
                    </span>
                  </div>
                )}
                {packageData.warranty && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Warranty</span>
                    <span className="text-white font-semibold">
                      {packageData.warranty}
                    </span>
                  </div>
                )}
              </div>

              {/* legacy/extra fields (area/tpu/gloss) */}
              {packageData.area && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-gray-400">Area:</span>
                  <span className="text-white">{packageData.area}</span>
                </div>
              )}
              {packageData.tpu && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">TIP:</span>
                  <span className="text-white">{packageData.tpu}</span>
                </div>
              )}
              {packageData.gloss && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Gloss:</span>
                  <span className="text-white">{packageData.gloss}</span>
                </div>
              )}
            </div>

            {/* Locations */}
            <h3 className="text-xl font-bold text-[#d4af37] mb-3">Locations</h3>
            <div className="mb-6">
              <div className="relative">
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="">Select The Locations</option>
                  {BRANCHES.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#d4af37] mb-3">Date</h3>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate}
                    className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#d4af37] mb-3">Time</h3>
                <div className="relative">
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.location || !formData.date || loadingSlots}
                    className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">
                      {loadingSlots ? "Loading slots..." : "Select available time"}
                    </option>
                    {availableSlots.map((slot) => (
                      <option
                        key={slot.id}
                        value={slot.label}
                        disabled={!slot.available}
                      >
                        {slot.label} {!slot.available ? "(Booked)" : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Slot availability is managed by selected branch and date.
                </p>
              </div>
            </div>

            {/* Message Box */}
            <h3 className="text-xl font-bold text-[#d4af37] mb-3">
              Your Message (Optional)
            </h3>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type Your Message Here..."
              rows={4}
              className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37] resize-none"
            />
          </div>

          {/* Right Side - Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#d4af37] mb-6">
              Contact Information
            </h2>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Type Here"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Abc@Xyz.Com"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-white mb-2">Mobile Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="+06"
                    disabled
                    className="w-16 bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-3 text-center"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="1234 56787 00"
                    className="flex-1 bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Car Model */}
              <div>
                <label className="block text-white mb-2">Your Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  placeholder="XX Xxxxxxxx"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Car Plate Number */}
              <div>
                <label className="block text-white mb-2">
                  Your Car Plate Number
                </label>
                <input
                  type="text"
                  name="carPlate"
                  value={formData.carPlate}
                  onChange={handleChange}
                  placeholder="XX Xxxxxxxx"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="w-full mt-6 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f5d0ab] transform transition-transform group-hover:scale-105" />
                <div className="absolute top-0 right-0 w-32 h-full bg-black/20 transform skew-x-[-20deg] translate-x-8" />
                <div className="absolute top-1/2 right-8 -translate-y-1/2 flex gap-1">
                  <div className="w-8 h-0.5 bg-black/30 transform -rotate-45 origin-right" />
                  <div className="w-8 h-0.5 bg-black/30" />
                  <div className="w-8 h-0.5 bg-black/30 transform rotate-45 origin-left" />
                </div>
                <span className="relative block text-black font-bold text-lg py-4 tracking-wide">
                  Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
