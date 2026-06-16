/* Japanese Association at Iowa State University — homepage prototype.
   Server component (no client JS needed): a sticky header + anchor nav,
   a bilingual hero, and About / Events / Outreach / Gallery / Contact
   sections. Photos are represented by labeled placeholder tiles so the
   layout reads clearly until real images are dropped in. */

import MobileMenu from "./mobile-menu";

// ── Small decorative marks (inline SVG, scale + recolor via currentColor) ──

function ToriiMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {/* top lintel (kasagi) */}
      <path d="M4 11c6-3 12-4 20-4s14 1 20 4l-1.5 4c-6-2.5-11.5-3.5-18.5-3.5S11 12.5 5.5 15L4 11z" />
      {/* second beam (nuki) */}
      <rect x="8" y="18" width="32" height="3.5" rx="1" />
      {/* pillars */}
      <rect x="13" y="18" width="4.5" height="26" rx="1.2" />
      <rect x="30.5" y="18" width="4.5" height="26" rx="1.2" />
    </svg>
  );
}

/* A faint seigaiha (青海波 / wave) band used as a section divider. */
function SeigaihaBand({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="22"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="seigaiha"
          x="0"
          y="0"
          width="40"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="20" cy="22" r="6" />
            <circle cx="20" cy="22" r="12" />
            <circle cx="20" cy="22" r="18" />
            <circle cx="0" cy="22" r="6" />
            <circle cx="0" cy="22" r="12" />
            <circle cx="0" cy="22" r="18" />
            <circle cx="40" cy="22" r="6" />
            <circle cx="40" cy="22" r="12" />
            <circle cx="40" cy="22" r="18" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="22" fill="url(#seigaiha)" />
    </svg>
  );
}

