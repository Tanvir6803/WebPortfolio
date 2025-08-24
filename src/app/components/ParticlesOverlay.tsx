"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParticlesOverlay.module.css";

export default function ParticlesOverlay() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    if (!container) return;

    // Keep overlay sized properly
    const updateSize = () => {
      const doc = document.documentElement;
      const docHeight = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        doc.clientHeight,
        document.body?.scrollHeight || 0,
        document.body?.offsetHeight || 0
      );
      container.style.height = `${docHeight}px`;
      // Ensure container does not overgrow
      container.style.width = `${doc.clientWidth}px`;
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(document.documentElement);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particleCount = prefersReduced ? 0 : 80;
    const timers: number[] = [];

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function place(el: HTMLElement, x: number, y: number) {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    function resetParticle(el: HTMLElement) {
      const w = document.documentElement.clientWidth;
      const h = parseFloat(container.style.height) || window.innerHeight;
      const x = rand(0, w);
      const y = rand(0, h);
      place(el, x, y);
      el.style.opacity = "0";
      el.style.transition = "none";
      return { x, y, w, h };
    }

    function animateParticle(el: HTMLElement) {
      const { x, y, w, h } = resetParticle(el);

      const duration = rand(10, 20); // 10–20s
      // Bounds
      const driftX = clamp(x + rand(-w * 0.05, w * 0.05), 0, w);
      const driftY = clamp(y - rand(h * 0.03, h * 0.08), 0, h);

      const t0 = window.setTimeout(() => {
        el.style.transition = `left ${duration}s linear, top ${duration}s linear, opacity ${(
          duration * 0.25
        ).toFixed(2)}s ease`;
        el.style.opacity = rand(0.12, 0.35).toFixed(2);
        place(el, driftX, driftY);

        const t1 = window.setTimeout(() => animateParticle(el), duration * 1000);
        timers.push(t1);
      }, 10);

      timers.push(t0);
    }

    function createParticle() {
      const el = document.createElement("div");
      el.className = styles.particle;
      const size = rand(1, 4); 
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      container.appendChild(el);
      animateParticle(el);
    }

    for (let i = 0; i < particleCount; i++) createParticle();

    // Intensity control
    let lastSpawn = 0;
    const throttleMs = 90;
    const onMouse = (e: MouseEvent) => {
      if (prefersReduced) return;
      const now = performance.now();
      if (now - lastSpawn < throttleMs) return;
      lastSpawn = now;

      const w = document.documentElement.clientWidth;
      const h = parseFloat(container.style.height) || window.innerHeight;

      const pageX = clamp(e.clientX + window.scrollX, 0, w);
      const pageY = clamp(e.clientY + window.scrollY, 0, h);

      const el = document.createElement("div");
      el.className = styles.particle;
      const size = rand(2, 5);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = "0.55";

      place(el, pageX, pageY);
      container.appendChild(el);

      const driftX = clamp(pageX + rand(-30, 30), 0, w);
      const driftY = clamp(pageY + rand(-30, 30), 0, h);

      const t0 = window.setTimeout(() => {
        el.style.transition =
          "left 1.8s ease-out, top 1.8s ease-out, opacity 1.8s ease-out";
        place(el, driftX, driftY);
        el.style.opacity = "0";
        const t1 = window.setTimeout(() => el.remove(), 1900);
        timers.push(t1);
      }, 10);

      timers.push(t0);
    };

    document.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouse);
      resizeObserver.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      container.querySelectorAll(`.${styles.particle}`).forEach((n) => n.remove());
    };
  }, []);

  return <div ref={containerRef} className={styles.container} aria-hidden />;
}