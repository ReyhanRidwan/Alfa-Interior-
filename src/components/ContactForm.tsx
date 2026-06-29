/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Sparkles, Phone, ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFocus = (field: string) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocusedFields(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Nama dan Nomor Telepon wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFocusedFields({});
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3" /> Kontak Kami
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white mb-6">
              Mulai Konsultasi <span className="font-semibold text-amber-500">Interior Mewah</span> Anda
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base mb-8">
              Kunjungi showroom kami atau diskusikan kebutuhan interior custom & furniture Anda secara digital bersama tim konsultan Alfa Interior.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wider font-mono">WhatsApp Hotline</h4>
                  <p className="text-neutral-400 text-sm mt-0.5">+62 812-3456-7890 (Chat Instan)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wider font-mono">Email Kantor</h4>
                  <p className="text-neutral-400 text-sm mt-0.5">halo@alfainterior.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right contact form column */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 md:p-10 relative">
              
              {isSubmitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pesan Berhasil Terkirim!</h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Terima kasih telah menghubungi Alfa Interior. Tim konsultan desainer kami akan menghubungi Anda kembali dalam kurun waktu maksimal 1x24 jam.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-xs font-mono font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onFocus={() => handleFocus("name")}
                      onBlur={(e) => handleBlur("name", e.target.value)}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-0 text-xs uppercase tracking-widest font-mono transition-all duration-300 pointer-events-none ${
                        focusedFields.name || formData.name 
                          ? "-top-4 text-[10px] text-amber-500" 
                          : "top-3 text-neutral-500"
                      }`}
                    >
                      Nama Lengkap *
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onFocus={() => handleFocus("phone")}
                      onBlur={(e) => handleBlur("phone", e.target.value)}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <label
                      htmlFor="phone"
                      className={`absolute left-0 text-xs uppercase tracking-widest font-mono transition-all duration-300 pointer-events-none ${
                        focusedFields.phone || formData.phone 
                          ? "-top-4 text-[10px] text-amber-500" 
                          : "top-3 text-neutral-500"
                      }`}
                    >
                      Nomor WhatsApp *
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onFocus={() => handleFocus("email")}
                      onBlur={(e) => handleBlur("email", e.target.value)}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-0 text-xs uppercase tracking-widest font-mono transition-all duration-300 pointer-events-none ${
                        focusedFields.email || formData.email 
                          ? "-top-4 text-[10px] text-amber-500" 
                          : "top-3 text-neutral-500"
                      }`}
                    >
                      Alamat Email (Opsional)
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onFocus={() => handleFocus("message")}
                      onBlur={(e) => handleBlur("message", e.target.value)}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-0 text-xs uppercase tracking-widest font-mono transition-all duration-300 pointer-events-none ${
                        focusedFields.message || formData.message 
                          ? "-top-4 text-[10px] text-amber-500" 
                          : "top-3 text-neutral-500"
                      }`}
                    >
                      Detail Kebutuhan Proyek (Opsional)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-amber-500 text-neutral-950 font-bold font-sans text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 hover:bg-amber-400 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Mengirim..." : "KIRIM PERMINTAAN KONSULTASI"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Alfa%20Interior,%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20layanan%20interior%20kustom."
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group animate-bounce print:hidden"
        title="Hubungi Kami di WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-xs font-bold font-mono tracking-wide uppercase group-hover:pr-3">
          WhatsApp Alfa
        </span>
        <Phone className="w-6 h-6 fill-white text-emerald-500" />
        {/* Glow pulsing ring around widget */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping pointer-events-none" />
      </a>
    </section>
  );
}
