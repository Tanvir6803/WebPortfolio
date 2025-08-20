"use client";

import React from "react";
import Image from "next/image";

type ProjectImage = { src: string; alt: string };
type DetailsRenderer = (
  openLightbox: (images: ProjectImage[], index: number) => void
) => React.ReactNode;

type Project = {
  title: string;
  subtitle?: string;
  images: ProjectImage[];
  body: string;
  links?: { label: string; href: string }[];
  details?: DetailsRenderer;
};

const projects: Project[] = [
  {
    //* Lidar Project *//
    title: "3D LiDAR Scanner",
    subtitle: "Custom ToF + stepper platform • C/C++ · Python",
    images: [
      { src: "/Lidar1.jpg", alt: "Custom 360° LiDAR device setup" },
      { src: "/Lidar2.jpg", alt: "Example LiDAR scan output" },
    ],
    body:
      "Built a 360° LiDAR device using a VL53L1X ToF sensor and 28BYJ-48 stepper motor. " +
      "Programmed motion control, data capture, and UART serial streaming in C/C++. " +
      "Processed scans and rendered 2D/3D views in Python to visualize room geometry and obstacles.",
    details: (openLightbox) => {
      const blockAndTable: ProjectImage[] = [
        { src: "/ExtraLidar1.jpg", alt: "Figure 1 — LiDAR system block / data flow diagram" },
        { src: "/ExtraLidar2.jpg", alt: "Figure 2 — Device characteristics table" },
      ];
      const schematic: ProjectImage[] = [{ src: "/ExtraLidar3.jpg", alt: "Figure 3 — LiDAR circuit schematic" }];
      const flows: ProjectImage[] = [
        { src: "/ExtraLidar4.jpg", alt: "Figure 4 — Programming logic flowchart 1" },
        { src: "/ExtraLidar5.jpg", alt: "Figure 5 — Programming logic flowchart 2" },
      ];

      return (
        <div className="mt-5 space-y-6 text-white/90">
          {/* (1) Device Overview) */}
          <section>
            <h3 className="text-lg font-semibold">(1) Device Overview</h3>

            <h4 className="mt-3 text-base font-semibold">(a) Features</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Enclosed single-package device (cardboard), approx. <strong>30&nbsp;cm × 15&nbsp;cm</strong>.</li>
              <li>Main capability: scans a 3D area to output a <strong>spatial reconstruction</strong>.</li>
              <li>One push button (breadboard) to start/finish; on-board MCU button to reset.</li>
              <li>
                ToF sensor <strong>VL53L1X</strong>, full <strong>360°</strong> with <strong>16</strong> measurements per
                revolution; range up to <strong>400&nbsp;cm</strong>, up to <strong>50&nbsp;Hz</strong>; <strong>I²C</strong> + <strong>UART</strong>.
              </li>
              <li>Generates navigable 3D models (Python/Open3D).</li>
              <li>Open source: firmware in <strong>C/C++ (Keil)</strong>, host in <strong>Python (Jupyter)</strong>.</li>
              <li>
                MCU: <strong>MSP432E401Y</strong> @ <strong>80&nbsp;MHz</strong> (from 120&nbsp;MHz); <strong>3–5&nbsp;V</strong>; <strong>1024&nbsp;KB Flash</strong>, <strong>256&nbsp;KB SRAM</strong>; UART ~<strong>7.5&nbsp;Mbps</strong>.
              </li>
              <li>Approx. system cost (without MCU): <strong>$60 CAD</strong>.</li>
            </ul>

            <h4 className="mt-4 text-base font-semibold">(b) General Description</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Integrated embedded system: ToF sensor provides distances; stepper performs 360° sweep; Python renders 3D model.</li>
              <li>Digital I/O: push-button start, LED activity, measurement logging; coordinates derived (YZ/XYZ) from ToF.</li>
              <li>
                Data path: transduction → conditioning/ADC → MCU → <strong>UART (byte-wise)</strong> to PC → Python/Open3D visualisation; host runs in polling mode and records to file.
              </li>
            </ul>

            {/* Block diagram + device table */}
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {blockAndTable.map((img, idx) => (
                <div key={img.src}>
                  <figure
                    className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                    onClick={() => openLightbox(blockAndTable, idx)}
                    role="button"
                    aria-label={img.alt}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain" />
                  </figure>
                  <div className="mt-2 px-3 text-xs text-white/70 text-center">{img.alt}</div>
                </div>
              ))}
            </div>
          </section>

          {/* (2) Detailed Description */}
          <section>
            <h3 className="text-lg font-semibold">(2) Detailed Description</h3>
            <h4 className="mt-3 text-base font-semibold">(a) Distance Measurement)</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>ToF sensor: <strong>3415-POLOLU VL53L1X</strong>; one emitter + one receiver measure time-of-flight → distance.</li>
              <li>Wiring: <strong>VIN</strong>=3.3&nbsp;V, <strong>GND</strong>=0&nbsp;V; <strong>SDA/SCL → PB2/PB3</strong> for I²C; vendor API used for setup, ranging, and data access.</li>
              <li>Stepper: <strong>MOT-28BYJ48</strong>, <strong>IN1..IN4 → PH0..PH3</strong>; powered 5&nbsp;V/GND. Full-step sequence drives rotation.</li>
              <li>Motion cadence: <strong>250&nbsp;ms</strong> per state; <strong>16</strong> samples per 360° ⇒ <strong>22.5°</strong>/sample. Data sent over <strong>COM6</strong>.</li>
              <li>Host visualisation: Python <strong>Open3D</strong> builds point cloud, connects neighbours/sets, adds per-set bounding boxes; fully rotatable 3D view.</li>
              <li>Firmware: PLL 80&nbsp;MHz; I²C (sensor), UART (PC), GPIO (stepper+button), polling every <strong>10&nbsp;ms</strong>.</li>
              <li>Loop: read distance → store → rotate <strong>22.5°</strong> → UART transmit → repeat for 16 samples.</li>
            </ul>
          </section>

          {/* (3) Circuit schematic */}
          <section>
            <h3 className="text-lg font-semibold">(3) Circuit Schematic</h3>
            <div className="mt-3 flex justify-center">
              <div className="w-full max-w-[720px]">
                <figure
                  className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                  onClick={() => openLightbox(schematic, 0)}
                  role="button"
                  aria-label={schematic[0].alt}
                >
                  <Image src={schematic[0].src} alt={schematic[0].alt} fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain" />
                </figure>
                <div className="mt-2 px-3 text-xs text-white/70 text-center">{schematic[0].alt}</div>
              </div>
            </div>
          </section>

          {/* (4) Programming logic flowcharts */}
          <section>
            <h3 className="text-lg font-semibold">(4) Programming Logic Flowcharts</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {flows.map((img, idx) => (
                <div key={img.src}>
                  <figure
                    className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                    onClick={() => openLightbox(flows, idx)}
                    role="button"
                    aria-label={img.alt}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain" />
                  </figure>
                  <div className="mt-2 px-3 text-xs text-white/70 text-center">{img.alt}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    },
  },

  //* Quizler App Project *//
  {
    title: "Quizler App",
    subtitle: "DeltaHacks project • React · HTML/CSS",
    images: [{ src: "/Quizler.jpg", alt: "Screenshot of the Quizler educational web app" }],
    body:
      "Built a collaborative education app at DeltaHacks focused on ease of use. " +
      "Designed a clean React UI that lets students join a shared room and quiz each other in real time.",
  },

  {
    title: "Hardware Image Decompressor",
    subtitle: "Altera DE2 FPGA • Verilog · VGA",
    images: [
      { src: "/3DQ5_Main1.jpg", alt: "Hardware architecture for upsampling & colourspace conversion" }, // <-- added first
      { src: "/3DQ5_Main2.jpg", alt: "RGB to YUV colourspace coversion & horizontal downsampling" },
    ],
    body:
      "Implemented a YUV image decompressor in Verilog and displayed frames in real-time over VGA. " +
      "Designed memory buffers and a streaming datapath on the DE2 board, ensuring reliable timing with no visual artifacts.",
    details: (openLightbox) => {
      const detailImages: ProjectImage[] = [
        { src: "/3DQ5_1.jpg", alt: "Figure 1 — Custom state table for flow/timing" },
        { src: "/3DQ5_2.jpg", alt: "Figure 2 — Utilised registers & signals table" },
      ];
      return (
        <div className="mt-5 space-y-5 text-white/90">
          <section>
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Implemented <strong>McMaster Image Compression Rev. 17</strong> on an<strong> Altera DE2</strong> for <strong>320×240</strong> images.</li>
              <li>Pipeline: <strong>RGB→YUV</strong>, <strong>DCT</strong>, <strong>quantization</strong>, <strong>SRAM</strong>, <strong>UART</strong>, <strong>VGA</strong>, FSM-based control.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">2. Implementation Details</h3>

            <div className="mt-3">
              <h4 className="text-base font-semibold">2.1 Upsampling and Colour Space Conversion</h4>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {detailImages.map((img, idx) => (
                  <div key={img.src}>
                    <figure
                      className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                      onClick={() => openLightbox(detailImages, idx)}
                      role="button"
                      aria-label={img.alt}
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" quality={100} className="object-contain" />
                    </figure>
                    <div className="mt-2 px-3 text-xs text-white/70 text-center">{img.alt}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-3 list-disc pl-5 space-y-1.5">
                <li><strong>Timing:</strong> common-case loop = <strong>12 cycles</strong> per half; <strong>240 rows</strong>.</li>
                <li><strong>Multiplier roles:</strong> M1/M2 for U,V interpolation; M3/M4 for colour conversion.</li>
                <li><strong>Accumulators:</strong> RGB↔YUV matrix multiply.</li>
                <li><strong>Throughput:</strong> ~<strong>978 cycles/row</strong>, <strong>234,963 total</strong>.</li>
                <li><strong>Utilization:</strong> ~<strong>85%</strong> multipliers.</li>
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-base font-semibold">2.2 Resource Usage and Critical Path</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li><strong>Resources:</strong> <strong>2,435 / 114,480</strong> LEs (~<strong>2%</strong>).</li>
                <li><strong>Optimization:</strong> centralize constants/operands; drive repeats from control.</li>
                <li><strong>Critical path:</strong> <strong>14.787 ns</strong> due to combinational depth and placement.</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Conclusion</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>4-week build combining <strong>FSM</strong>, <strong>VGA/SRAM/UART</strong>, and DSP blocks.</li>
              <li>Emphasis on <strong>task division</strong>, <strong>communication</strong>, <strong>systematic debugging</strong>.</li>
              <li>Robust, scalable base for future features.</li>
            </ul>
          </section>
        </div>
      );
    },
  },

  //* Pacemaker Project *//
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

  //* Blink-Controlled Car Project *//
  {
    title: "Blink-Controlled Car",
    subtitle: "Signal processing • Arduino · Python",
    images: [{ src: "/Blink.jpg", alt: "Hardware setup for blink-controlled car" }],
    body:
      "Engineered a small vehicle that responds to users’ blink gestures. " +
      "Refined EEG signal processing to extract blink patterns and translated them into motor commands for responsive navigation.",
  },
];

function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(open ? el.scrollHeight : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <div
      className="overflow-hidden transition-[height,opacity] duration-300 ease-out [overflow-anchor:none]"
      style={{ height, opacity: open ? 1 : 0 }}
      aria-hidden={!open}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default function ProjectsPage() {
  // Lightbox state
  const [lightbox, setLightbox] = React.useState<{ open: boolean; images: ProjectImage[]; index: number }>({
    open: false,
    images: [],
    index: 0,
  });

  // Multi-expand
  const [expandedSet, setExpandedSet] = React.useState<Set<string>>(new Set());

  const openLightbox = (images: ProjectImage[], index: number) =>
    setLightbox({ open: true, images, index });

  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));
  const prevImage = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));
  const nextImage = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));

  // Prevent jump
  const toggleExpanded = (title: string, articleId: string) => {
    const el = document.getElementById(articleId);
    const startTop = el ? el.getBoundingClientRect().top : 0;

    setExpandedSet((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

    requestAnimationFrame(() => {
      const endTop = el ? el.getBoundingClientRect().top : 0;
      const delta = endTop - startTop;
      if (delta) window.scrollBy({ top: delta, left: 0, behavior: "instant" as ScrollBehavior });
    });
  };

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

  // Shrink tiles
  const COLUMN_MIN_H = "md:min-h-[320px]";

  return (
    <section className="py-2 pb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold">Projects</h1>

      <div className="mt-6 space-y-8">
        {projects.map((p, i) => {
          const imageFirstOnDesktop = i % 2 === 1;
          const imgCount = p.images.length;
          const gridCols = imgCount === 1 ? "grid-cols-1" : "grid-cols-2";
          const isExpanded = expandedSet.has(p.title);
          const articleId = `proj-${i}`;

          return (
            <article id={articleId} key={p.title} className="rounded-xl ring-1 ring-white/10 bg-white/[0.03] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Media */}
                <div className={["p-3 md:p-3", COLUMN_MIN_H, imageFirstOnDesktop ? "order-none md:order-1" : ""].join(" ")}>
                  <div className={`grid ${gridCols} gap-3`}>
                    {p.images.map((img, idx) => (
                      <div key={img.src + idx}>
                        <figure
                          className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg ring-1 ring-white/10 bg-black/20 cursor-zoom-in"
                          onClick={() => openLightbox(p.images, idx)}
                        >
                          <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" priority={i === 0 && idx === 0} />
                        </figure>
                        <div className="mt-2 px-3 text-xs text-white/70 text-center">{img.alt}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={[
                    "p-5 sm:p-6 md:p-6 flex flex-col gap-3",
                    COLUMN_MIN_H,
                    imageFirstOnDesktop ? "order-none md:order-0" : "",
                  ].join(" ")}
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">{p.title}</h2>
                    {p.subtitle && <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>}
                    <p className="mt-3 text-white/90 leading-relaxed">{p.body}</p>

                    {p.links?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
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

                  {p.details ? (
                    <div className="mt-2">
                      <button
                        aria-expanded={isExpanded}
                        onClick={() => toggleExpanded(p.title, articleId)}
                        className="w-full sm:w-auto rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
                      >
                        {isExpanded ? "Hide details" : "View more"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Collapsible details */}
              {p.details ? (
                <Collapsible open={isExpanded}>
                  <div className="border-t border-white/10 p-5 sm:p-6 md:p-6">{p.details(openLightbox)}</div>
                </Collapsible>
              ) : null}
            </article>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            aria-label="Close"
            className="z-[70] absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-black/50 text-white px-3 py-1.5 text-sm font-semibold shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            Close
          </button>

          {/* Previous */}
          <button
            aria-label="Previous image"
            className="z-[70] absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white px-4 py-3 text-lg font-semibold shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          {/* Next */}
          <button
            aria-label="Next image"
            className="z-[70] absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white px-4 py-3 text-lg font-semibold shadow-lg hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
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
                src={lightbox.images[lightbox.index].src}
                alt={lightbox.images[lightbox.index].alt}
                fill
                sizes="100vw"
                quality={100}
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-white/80 text-sm">{lightbox.images[lightbox.index].alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}