import React from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaAws, FaGitAlt, FaMicrochip,
  FaSquareRootAlt, FaLinkedin, FaGithub, FaEnvelope, FaPhone,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiCplusplus, SiDotnet,
  SiPostgresql, SiHtml5, SiCss3, SiAngular, SiExpress, SiLeaflet, SiVercel,
  SiDocker, SiArduino
} from "react-icons/si";

export default function Home() {
  const techs = [
    { name: "C/C++", icon: <SiCplusplus />, color: "#00599C" },
    { name: "C#", icon: <SiDotnet />, color: "#512BD4" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "Java", icon: <FaJava />, color: "#EA2D2E" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "Verilog HDL", icon: <FaMicrochip />, color: "#EF4444" },
    { name: "SQL", icon: <SiPostgresql />, color: "#336791" },

    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
    { name: "Express.js", icon: <SiExpress />, color: "#FFFFFF" },
    { name: "Leaflet.js", icon: <SiLeaflet />, color: "#199900" },
    { name: "Angular", icon: <SiAngular />, color: "#DD0031" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
    { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },

    { name: "MATLAB", icon: <FaSquareRootAlt />, color: "#FF7043" },
    { name: "Simulink", icon: <FaSquareRootAlt />, color: "#FF8A65" },

    { name: "Vercel", icon: <SiVercel />, color: "#FFFFFF" },
    { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
    { name: "Git", icon: <FaGitAlt />, color: "#F05032" },

    { name: "Microcontrollers", icon: <FaMicrochip />, color: "#F59E0B" },
    { name: "Arduino", icon: <SiArduino />, color: "#00979D" },
    { name: "FPGA", icon: <FaMicrochip />, color: "#14B8A6" },
  ];

  return (
    <section className="py-2 pb-14">
      <div className="grid gap-10 md:gap-16 items-start md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3">

            <div className="flex items-center justify-between md:block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none mb-0">
                Hey, I’m Tanvir!
              </h1>
              {/* Mobile smaller image */}
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

          {/* Contact info*/}
          <div className="flex flex-wrap md:flex-nowrap md:whitespace-nowrap items-center gap-2 pt-4 w-full">
            <a
              href="tel:+16475426310"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              aria-label="Call 647-542-6310"
            >
              <FaPhone className="opacity-90 group-hover:opacity-100" />
              <span className="underline underline-offset-4">647-542-6310</span>
            </a>

            <a
              href="mailto:tanvirsingh6803@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition min-w-0"
              aria-label="Email tanvirsingh6803@gmail.com"
            >
              <FaEnvelope className="opacity-90 group-hover:opacity-100" />
              <span className="underline underline-offset-4 truncate max-w-[68vw] sm:max-w-[38ch] md:max-w-[32ch]">
                tanvirsingh6803@gmail.com
              </span>
            </a>

            <a
              href="https://linkedin.com/in/singht52"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="opacity-90 group-hover:opacity-100" />
              <span className="underline underline-offset-4">LinkedIn</span>
            </a>

            <a
              href="https://github.com/Tanvir6803"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 sm:px-4 text-sm hover:bg-white/10 transition"
              aria-label="GitHub"
            >
              <FaGithub className="opacity-90 group-hover:opacity-100" />
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
                  className="flex items-center gap-1.5 rounded-xl ring-1 ring-white/10 bg-white/[0.03] px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-white/[0.06] transition"
                  title={t.name}
                >
                  <span className="text-lg sm:text-xl" style={{ color: t.color }}>
                    {t.icon}
                  </span>
                  <span className="text-[13px] sm:text-sm">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deskstop larger image */}
        <div className="hidden md:flex justify-center md:justify-end self-start">
          <div className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-72 md:w-72 rounded-2xl overflow-hidden ring-1 ring-white/15">
            <Image
              src="/TanvirPicture.jpg"
              alt="Tanvir Singh"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}