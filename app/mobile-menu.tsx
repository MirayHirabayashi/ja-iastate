"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; en: string; jp: string };

/* Mobile hamburger menu — client component (needs open/close state).
   Shown only below the `md` breakpoint; desktop nav lives in the header. */
export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
      >
        {/* Hamburger that morphs into an X */}
        <span className="relative block h-4 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open && (
        <>
          {/* Tap-outside backdrop */}
          <button
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default bg-ink/20 backdrop-blur-sm"
          />

          <nav
            id="mobile-nav"
            className="fixed inset-x-0 top-16 z-50 border-b border-ink/10 bg-paper px-6 pb-6 pt-2 shadow-lg shadow-ink/5"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-ink/5 py-4 text-lg font-medium transition-colors hover:text-cardinal"
                  >
                    {l.en}
                    <span className="text-sm text-slate">{l.jp}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-5 flex h-12 items-center justify-center rounded-full bg-cardinal text-base font-medium text-paper transition-colors hover:bg-cardinal-700"
            >
              Join us / 入会する
            </a>
          </nav>
        </>
      )}
    </div>
  );
}
