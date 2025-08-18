"use client";

import React from "react";
import Image from "next/image";

type ProjectImage = {
  src: string;
  alt: string;
};

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
    details: (openLightbox) => {
      const blockAndTable: ProjectImage[] = [
        { src: "/ExtraLidar1.jpg", alt: "LiDAR system block / data flow diagram" },
        { src: "/ExtraLidar2.jpg", alt: "Device characteristics table" },
      ];
      const schematic: ProjectImage[] = [
        { src: "/ExtraLidar3.jpg", alt: "LiDAR circuit schematic" },
      ];
      const flows: ProjectImage[] = [
        { src: "/ExtraLidar4.jpg", alt: "Programming logic flowchart 1" },
        { src: "/ExtraLidar5.jpg", alt: "Programming logic flowchart 2" },
      ];

      return (
        <div className="mt-5 space-y-6 text-white/90">
          {/* (1) Device Overview */}
          <section>
            <h3 className="text-lg font-semibold">(1) Device Overview</h3>

            <h4 className="mt-3 text-base font-semibold">(a) Features</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Enclosed single-package device (cardboard), approx. <strong>30&nbsp;cm × 15&nbsp;cm</strong>.</li>
              <li>Main capability: scans a 3D area to output a <strong>spatial reconstruction</strong>.</li>
              <li>One push button (breadboard) to start/finish; on-board MCU button to reset.</li>
              <li>
                ToF sensor <strong>VL53L1X</strong>, full <strong>360°</strong> with <strong>16</strong> measurements per revolution;
                range up to <strong>400&nbsp;cm</strong>, up to <strong>50&nbsp;Hz</strong>; <strong>I²C</strong> + <strong>UART</strong>.
              </li>
              <li>Generates navigable 3D models (Python/Open3D).</li>
              <li>Open source: firmware in <strong>C/C++ (Keil)</strong>, host in <strong>Python (Jupyter)</strong>.</li>
              <li>
                MCU: <strong>MSP432E401Y</strong> @ <strong>80&nbsp;MHz</strong> (from 120&nbsp;MHz); <strong>3–5&nbsp;V</strong>;
                <strong> 1024&nbsp;KB Flash</strong>, <strong>256&nbsp;KB SRAM</strong>; UART ~<strong>7.5&nbsp;Mbps</strong>.
              </li>
              <li>Approx. system cost (without MCU): <strong>$60 CAD</strong>.</li>
            </ul>

            <h4 className="mt-4 text-base font-semibold">(b) General Description</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Integrated embedded system: ToF sensor provides distances; stepper performs 360° sweep; Python renders 3D model.</li>
              <li>Digital I/O: push-button start, LED activity, measurement logging; coordinates derived (YZ/XYZ) from ToF.</li>
              <li>Data path: transduction → conditioning/ADC → MCU → <strong>UART (byte-wise)</strong> to PC → Python/Open3D visualisation; host runs in polling mode and records to file.</li>
            </ul>

            {/* Block diagram + device table */}
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <figure
                className="relative mx-auto max-w-[720px] w-full rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                onClick={() => openLightbox(blockAndTable, 0)}
                role="button"
                aria-label="Open LiDAR block / data flow diagram"
              >
                <Image
                  src={blockAndTable[0].src}
                  alt={blockAndTable[0].alt}
                  width={1200}
                  height={700}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                  Fig. — Block / Data-flow diagram
                </figcaption>
              </figure>

              <figure
                className="relative mx-auto max-w-[720px] w-full rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                onClick={() => openLightbox(blockAndTable, 1)}
                role="button"
                aria-label="Open device characteristics table"
              >
                <Image
                  src={blockAndTable[1].src}
                  alt={blockAndTable[1].alt}
                  width={1200}
                  height={600}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                  Table — Device characteristics
                </figcaption>
              </figure>
            </div>
          </section>

          {/* (2) Detailed Description */}
          <section>
            <h3 className="text-lg font-semibold">(2) Detailed Description</h3>

            <h4 className="mt-3 text-base font-semibold">(a) Distance Measurement</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>ToF sensor: <strong>3415-POLOLU VL53L1X</strong>; one emitter + one receiver measure time-of-flight → distance.</li>
              <li>Wiring: <strong>VIN</strong>=3.3&nbsp;V, <strong>GND</strong>=0&nbsp;V; <strong>SDA/SCL → PB2/PB3</strong> for I²C; vendor API used for setup, ranging, and data access.</li>
              <li>Stepper: <strong>MOT-28BYJ48</strong>, <strong>IN1..IN4 → PH0..PH3</strong>; powered 5&nbsp;V/GND. Full-step sequence drives rotation.</li>
              <li>Motion cadence: <strong>250&nbsp;ms</strong> per state; <strong>16</strong> samples per 360° ⇒ <strong>22.5°</strong>/sample (step = 360 / #measurements). Data sent over <strong>COM6</strong> (port varies by PC).</li>
              <li>Host visualisation: Python <strong>Open3D</strong> builds point cloud, connects neighbours/sets, adds per-set bounding boxes; fully rotatable 3D view.</li>
              <li>Firmware (C/C++): PLL for 80&nbsp;MHz, GPIO/LEDs, SysTick delays, I²C (sensor), UART (PC), GPIO (stepper + button). Button on <strong>PH0</strong> starts acquisition; LEDs flash on start/finish; poll sensor every <strong>10&nbsp;ms</strong>.</li>
              <li>Loop: read distance → store → rotate <strong>22.5°</strong> → UART transmit → flash PF4 LED; repeat for 16 samples.</li>
            </ul>

            <h4 className="mt-4 text-base font-semibold">(b) Visualisation</h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>Open3D converts XYZ to a <strong>line set</strong> (intra-set & inter-set links) + per-set <strong>bounding boxes</strong> for readability.</li>
              <li>Environment: Python <strong>3.7</strong> (Open3D compat), prefer dedicated GPU; keep laptop on AC to avoid throttling.</li>
            </ul>
          </section>

          {/* (3) Circuit schematic */}
          <section>
            <h3 className="text-lg font-semibold">(3) Circuit Schematic</h3>
            <div className="mt-3 flex justify-center">
              <figure
                className="relative mx-auto max-w-[720px] w-full rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                onClick={() => openLightbox(schematic, 0)}
                role="button"
                aria-label="Open circuit schematic"
              >
                <Image
                  src={schematic[0].src}
                  alt={schematic[0].alt}
                  width={1200}
                  height={700}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                  Circuit schematic (MSP432E401Y, VL53L1X, 28BYJ-48, UART/I²C)
                </figcaption>
              </figure>
            </div>
          </section>

          {/* (4) Programming logic flowcharts */}
          <section>
            <h3 className="text-lg font-semibold">(4) Programming Logic Flowcharts</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <figure
                className="relative mx-auto max-w-[720px] w-full rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                onClick={() => openLightbox(flows, 0)}
                role="button"
                aria-label="Open programming logic flowchart 1"
              >
                <Image
                  src={flows[0].src}
                  alt={flows[0].alt}
                  width={1200}
                  height={700}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                  Flowchart — MCU init / main loop
                </figcaption>
              </figure>

              <figure
                className="relative mx-auto max-w-[720px] w-full rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                onClick={() => openLightbox(flows, 1)}
                role="button"
                aria-label="Open programming logic flowchart 2"
              >
                <Image
                  src={flows[1].src}
                  alt={flows[1].alt}
                  width={1200}
                  height={700}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                  Flowchart — Ranging, stepper advance, UART
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      );
    },
  },
  {
    title: "Hardware Image Decompressor",
    subtitle: "Altera DE2 FPGA • Verilog · VGA",
    images: [{ src: "/3DQ5_Main.jpg", alt: "FPGA board driving a VGA monitor" }],
    body:
      "Implemented a YUV image decompressor in Verilog and displayed frames in real-time over VGA. " +
      "Designed memory buffers and a streaming datapath on the DE2 board, ensuring reliable timing with no visual artifacts.",
    details: (openLightbox) => {
      const detailImages: ProjectImage[] = [
        { src: "/3DQ5_1.jpg", alt: "Flow & timing diagram" },
        { src: "/3DQ5_2.jpg", alt: "Registers & signals table" },
      ];
      return (
        <div className="mt-5 space-y-5 text-white/90">
          {/* 1. Introduction */}
          <section>
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>
                Implemented <strong>McMaster Image Compression Rev. 17</strong>{" "}
                on an<strong> Altera DE2</strong> for <strong>320×240</strong>{" "}
                images.
              </li>
              <li>
                Pipeline: <strong>RGB→YUV</strong>, <strong>DCT</strong>,{" "}
                <strong>quantization</strong>, <strong>SRAM</strong>,{" "}
                <strong>UART</strong>, <strong>VGA</strong>, FSM-based control.
              </li>
            </ul>
          </section>

          {/* 2. Implementation Details */}
          <section>
            <h3 className="text-lg font-semibold">2. Implementation Details</h3>

            {/* 2.1 */}
            <div className="mt-3">
              <h4 className="text-base font-semibold">
                2.1 Upsampling and Colour Space Conversion
              </h4>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {/* Detail image 1 */}
                <figure
                  className="relative rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                  onClick={() => openLightbox(detailImages, 0)}
                  role="button"
                  aria-label="Open Flow & timing diagram"
                >
                  <Image
                    src={detailImages[0].src}
                    alt={detailImages[0].alt}
                    width={1200}
                    height={700}
                    sizes="100vw"
                    quality={100}
                    className="object-contain w-full h-auto"
                  />
                  <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                    Figure 1 — Pipeline & timing overview
                  </figcaption>
                </figure>

                {/* Detail image 2 */}
                <figure
                  className="relative rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/20 cursor-zoom-in"
                  onClick={() => openLightbox(detailImages, 1)}
                  role="button"
                  aria-label="Open Registers & signals table"
                >
                  <Image
                    src={detailImages[1].src}
                    alt={detailImages[1].alt}
                    width={1200}
                    height={600}
                    sizes="100vw"
                    quality={100}
                    className="object-contain w-full h-auto"
                  />
                  <figcaption className="px-3 py-2 text-xs text-white/70 text-center">
                    Figure 2 — Registers & signal descriptions used
                  </figcaption>
                </figure>
              </div>

              {/* TECHNICAL BULLETS */}
              <ul className="mt-3 list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Timing:</strong> common-case loop ={" "}
                  <strong>12 cycles</strong> (two 6-cycle halves), iterated per
                  row across <strong>240 rows</strong>.
                </li>
                <li>
                  <strong>Multiplier roles:</strong> M1/M2 hold{" "}
                  <strong>U,V even/odd</strong> for interpolation; M3/M4 compute{" "}
                  <strong>Y’, U’, V’ (even/odd)</strong> for colour conversion.
                </li>
                <li>
                  <strong>Accumulators:</strong> Reven/Beven/Geven and
                  Rodd/Godd/Bodd implement RGB↔YUV matrix multiply.
                </li>
                <li>
                  <strong>Throughput:</strong> ~<strong>978 cycles/row</strong>,{" "}
                  <strong>234,963 total cycles</strong>.
                </li>
                <li>
                  <strong>Utilization:</strong> multipliers at ~
                  <strong>85%</strong> (≫ 75% requirement).
                </li>
              </ul>
            </div>

            {/* 2.2 */}
            <div className="mt-5">
              <h4 className="text-base font-semibold">
                2.2 Resource Usage and Critical Path
              </h4>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Resources:</strong> <strong>2,435 / 114,480</strong>{" "}
                  logic elements (~<strong>2%</strong>) → compact design,
                  headroom for scaling, less congestion.
                </li>
                <li>
                  <strong>Optimization:</strong> centralize
                  constants/operands (avoid duplication); allow counters/control
                  to drive repeated constant values directly.
                </li>
                <li>
                  <strong>Critical path:</strong> <strong>14.787 ns</strong>{" "}
                  from <code>mult_counter[3]</code> →{" "}
                  <code>Beven_Accum[28]</code> due to combinational depth,
                  register spacing/placement, RGB accumulation, and clocking
                  (skew/setup); multiplier config contributes.
                </li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h3 className="text-lg font-semibold">Conclusion</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1.5">
              <li>
                4-week build combining <strong>FSM control</strong>,{" "}
                <strong>VGA/SRAM/UART</strong>, and DSP blocks (
                <strong>DCT/quant</strong>).
              </li>
              <li>
                Emphasis on <strong>task division</strong>,{" "}
                <strong>communication</strong>,{" "}
                <strong>systematic debugging</strong>; small design choices
                measurably affected performance.
              </li>
              <li>
                Robust, scalable design; strong base for future features and
                tuning.
              </li>
            </ul>
          </section>
        </div>
      );
    },
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
    images: [{ src: "/Blink.jpg", alt: "Small RC car controlled by blink detection" }],
    body:
      "Engineered a small vehicle that responds to users’ blink gestures. " +
      "Refined EEG signal processing to extract blink patterns and translated them into motor commands for responsive navigation.",
  },
  {
    title: "Quizler App",
    subtitle: "DeltaHacks project • React · HTML/CSS",
    images: [{ src: "/Quizler.jpg", alt: "Screenshot of the Quizler educational web app" }],
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

  const [expanded, setExpanded] = React.useState<string | null>(null);

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
          const isExpanded = expanded === p.title;

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
                    "p-5 sm:p-6 md:p-7 flex h-full flex-col justify-between",
                    imageFirstOnDesktop ? "order-none md:order-0" : "",
                  ].join(" ")}
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">{p.title}</h2>
                    {p.subtitle && <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>}
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

                  {/* "View more" */}
                  {p.details ? (
                    <div className="pt-5">
                      <button
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded(isExpanded ? null : p.title)}
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
                <div
                  className={[
                    "transition-[max-height,opacity] duration-300 ease-out overflow-hidden",
                    isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="border-t border-white/10 p-5 sm:p-6 md:p-7">
                    {p.details(openLightbox)}
                  </div>
                </div>
              ) : null}
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
                sizes="100vw"
                quality={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
