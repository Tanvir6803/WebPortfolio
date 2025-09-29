"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function ExperiencePage() {
  const droneImages = useMemo(
    () => [
      { src: "/DroneWebsite1.jpg", alt: "Drone Website — Home", caption: "Drone Website — Home" },
      { src: "/DroneWebsite2.jpg", alt: "Drone Website — About Us", caption: "Drone Website — About Us" },
      { src: "/DroneTool.jpg",     alt: "Drone Tracking Dashboard", caption: "Drone Tracking Dashboard" },
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = useCallback((i: number) => {
    setIdx(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + droneImages.length) % droneImages.length),
    [droneImages.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % droneImages.length),
    [droneImages.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  return (
    <section className="py-2 pb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold">Experience</h1>

      <div className="mt-6 space-y-10">
        {/* Veoneer */}
        <article>
          <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Software Quality Engineering Intern{" "}
              <span className="italic text-blue-400">— Veoneer Canada Safety Systems</span>
            </h2>
            <span className="text-sm text-white/70">May 2024 – August 2025</span>
          </header>

          <div className="mt-1 text-sm text-white/70">Markham, Ontario, Canada</div>

          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-white/90">
            <li>
              Built internal tools & dashboards using <strong>Python</strong>, <strong>C#</strong>,{" "}
              <strong>Java</strong>, <strong>React</strong>, <strong>Power BI</strong> and REST APIs to track quality across{" "}
              <strong>10+ subsystems</strong>.
            </li>
            <li>
              Automated reporting with <strong>Python</strong>, <strong>C#</strong>, and{" "}
              <strong>Power Automate</strong>, cutting cycle time by ~40%.
            </li>
            <li>
              Supported hardware testing by analyzing, modifying, and validating ECU and satellite circuit boards.
            </li>
          </ul>
        </article>

        {/* Alphavima */}
        <article>
          <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Software Engineer Intern{" "}
              <span className="italic text-blue-400">— Alphavima Technologies</span>
            </h2>
            <span className="text-sm text-white/70">May 2023 – August 2023</span>
          </header>

          <div className="mt-1 text-sm text-white/70">Mississauga, Ontario, Canada</div>

          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-white/90">
            <li>
              Built a mobile app (<strong>Java</strong> backend, <strong>React</strong> UI/UX) for internal tool Givelife365.
            </li>
            <li>
              Improved frontend features using <strong>Angular</strong>, <strong>TypeScript</strong>, and{" "}
              <strong>CSS</strong> to enhance usability.
            </li>
            <li>Managed CRM/ERP databases to keep analytics and reporting accurate.</li>
          </ul>
        </article>

        {/* Drone Club */}
        <article>
          <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Software Application Developer{" "}
              <span className="italic text-blue-400">— McMaster Aerial Robotics & Drones Team</span>
            </h2>
            <span className="text-sm text-white/70">January 2025 – Present</span>
          </header>

          <div className="mt-1 text-sm text-white/70">Hamilton, Ontario, Canada</div>

          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-white/90">
            <li>
              Programmed autonomous navigation, obstacle detection, and waypoint tracking (
              <strong>Python</strong>, <strong>C++</strong>) with ~95% accuracy in simulation.
            </li>
            <li>
              Built a full-stack drone tracking dashboard with <strong>React</strong>, <strong>Next.js</strong>,{" "}
              <strong>PostgreSQL</strong>, <strong>REST APIs</strong>, and <strong>Docker</strong>.
            </li>
            <li>
              Deployed a mobile-friendly public site using <strong>React</strong>, <strong>Vercel</strong>, and{" "}
              <strong>AWS</strong>.
            </li>
          </ul>
        </article>

        {/* Drone pics */}
        <section aria-labelledby="drone-photos">
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image 1 */}
            <div>
              <figure
                className="relative w-full h-40 sm:h-48 md:h-60 lg:h-64 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                onClick={() => openAt(0)}
                role="button"
                aria-label={`Open image ${droneImages[0].caption}`}
              >
                <Image
                  src={droneImages[0].src}
                  alt={droneImages[0].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </figure>
              <div className="mt-2 px-3 text-xs text-white/70 text-center">{droneImages[0].caption}</div>
            </div>

            {/* Image 2 */}
            <div>
              <figure
                className="relative w-full h-40 sm:h-48 md:h-60 lg:h-64 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                onClick={() => openAt(1)}
                role="button"
                aria-label={`Open image ${droneImages[1].caption}`}
              >
                <Image
                  src={droneImages[1].src}
                  alt={droneImages[1].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </figure>
              <div className="mt-2 px-3 text-xs text-white/70 text-center">{droneImages[1].caption}</div>
            </div>

            {/* Image 3 */}
            <div className="sm:col-span-2 flex justify-center">
              <div className="w-full max-w-[720px]">
                <figure
                  className="relative w-full h-40 sm:h-48 md:h-60 lg:h-64 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                  onClick={() => openAt(2)}
                  role="button"
                  aria-label={`Open image ${droneImages[2].caption}`}
                >
                  <Image
                    src={droneImages[2].src}
                    alt={droneImages[2].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </figure>
                <div className="mt-2 px-3 text-xs text-white/70 text-center">{droneImages[2].caption}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          {/* Close */}
        <button
          aria-label="Close"
          className="z-[70] absolute top-4 right-4 sm:top-6 sm:right-6 
                    rounded-full bg-black/50 text-white px-3 py-1.5 text-sm font-semibold 
                    shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          Close
        </button>

        {/* Previous */}
        <button
          aria-label="Previous image"
          className="z-[70] absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 
                    rounded-full bg-black/50 text-white px-4 py-3 text-lg font-semibold 
                    shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          ‹
        </button>

        {/* Next */}
        <button
          aria-label="Next image"
          className="z-[70] absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 
                    rounded-full bg-black/50 text-white px-4 py-3 text-lg font-semibold 
                    shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          ›
        </button>

          <div
            className="relative z-[65] max-w-[95vw] max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={droneImages[idx].src}
                alt={droneImages[idx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-white/80 text-sm">{droneImages[idx].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}