/* Bilingual section heading: English title + Japanese subtitle. */
function SectionHeading({ en, jp }: { en: string; jp: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium tracking-[0.2em] text-cardinal uppercase">
        {jp}
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
        {en}
      </h2>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#about", en: "About", jp: "私たちについて" },
  { href: "#team", en: "Team", jp: "役員紹介" },
  { href: "#events", en: "Events", jp: "イベント" },
  { href: "#outreach", en: "Connect", jp: "交流" },
  { href: "#contact", en: "Contact", jp: "お問い合わせ" },
];

const events = [
  {
    date: "Sep 12",
    title: "Welcome Night",
    jp: "歓迎会",
    blurb: "Meet the club over yakisoba, games, and intros. All are welcome.",
    tint: "from-cardinal/15 to-gold/20",
  },
  {
    date: "Oct 25",
    title: "Mochitsuki & Culture Fair",
    jp: "餅つき・文化祭",
    blurb: "Pound fresh mochi and explore tea, calligraphy, and origami booths.",
    tint: "from-sakura/40 to-paper-2",
  },
  {
    date: "Feb 03",
    title: "Setsubun Festival",
    jp: "節分祭",
    blurb: "Ring in spring with traditional games and seasonal treats.",
    tint: "from-gold/25 to-cardinal/10",
  },
];

/* Board members. Photos are placeholder tiles for now (no images yet);
   drop a real headshot in by adding an `img` field later. */
const team = [
  {
    name: "Member Name",
    role: "President",
    jp: "会長",
    year: "Senior",
    major: "Major TBD",
    tint: "from-cardinal/15 to-gold/20",
  },
  {
    name: "Member Name",
    role: "Vice President",
    jp: "副会長",
    year: "Junior",
    major: "Major TBD",
    tint: "from-sakura/40 to-paper-2",
  },
  {
    name: "Member Name",
    role: "Secretary",
    jp: "書記",
    year: "Sophomore",
    major: "Major TBD",
    tint: "from-gold/25 to-cardinal/10",
  },
  {
    name: "Member Name",
    role: "Treasurer",
    jp: "会計",
    year: "Junior",
    major: "Major TBD",
    tint: "from-cardinal/20 to-gold/20",
  },
  {
    name: "Member Name",
    role: "Events Coordinator",
    jp: "イベント担当",
    year: "Senior",
    major: "Major TBD",
    tint: "from-sakura/50 to-paper-2",
  },
  {
    name: "Member Name",
    role: "Outreach Coordinator",
    jp: "交流担当",
    year: "Sophomore",
    major: "Major TBD",
    tint: "from-gold/30 to-paper-2",
  },
  {
    name: "Member Name",
    role: "Public Relations",
    jp: "広報担当",
    year: "Freshman",
    major: "Major TBD",
    tint: "from-paper-2 to-sakura/40",
  },
];

const galleryTiles = [
  { label: "Spring Festival", tint: "from-sakura/50 to-paper-2" },
  { label: "Taiko Workshop", tint: "from-cardinal/20 to-gold/20" },
  { label: "Game Night", tint: "from-gold/30 to-paper-2" },
  { label: "Tea Ceremony", tint: "from-paper-2 to-sakura/40" },
  { label: "Calligraphy", tint: "from-cardinal/15 to-paper-2" },
  { label: "Cherry Blossom Walk", tint: "from-sakura/50 to-gold/15" },
];

export default function Home() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <ToriiMark className="h-7 w-7 text-cardinal" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-base font-semibold tracking-tight">
                JA at Iowa State
              </span>
              <span className="text-[11px] tracking-wide text-slate">
                日本人会
              </span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group flex flex-col text-sm font-medium text-ink/80 transition-colors hover:text-cardinal"
                >
                  {l.en}
                  <span className="text-[10px] text-slate transition-colors group-hover:text-cardinal/70">
                    {l.jp}
                  </span>
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="hidden rounded-full bg-cardinal px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-cardinal-700 md:inline-flex"
            >
              Join us
            </a>

            <MobileMenu links={navLinks} />
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* rising-sun motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cardinal/10 blur-[2px] sm:right-0 sm:top-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-16 hidden h-64 w-64 rounded-full bg-cardinal/15 sm:block"
          />

          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cardinal/20 bg-paper px-4 py-1.5 text-sm text-cardinal">
              <ToriiMark className="h-4 w-4" />
              Iowa State University · Student Organization
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Japanese Association
              <span className="block text-cardinal">at Iowa State University</span>
            </h1>
            <p className="mt-3 font-serif text-2xl text-slate sm:text-3xl">
              アイオワ州立大学 日本人会
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              A welcoming community celebrating Japanese culture, language, and
              friendship — open to <strong className="text-ink">everyone</strong>,
              whether you grew up in Japan or are just curious to learn.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cardinal px-7 text-base font-medium text-paper transition-colors hover:bg-cardinal-700"
              >
                Join the club / 入会する
              </a>
              <a
                href="#outreach"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-7 text-base font-medium transition-colors hover:border-cardinal hover:text-cardinal"
              >
                Partner with us / 交流する
              </a>
            </div>
          </div>

          <SeigaihaBand className="block text-cardinal/25" />
        </section>

        {/* ── About ─────────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
            <SectionHeading en="About Us" jp="私たちについて" />
            <div className="space-y-5 text-lg leading-relaxed text-slate">
              <p>
                The Japanese Association at Iowa State University brings together
                students from all backgrounds who share a love for Japanese
                culture. From language exchange and seasonal festivals to casual
                game nights, we make it easy to connect and belong.
              </p>
              <p>
                You don&apos;t need to speak Japanese or be Japanese to join —
                just bring your curiosity. 日本語が話せなくても大歓迎です。
              </p>
              <dl className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { n: "120+", l: "Members" },
                  { n: "15+", l: "Events / yr" },
                  { n: "Bilingual", l: "EN · 日本語" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-ink/5 bg-white/60 p-4 text-center"
                  >
                    <dt className="font-serif text-2xl font-semibold text-cardinal">
                      {s.n}
                    </dt>
                    <dd className="mt-1 text-sm text-slate">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Meet the Team ─────────────────────────────────────── */}
        <section id="team" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading en="Meet the Team" jp="役員紹介" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            The student officers who keep the club running. Placeholder text for
            now — bios and photos coming soon. 役員のプロフィールは近日公開予定です。
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <article
                key={`${m.role}-${i}`}
                className="overflow-hidden rounded-2xl border border-ink/5 bg-white/70"
              >
                {/* Placeholder headshot — swap for a real image later. */}
                <div
                  className={`flex aspect-square items-center justify-center bg-gradient-to-br ${m.tint}`}
                >
                  <span className="rounded-lg bg-paper/85 px-2.5 py-1 text-xs font-medium text-ink/60">
                    Photo
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium text-cardinal">{m.role}</p>
                  <p className="text-xs text-slate">{m.jp}</p>
                  <h3 className="mt-2 font-serif text-lg font-semibold">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate">{m.year}</p>
                  <p className="text-sm text-slate">{m.major}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Events ────────────────────────────────────────────── */}
        <section id="events" className="bg-paper-2/60 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading en="Upcoming Events" jp="イベント" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <article
                  key={e.title}
                  className="group overflow-hidden rounded-2xl border border-ink/5 bg-white/70 transition-shadow hover:shadow-lg hover:shadow-ink/5"
                >
                  <div
                    className={`relative flex h-40 items-end bg-gradient-to-br ${e.tint} p-4`}
                  >
                    <span className="rounded-lg bg-paper/90 px-3 py-1 text-sm font-semibold text-cardinal">
                      {e.date}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold">
                      {e.title}
                    </h3>
                    <p className="text-sm text-cardinal/80">{e.jp}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {e.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outreach (this year's strategic focus) ────────────── */}
        <section id="outreach" className="relative overflow-hidden bg-cardinal text-paper">
          <SeigaihaBand className="block rotate-180 text-paper/15" />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                交流
              </span>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Connect &amp; Collaborate
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/85">
                This year we&apos;re reaching out to Japanese-related student
                organizations across other colleges and universities. Joint
                events, shared resources, cultural exchange — let&apos;s build
                something bigger together.
              </p>
              <p className="mt-3 text-paper/70">
                他大学の日本関連団体との交流を募集しています。
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-paper px-7 text-base font-medium text-cardinal transition-colors hover:bg-gold"
              >
                Partner with us / 連携する
              </a>
            </div>

            <ul className="space-y-4">
              {[
                {
                  en: "Joint cultural events",
                  jp: "合同文化イベント",
                  d: "Co-host festivals, mixers, and showcases across campuses.",
                },
                {
                  en: "Inter-club exchange",
                  jp: "クラブ間交流",
                  d: "Trade ideas, playbooks, and members for bigger turnouts.",
                },
                {
                  en: "Shared resources",
                  jp: "リソース共有",
                  d: "Pool speakers, vendors, and sponsorship contacts.",
                },
              ].map((item) => (
                <li
                  key={item.en}
                  className="rounded-2xl bg-paper/10 p-5 ring-1 ring-paper/15"
                >
                  <p className="font-serif text-lg font-semibold">{item.en}</p>
                  <p className="text-sm text-gold">{item.jp}</p>
                  <p className="mt-1.5 text-sm text-paper/75">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading en="Gallery" jp="ギャラリー" />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryTiles.map((t) => (
              <div
                key={t.label}
                className={`flex aspect-[4/3] items-end rounded-2xl bg-gradient-to-br ${t.tint} p-4`}
              >
                <span className="rounded-lg bg-paper/85 px-2.5 py-1 text-xs font-medium text-ink/70">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate">
            ↑ Placeholder tiles — drop in real event photos here.
          </p>
        </section>

        {/* ── Contact / Join ────────────────────────────────────── */}
        <section id="contact" className="bg-paper-2/60 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
            <div>
              <SectionHeading en="Get in Touch" jp="お問い合わせ" />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
                Want to join, collaborate, or just learn more? Reach out — we
                reply in English or 日本語.
              </p>
              <div className="mt-8 space-y-3 text-ink">
                <a
                  href="mailto:ja-iastate@iastate.edu"
                  className="flex items-center gap-3 hover:text-cardinal"
                >
                  <span className="text-cardinal">✉</span>
                  ja-iastate@iastate.edu
                </a>
                <a
                  href="https://www.instagram.com/ja_iastate/"
                  className="flex items-center gap-3 hover:text-cardinal"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[0.85em] w-[0.85em] text-cardinal"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  @ja_iastate on Instagram
                </a>
              </div>
            </div>

            {/* Visual prototype form — wire up to an action/handler later. */}
            <form className="space-y-4 rounded-2xl border border-ink/5 bg-white/70 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Name / お名前
                  <input
                    type="text"
                    className="h-11 rounded-lg border border-ink/15 bg-paper px-3 outline-none focus:border-cardinal"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Email
                  <input
                    type="email"
                    className="h-11 rounded-lg border border-ink/15 bg-paper px-3 outline-none focus:border-cardinal"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Message / メッセージ
                <textarea
                  rows={4}
                  className="rounded-lg border border-ink/15 bg-paper p-3 outline-none focus:border-cardinal"
                />
              </label>
              <button
                type="submit"
                className="h-12 w-full rounded-full bg-cardinal text-base font-medium text-paper transition-colors hover:bg-cardinal-700"
              >
                Send / 送信
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <ToriiMark className="h-6 w-6 text-cardinal" />
            <span className="text-sm text-slate">
              Japanese Association at Iowa State University · 日本人会
            </span>
          </div>
          <p className="text-sm text-slate">
            © {new Date().getFullYear()} · Ames, Iowa 🌸
          </p>
        </div>
      </footer>
    </>
  );
}
