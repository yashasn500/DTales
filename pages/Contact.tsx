import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredDate: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSuccessMsg(null);
    setErrorMsg(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        "service_ckx3lf6",
        "template_8ibb1c8",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          preferred_date: formData.preferredDate,
          message: formData.message,
        },
        "T-0FLg8SvqJCRaClP"
      );

      setSuccessMsg("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        preferredDate: "",
        message: "",
      });
    } catch (_err) {
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 pt-28 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's work together
          </h1>
          <p className="text-gray-400 text-lg">
            Interested in working together? Please fill out the form below to book a free consultation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          className="p-8 sm:p-10 rounded-2xl shadow-xl"
        >
          {successMsg && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 text-center">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0020BF] focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0020BF] focus:border-transparent transition-all"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0020BF] focus:border-transparent transition-all"
            />

            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0020BF] focus:border-transparent transition-all"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0020BF] focus:border-transparent transition-all resize-none"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#0020BF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0A2CFF] transition-all hover:shadow-lg hover:shadow-[#0020BF]/20 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
