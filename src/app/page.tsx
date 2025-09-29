"use client";

import React from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";
import { FaMicrochip, FaSquareRootAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { SiLeaflet, SiArduino } from "react-icons/si";
import ParticlesOverlay from "./components/ParticlesOverlay";

// Consistent icon wrapper for skills
const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[20px] sm:text-[24px]">
    {children}
  </div>
);

// Consistent icon wrapper for contact info
const ContactIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[18px] sm:text-[20px]">
    {children}
  </div>
);

// Devicon icons helper
const DevIcon: React.FC<{ name: string; className: string }> = ({ name, className }) => (
  <i className={`${className} colored`} title={name} aria-label={name} />
);

export default function Home() {
  const techs: { name: string; icon: React.ReactNode }[] = [
    { name: "C/C++", icon: <DevIcon name="C++" className="devicon-cplusplus-plain" /> },
    { name: "C#", icon: <DevIcon name="C#" className="devicon-dotnetcore-plain" /> },
    { name: "Python", icon: <DevIcon name="Python" className="devicon-python-plain" /> },
    { name: "Java", icon: <DevIcon name="Java" className="devicon-java-plain" /> },
    { name: "JavaScript", icon: <DevIcon name="JavaScript" className="devicon-javascript-plain" /> },
    { name: "Verilog HDL", icon: <FaMicrochip className="text-red-500" /> },
    { name: "SQL", icon: <DevIcon name="PostgreSQL" className="devicon-postgresql-plain" /> },
    { name: "React", icon: <DevIcon name="React" className="devicon-react-original" /> },
    { name: "Next.js", icon: <DevIcon name="Next.js" className="devicon-nextjs-plain" /> },
    { name: "Angular", icon: <DevIcon name="Angular" className="devicon-angularjs-plain" /> },
    { name: "TypeScript", icon: <DevIcon name="TypeScript" className="devicon-typescript-plain" /> },
    { name: "HTML", icon: <DevIcon name="HTML5" className="devicon-html5-plain" /> },
    { name: "CSS", icon: <DevIcon name="CSS3" className="devicon-css3-plain" /> },
    { name: "Tailwind CSS", icon: <DevIcon name="Tailwind CSS" className="devicon-tailwindcss-plain" /> },
    { name: "Node.js", icon: <DevIcon name="Node.js" className="devicon-nodejs-plain" /> },
    { name: "Express.js", icon: <DevIcon name="Express" className="devicon-express-original" /> },
    { name: "Leaflet.js", icon: <SiLeaflet style={{ color: "#199900" }} /> },
    { name: "PostgreSQL", icon: <DevIcon name="PostgreSQL" className="devicon-postgresql-plain" /> },
    { name: "Vercel", icon: <DevIcon name="Vercel" className="devicon-vercel-original" /> },
    { name: "Docker", icon: <DevIcon name="Docker" className="devicon-docker-plain" /> },
    { name: "AWS", icon: <DevIcon name="AWS" className="devicon-amazonwebservices-plain-wordmark" /> },
    { name: "Git", icon: <DevIcon name="Git" className="devicon-git-plain" /> },
    { name: "MATLAB", icon: <DevIcon name="MATLAB" className="devicon-matlab-plain" /> },
    { name: "Simulink", icon: <FaSquareRootAlt style={{ color: "#FF8A65" }} /> },
    { name: "Microcontrollers", icon: <FaMicrochip style={{ color: "#F59E0B" }} /> },
    { name: "Arduino", icon: <SiArduino style={{ color: "#00979D" }} /> },
    { name: "FPGA", icon: <FaMicrochip style={{ color: "#14B8A6" }} /> },
  ];

  return (
    <>
      <ParticlesOverlay />
      <section className="py-2 pb-14">
        <div className="grid gap-10 md:gap-16 items-start md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between md:block">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none mb-0">
                  Hey, I’m Tanvir!
                </h1>
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:hidden rounded-full overflow-hidden ring-1 ring-white/15">
                  <Image
                    src="/TanvirPicture.jpg"
                    alt="Tanvir Singh"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl text-white/80 mt-1 md:mt-4 leading-snug">
                Computer Engineering Student at McMaster University
              </h2>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap md:flex-nowrap md:whitespace-nowrap items-center gap-2 pt-4 w-full">
              <a
                href="tel:+16475426310"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              >
                <ContactIcon>
                  <FaPhone className="opacity-90 group-hover:opacity-100" />
                </ContactIcon>
                <span className="underline underline-offset-4">647-542-6310</span>
              </a>

              <a
                href="mailto:tanvirsingh6803@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition min-w-0"
              >
                <ContactIcon>
                  <FaEnvelope className="opacity-90 group-hover:opacity-100" />
                </ContactIcon>
                <span className="underline underline-offset-4 truncate max-w-[68vw] sm:max-w-[38ch] md:max-w-[32ch]">
                  tanvirsingh6803@gmail.com
                </span>
              </a>

              <a
                href="https://linkedin.com/in/singht52"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              >
                <ContactIcon>
                  <i className="devicon-linkedin-plain colored" aria-hidden />
                </ContactIcon>
                <span className="underline underline-offset-4">LinkedIn</span>
              </a>

              <a
                href="https://github.com/Tanvir6803"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              >
                <ContactIcon>
                  <i className="devicon-github-original" aria-hidden />
                </ContactIcon>
                <span className="underline underline-offset-4">GitHub</span>
              </a>
            </div>

            {/* About me */}
            <div className="pt-8">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold">About Me</h3>
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
              </div>
              <p className="mt-2 max-w-prose text-base sm:text-lg opacity-90">
                I am in my final year as a Computer Engineering student specializing in software,
                hardware, and embedded systems. My software experience includes full-stack development
                with React, Next.js, Tailwind CSS, TypeScript, Node.js, and PostgreSQL, and programming
                in Python, Java, JavaScript, C#, C/C++, and SQL. I also have experience with
                microcontrollers, PLCs, Verilog HDL, and hardware integration to deliver embedded
                solutions. Please view my skills below, as well as my work/club experience and projects
                to see more!
              </p>
            </div>

            {/* Skills */}
            <div className="pt-5">
              <h3 className="text-xl sm:text-2xl font-semibold">Technologies / Skills</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5">
                {techs.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-1.5 rounded-xl ring-1 ring-white/10 bg-white/[0.03] 
                               px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-white/[0.06] transition"
                    title={t.name}
                  >
                    <IconBox>{t.icon}</IconBox>
                    <span className="text-[13px] sm:text-sm">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop larger image */}
          <div className="hidden md:flex justify-center md:justify-end self-start">
            <div className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-100 md:w-100 rounded-2xl overflow-hidden ring-1 ring-white/15">
              <Image
                src="/TanvirPicture2.jpg"
                alt="Tanvir Singh"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}