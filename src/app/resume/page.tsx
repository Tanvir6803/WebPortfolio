"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt, FaDownload } from "react-icons/fa";

export default function ResumePage() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
  }, []);

  const pdfPath = "/Tanvir_Singh_Resume.pdf";
  const viewerParams = "#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width";
  const src = `${pdfPath}${viewerParams}`;

  return (
    <section className="py-2 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Resume</h1>

        {/* Actions - Mobile */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 md:mt-0">
          <a
            href={pdfPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
            aria-label="Open resume in a new tab"
          >
            <FaExternalLinkAlt />
            <span>Open in new tab</span>
          </a>

          {/* Hide download for IOS */}
          {!isIOS && (
            <a
              href={pdfPath}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              aria-label="Download resume PDF"
            >
              <FaDownload />
              <span>Download</span>
            </a>
          )}
        </div>
      </div>

      {/* Mobile helper text */}
      <p className="md:hidden mt-2 text-center text-sm text-white/80">
        For best quality, tap “Open in new tab”.
      </p>

      {/* Mobile image preview */}
      <div className="mt-3 md:hidden">
        <div className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/20">
          <Image
            src="/resume_preview.jpg"
            alt="Resume preview"
            width={1200}
            height={1700}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Desktop PDF embed*/}
      <div className="mt-6 rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/20 hidden md:block">
        <object data={src} type="application/pdf" className="w-full h-screen">
          <iframe
            src={src}
            className="w-full h-[85vh] sm:h-[90vh] border-0"
            title="Tanvir Singh Resume PDF"
          />
          <div className="p-6 text-center text-white/90">
            <p className="mb-3">
              Your browser can’t display PDFs inline. You can open or download it instead:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                <FaExternalLinkAlt />
                <span>Open in new tab</span>
              </a>
              <a
                href={pdfPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                <FaDownload />
                <span>Download</span>
              </a>
            </div>
          </div>
        </object>
      </div>
    </section>
  );
}