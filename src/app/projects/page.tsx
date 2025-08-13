"use client";

import React from "react";
import Image from "next/image";

type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  title: string;
  subtitle?: string;
  images: ProjectImage[];
  body: string;
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "3D LiDAR Scanner",
    subtitle: "Custom ToF + stepper platform • C/C++ · Python",
    images: [
      { src: "/Lidar1.jpg", alt: "Custom 360° LiDAR device hardware" },
      { src: "/Lidar2.jpg", alt: "LiDAR scan visualization lines plot" },
    ],
    body:
      "Built a 360° LiDAR device using a VL53L1X ToF sensor and 28BYJ-48 stepper motor. " +
      "Programmed motion control, data capture, and UART serial streaming in C/C++. " +
      "Processed scans and rendered 2D/3D views in Python to visualize room geometry and obstacles.",
  },
  {
    title: "Hardware Image Decompressor",
    subtitle: "Altera DE2 FPGA • Verilog · VGA",
    images: [{ src: "/projects/fpga-decompressor.jpg", alt: "FPGA board driving a VGA monitor" }],
    body:
      "Implemented a YUV image decompressor in Verilog and displayed frames in real-time over VGA. " +
      "Designed memory buffers and a streaming datapath on the DE2 board, ensuring reliable timing with no visual artifacts.",
  },
  {
    title: "Custom Pacemaker Prototype",
    subtitle: "Embedded control • Simulink · Python (Tkinter)",
    images: [
      { src: "/Pacemaker1.jpg", alt: "Pacemaker UART processing block diagram" },
      { src: "/Pacemaker2.jpg", alt: "Rate/Duty cycle conversion block" },
      { src: "/Pacemaker3.jpg", alt: "Pacing modes block and outputs" },
      { src: "/Pacemaker4.jpg", alt: "Python Tkinter GUI for pacemaker" },
    ],
    body:
      "Prototyped a pacemaker system that regulates patient heart rate via bi-directional telemetry. " +
      "Modeled control logic in Simulink and built a real-time Python GUI to monitor heart-rate data and adjust pacing modes.",
  },
  {
    title: "Blink-Controlled Car",
    subtitle: "Signal processing • Arduino · Python",
    images: [{ src: "/projects/blink-car.jpg", alt: "Small RC car controlled by blink detection" }],
    body:
      "Engineered a small vehicle that responds to users’ blink gestures. " +
      "Refined EEG signal processing to extract blink patterns and translated them into motor commands for responsive navigation.",
  },
  {
    title: "Quizler App",
    subtitle: "DeltaHacks project • React · HTML/CSS",
    images: [{ src: "/projects/quizler.jpg", alt: "Screenshot of the Quizler educational web app" }],
    body:
      "Built a collaborative education app at DeltaHacks focused on ease of use. " +
      "Designed a clean React UI that lets students join a shared room and quiz each other in real time.",
  },
];

export default function ProjectsPage() {
  const [lightbox, setLightbox] = React.useState<{
    open: boolean;
    images: ProjectImage[];
    index: number;
  }>({ open: false, images: [], index: 0 });

  const openLightbox = (images: ProjectImage[], index: number) =>
    setLightbox({ open: true, images, index });

  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));
  const prevImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));
  const nextImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));

  React.useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  return (
    <section className="py-2 pb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold">Projects</h1>

      <div className="mt-6 space-y-8">
        {projects.map((p, i) => {
          const imageFirstOnDesktop = i % 2 === 1;
          const imgCount = p.images.length;
          const gridCols = imgCount === 1 ? "grid-cols-1" : "grid-cols-2";

          return (
            <article
              key={p.title}
              className="rounded-xl ring-1 ring-white/10 bg-white/[0.03] overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Media */}
                <div
                  className={[
                    i === 0 ? "p-3 md:p-4 md:min-h-[420px]" : "p-3 md:p-4 md:min-h-[340px]",
                    imageFirstOnDesktop ? "order-none md:order-1" : "",
                  ].join(" ")}
                >
                  <div className={`grid ${gridCols} gap-3 h-full`}>
                    {p.images.map((img, idx) => (
                      <figure
                        key={img.src + idx}
                        className="relative w-full h-40 sm:h-48 md:h-60 lg:h-64 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                        onClick={() => openLightbox(p.images, idx)}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain"
                          priority={i === 0 && idx === 0}
                        />
                      </figure>
                    ))}
                  </div>
                </div>

                <div
                  className={[
                    "p-5 sm:p-6 md:p-7 flex flex-col justify-center",
                    imageFirstOnDesktop ? "order-none md:order-0" : "",
                  ].join(" ")}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold">{p.title}</h2>
                  {p.subtitle && (
                    <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                  )}
                  <p className="mt-3 text-white/90 leading-relaxed">{p.body}</p>

                  {p.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 transition"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            className="z-[70] absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/25 px-3 py-1.5 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            Close
          </button>

          <button
            aria-label="Previous image"
            className="z-[70] absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/25 px-3 py-2"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <button
            aria-label="Next image"
            className="z-[70] absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/25 px-3 py-2"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

          <div
            className="relative z-[65] max-w-[95vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={lightbox.images[lightbox.index].src}
                alt={lightbox.images[lightbox.index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}