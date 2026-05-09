import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiLinkedin, FiFacebook, FiYoutube } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import PartnerSection from "../components/home/PartnerSection";
import * as api from "../services/api.js";

const FALLBACK_FAQS = [
  { q: "How can I make a donation?", a: "You can donate via bKash, bank transfer, or international wire. Contact us at zm.arif.eee@gmail.com and we'll send you detailed payment instructions and a receipt." },
  { q: "Can I volunteer with Alor Foundation?", a: "Absolutely! We welcome volunteers for field work, digital marketing, fundraising, and professional services. Fill out the contact form above and mention your skills and availability." },
  { q: "How is donated money used?", a: "100% of donations go directly to program costs. Our operational costs are covered by a separate endowment fund. Every BDT is tracked and reported in our annual transparency report." },
  { q: "Do you accept in-kind donations?", a: "Yes — school supplies, medical equipment, clean water kits, and food are all welcome. Please contact us before shipping so we can coordinate delivery to the right field site." },
  { q: "How can my organization partner with you?", a: "We are open to partnerships with NGOs, corporations, and government bodies. Please email our partnerships team at zm.arif.eee@gmail.com with your proposal." },
];

const contactInfo = [
  { icon: <FiMapPin />, label: "Address", value: "Sector #12, Uttara, Dhaka 1230, Bangladesh" },
  { icon: <FiPhone />, label: "Phone", value: "+880 1717 509975", href: "tel:01717509975" },
  { icon: <FiMail />, label: "Email", value: "zm.arif.eee@gmail.com", href: "mailto:zm.arif.eee@gmail.com" },
];

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [faqs, setFaqs]             = useState(FALLBACK_FAQS);
  const [openFaq, setOpenFaq]       = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [formError, setFormError]   = useState("");
  const [newsEmail, setNewsEmail]   = useState("");
  const [newsStatus, setNewsStatus] = useState(null);

  useEffect(() => {
    api.getFAQs().then(d => {
      if (d.data?.length > 0) {
        setFaqs(d.data.map(f => ({ q: f.question, a: f.answer })));
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      await api.submitContact(form);
      setSubmitted(true);
    } catch {
      setFormError("Failed to send message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsStatus("loading");
    try {
      await api.subscribeNewsletter(newsEmail);
      setNewsStatus("ok");
      setNewsEmail("");
    } catch {
      setNewsStatus("err");
    }
  };

  return (
    <PageTransition>
      {/* Page Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-950 to-emerald-950 pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <motion.div className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-teal-900/50 border border-teal-700/40 text-teal-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight mb-5">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Alor Foundation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you want to donate, volunteer, partner, or simply learn more — we'd love to hear from you. Our team responds within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* Contact Form + Info */}
      <section className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Contact Info */}
          <motion.div className="lg:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Reach Us
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4">
                We're Here to Help
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our team is available Monday–Friday, 9 AM – 6 PM (BST). For urgent humanitarian matters, email us at any time.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }} viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white border border-emerald-100 rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold tracking-wide mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-gray-700 font-semibold text-sm hover:text-teal-600 transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-gray-700 font-semibold text-sm">{c.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: <FiLinkedin />, href: "https://www.linkedin.com/", label: "LinkedIn" },
                  { icon: <FiFacebook />, href: "https://www.facebook.com/", label: "Facebook" },
                  { icon: <FiYoutube />, href: "https://www.youtube.com/", label: "YouTube" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl border border-teal-200 bg-white flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:shadow-md transition-all text-base">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter inline */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-600 tracking-widest uppercase mb-3">Newsletter</p>
              {newsStatus === "ok" ? (
                <p className="text-teal-600 font-semibold text-sm">✅ Subscribed! Thank you.</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <button
                    type="submit"
                    disabled={newsStatus === "loading"}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-bold rounded-lg disabled:opacity-60 transition">
                    {newsStatus === "loading" ? "…" : <FiArrowRight />}
                  </button>
                </form>
              )}
              {newsStatus === "err" && <p className="text-red-500 text-xs mt-2">Failed. Please try again.</p>}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-emerald-100 shadow-md h-52">
              <iframe
                title="Alor Foundation Location"
                src="https://www.google.com/maps?q=Sector+12,+Uttara,+Dhaka,+Bangladesh&output=embed"
                className="w-full h-full"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="bg-white border border-emerald-100 rounded-2xl shadow-lg p-8 sm:p-10">
              {submitted ? (
                <motion.div className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">Send Us a Message</h3>
                  <p className="text-gray-400 text-sm mb-7">Fill in the form and we'll get back to you within 24 hours.</p>
                  {formError && (
                    <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                      {formError}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Your Name *</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Rahim Uddin"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Email Address *</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Subject *</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition bg-white">
                        <option value="">Select a subject...</option>
                        <option>I want to donate</option>
                        <option>I want to volunteer</option>
                        <option>Partnership inquiry</option>
                        <option>Media / Press</option>
                        <option>General question</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Your Message *</label>
                      <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help you or how you'd like to help us..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none" />
                    </div>
                    <motion.button type="submit"
                      disabled={submitting}
                      className="relative overflow-hidden w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black rounded-xl shadow-lg shadow-teal-500/25 btn-shimmer flex items-center justify-center gap-2 text-base disabled:opacity-70"
                      whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: submitting ? 1 : 0.98 }}>
                      <FiSend /> {submitting ? "Sending…" : "Send Message"}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#050f0a] py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }} viewport={{ once: true }}
                className="bg-white/5 border border-teal-900/50 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-white font-bold text-sm leading-snug">{f.q}</span>
                  {openFaq === i ? <FiChevronUp className="text-teal-400 flex-shrink-0" /> : <FiChevronDown className="text-gray-500 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners + CTA */}
      <PartnerSection />
    </PageTransition>
  );
}
