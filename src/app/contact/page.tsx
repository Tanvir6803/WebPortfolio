// app/contact/page.tsx
import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="py-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold">Contact</h1>

      <div className="mt-6 flex flex-col items-center text-center space-y-6">
        <p className="max-w-3xl text-base sm:text-lg text-white/90">
          For any inquiries, please contact me through my email or phone number below!
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <a
            href="tel:+16475426310"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Call 647-542-6310"
          >
            <FaPhone className="opacity-90 group-hover:opacity-100" />
            <span className="underline underline-offset-4">647-542-6310</span>
          </a>

          <a
            href="mailto:tanvirsingh6803@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Email tanvirsingh6803@gmail.com"
          >
            <FaEnvelope className="opacity-90 group-hover:opacity-100" />
            <span className="underline underline-offset-4 truncate max-w-[60vw] sm:max-w-none">
              tanvirsingh6803@gmail.com
            </span>
          </a>

          <a
            href="https://linkedin.com/in/singht52"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="opacity-90 group-hover:opacity-100" />
            <span className="underline underline-offset-4">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Tanvir6803"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="GitHub profile"
          >
            <FaGithub className="opacity-90 group-hover:opacity-100" />
            <span className="underline underline-offset-4">GitHub</span>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-white/10" />
    </section>
  );
}