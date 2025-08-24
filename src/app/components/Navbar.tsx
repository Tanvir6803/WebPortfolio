import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar() {
  return (
    // Lock the header height so there’s zero CLS on first paint
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-900 text-white border-b border-white/10 h-14">
      {/* Match the inner container height exactly and center contents */}
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Tanvir Singh
        </Link>
        <ul className="flex gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link className="hover:opacity-80 transition-opacity" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}